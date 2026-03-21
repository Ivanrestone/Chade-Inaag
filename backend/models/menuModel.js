import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "..", "data", "menu.json");

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]", "utf-8");
  }
}

export async function loadMenu() {
  await ensureFile();
  const raw = await fs.readFile(dataFile, "utf-8");
  const items = JSON.parse(raw || "[]");
  return Array.isArray(items) ? items : [];
}

export async function saveMenu(items) {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

function nextId(items) {
  return items.length ? Math.max(...items.map((i) => Number(i.id) || 0)) + 1 : 1;
}

export async function addItem(item) {
  const items = await loadMenu();
  const newItem = { ...item, id: nextId(items) };
  items.push(newItem);
  await saveMenu(items);
  return newItem;
}

export async function updateItem(id, updates) {
  const items = await loadMenu();
  const idx = items.findIndex((i) => Number(i.id) === Number(id));
  if (idx === -1) return null;
  const updated = { ...items[idx], ...updates };
  items[idx] = updated;
  await saveMenu(items);
  return updated;
}

export async function deleteItem(id) {
  const items = await loadMenu();
  const idx = items.findIndex((i) => Number(i.id) === Number(id));
  if (idx === -1) return false;
  items.splice(idx, 1);
  await saveMenu(items);
  return true;
}
