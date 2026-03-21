import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

export async function listUsers(req, res) {
  const users = await User.find({}, { email: 1 }).lean();
  res.json(users.map((u) => ({ id: String(u._id), email: u.email })));
}

export async function createUser(req, res) {
  const { email, password } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: "User already exists" });
  }
  const pwd = password && String(password).length >= 6 ? String(password) : "admin123";
  const hash = await bcrypt.hash(pwd, 10);
  const user = await User.create({ email, passwordHash: hash });
  res.status(201).json({ id: String(user._id), email: user.email });
}
