import { FacebookEmbed } from "../models/FacebookEmbed.js";

export async function getFacebookEmbeds(req, res) {
  try {
    const embeds = await FacebookEmbed.find().sort({ order: 1 });
    const formatted = embeds.map((e) => ({ ...e.toObject(), id: e._id }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Facebook embeds" });
  }
}

export async function addFacebookEmbed(req, res) {
  const body = req.body || {};
  if (!body.iframeSrc) {
    return res.status(400).json({ error: "Missing iframeSrc field" });
  }
  try {
    const embed = await FacebookEmbed.create(body);
    res.status(201).json({ ...embed.toObject(), id: embed._id });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to add embed" });
  }
}

export async function updateFacebookEmbed(req, res) {
  try {
    const embed = await FacebookEmbed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!embed) return res.status(404).json({ error: "Embed not found" });
    res.json({ ...embed.toObject(), id: embed._id });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update embed" });
  }
}

export async function deleteFacebookEmbed(req, res) {
  try {
    const embed = await FacebookEmbed.findByIdAndDelete(req.params.id);
    if (!embed) return res.status(404).json({ error: "Embed not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete embed" });
  }
}
