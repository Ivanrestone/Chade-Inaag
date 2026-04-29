import { Branch } from "../models/Branch.js";

export async function getBranches(req, res) {
  try {
    const branches = await Branch.find().sort({ createdAt: 1 });
    const formatted = branches.map((b) => ({ ...b.toObject(), id: b._id }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch branches" });
  }
}

export async function addBranch(req, res) {
  const body = req.body || {};
  const required = ["name", "address", "hours"];
  const missing = required.filter((k) => !(k in body));
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
  }
  try {
    const branch = await Branch.create(body);
    res.status(201).json({ ...branch.toObject(), id: branch._id });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to add branch" });
  }
}

export async function updateBranch(req, res) {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json({ ...branch.toObject(), id: branch._id });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update branch" });
  }
}

export async function deleteBranch(req, res) {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete branch" });
  }
}
