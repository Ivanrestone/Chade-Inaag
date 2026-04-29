import mongoose from "mongoose";

const facebookEmbedSchema = new mongoose.Schema(
  {
    order: { type: Number, default: 0 },
    iframeSrc: { type: String, required: true },
    width: { type: String, default: "500" },
    height: { type: String, default: "588" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FacebookEmbed = mongoose.models.FacebookEmbed || mongoose.model("FacebookEmbed", facebookEmbedSchema);
