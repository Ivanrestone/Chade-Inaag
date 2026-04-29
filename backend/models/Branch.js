import mongoose from "mongoose";

const dayHoursSchema = new mongoose.Schema({
  open: { type: Boolean, default: true },
  openTime: { type: String, default: "10:00" },
  closeTime: { type: String, default: "21:00" },
}, { _id: false });

const branchHoursSchema = new mongoose.Schema({
  monday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  tuesday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  wednesday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  thursday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  friday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  saturday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
  sunday: { type: dayHoursSchema, default: () => ({ open: true, openTime: "10:00", closeTime: "21:00" }) },
}, { _id: false });

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["open", "coming-soon"], default: "open" },
    image: { type: String, default: "" },
    address: { type: String, required: true },
    hours: { type: branchHoursSchema, default: () => ({}) },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    features: { type: [String], default: [] },
    mapUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Branch = mongoose.models.Branch || mongoose.model("Branch", branchSchema);
