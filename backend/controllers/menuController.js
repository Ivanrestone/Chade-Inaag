import { Menu } from "../models/Menu.js";

export async function getMenu(req, res) {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });
    // Map _id to id for frontend compatibility
    const formatted = items.map(item => ({
      ...item.toObject(),
      id: item._id
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
}

export async function addMenuItem(req, res) {
  const body = req.body || {};
  const required = ["name", "category", "description", "price", "active", "image", "unliRice", "bestSeller"];
  const missing = required.filter((k) => !(k in body));
  if (missing.length) {
    return res.status(400).json({ error: "Missing fields", fields: missing });
  }

  try {
    const newItem = new Menu({
      name: String(body.name),
      category: String(body.category),
      description: String(body.description),
      price: Number(body.price),
      active: Boolean(body.active),
      unliRice: Boolean(body.unliRice),
      bestSeller: Boolean(body.bestSeller),
      image: String(body.image),
    });
    const saved = await newItem.save();
    res.status(201).json({ ...saved.toObject(), id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
}

export async function updateMenuItem(req, res) {
  const id = req.params.id;
  const updates = req.body || {};
  
  try {
    const updated = await Menu.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ ...updated.toObject(), id: updated._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
}

export async function deleteMenuItem(req, res) {
  const id = req.params.id;
  try {
    const deleted = await Menu.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
}
