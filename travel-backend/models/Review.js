import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
  },
  { timestamps: true }
);

reviewSchema.index({ userId: 1, packageId: 1 }, { unique: true }); // one review per user per package

export default mongoose.model("Review", reviewSchema);