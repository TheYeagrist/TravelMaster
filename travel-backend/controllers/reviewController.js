import Review from "../models/Review.js";

export const createOrUpdateReview = async (req, res, next) => {
  try {
    const { packageId, rating, comment } = req.body;
    const upsert = await Review.findOneAndUpdate(
      { userId: req.user._id, packageId },
      { rating, comment },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(upsert);
  } catch (e) { next(e); }
};

export const getPackageReviews = async (req, res, next) => {
  try {
    const list = await Review.find({ packageId: req.params.packageId })
      .populate("userId", "name");
    res.json(list);
  } catch (e) { next(e); }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (req.user.role !== "admin" && review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });
    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (e) { next(e); }
};