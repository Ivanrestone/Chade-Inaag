import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isDBReady } from "../config/db.js";
import { User } from "../models/User.js";

const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "admin123";

function signToken(payload) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (isDBReady()) {
    let user = await User.findOne({ email });
    if (!user && email === DEMO_EMAIL) {
      const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = await User.create({ email: DEMO_EMAIL, passwordHash: hash });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = signToken({ uid: String(user._id), email: user.email });
    return res.json({ token, user: { email: user.email } });
  } else {
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = signToken({ uid: "demo", email: DEMO_EMAIL });
    return res.json({ token, user: { email: DEMO_EMAIL } });
  }
}
