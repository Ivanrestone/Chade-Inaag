import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, default: true },
    unliRice: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    image: { type: String, required: true }, // Base64 or URL
  },
  { timestamps: true }
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
