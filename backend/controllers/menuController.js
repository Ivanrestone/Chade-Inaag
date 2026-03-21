import {
  loadMenu,
  saveMenu,
  addItem,
  updateItem,
  deleteItem,
} from "../models/menuModel.js";

export async function getMenu(req, res) {
  const items = await loadMenu();
  res.json(items);
}

export async function addMenuItem(req, res) {
  const body = req.body || {};
  const required = ["name", "category", "description", "price", "active", "image", "unliRice", "bestSeller"];
  const missing = required.filter((k) => !(k in body));
  if (missing.length) {
    return res.status(400).json({ error: "Missing fields", fields: missing });
  }
  const item = await addItem({
    name: String(body.name),
    category: String(body.category),
    description: String(body.description),
    price: Number(body.price),
    active: Boolean(body.active),
    unliRice: Boolean(body.unliRice),
    bestSeller: Boolean(body.bestSeller),
    image: String(body.image),
  });
  res.status(201).json(item);
}

export async function updateMenuItem(req, res) {
  const id = Number(req.params.id);
  const updates = req.body || {};
  const updated = await updateItem(id, updates);
  if (!updated) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(updated);
}

export async function deleteMenuItem(req, res) {
  const id = Number(req.params.id);
  const ok = await deleteItem(id);
  if (!ok) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(204).send();
}
