import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res, next) => {
  try {
    const saved = await Enquiry.create(req.body);
    res.status(201).json(saved);
  } catch (e) { next(e); }
};

export const listEnquiries = async (req, res, next) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
};

export const markHandled = async (req, res, next) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { handled: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Enquiry not found" });
    res.json(updated);
  } catch (e) { next(e); }
};