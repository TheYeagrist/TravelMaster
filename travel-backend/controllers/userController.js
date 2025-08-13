import User from "../models/User.js";

export const getMe = async (req, res, next) => {
  try { res.json(req.user); } catch (e) { next(e); }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true }
    ).select("-password");
    res.json(updated);
  } catch (e) { next(e); }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (e) { next(e); }
};