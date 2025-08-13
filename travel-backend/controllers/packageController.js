import Package from "../models/Package.js";

const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const createPackage = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = data.slug || makeSlug(data.title);
    const pkg = await Package.create(data);
    res.status(201).json(pkg);
  } catch (e) { next(e); }
};

export const updatePackage = async (req, res, next) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Package not found" });
    res.json(updated);
  } catch (e) { next(e); }
};

export const deletePackage = async (req, res, next) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package deleted" });
  } catch (e) { next(e); }
};

export const listPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(packages);
  } catch (e) { next(e); }
};

export const getPackage = async (req, res, next) => {
  try {
    const byId = await Package.findById(req.params.id);
    if (byId) return res.json(byId);
    // also allow slug fetch
    const bySlug = await Package.findOne({ slug: req.params.id });
    if (!bySlug) return res.status(404).json({ message: "Package not found" });
    res.json(bySlug);
  } catch (e) { next(e); }
};