import express from "express";
import cors from "cors";
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./controllers/menuController.js";
import {
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
} from "./controllers/branchController.js";
import { getFacebookPosts } from "./controllers/facebookController.js";
import {
  getFacebookEmbeds,
  addFacebookEmbed,
  updateFacebookEmbed,
  deleteFacebookEmbed,
} from "./controllers/facebookEmbedController.js";
import { login } from "./controllers/authController.js";
import { requireAuth } from "./middleware/auth.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import { listUsers, createUser } from "./controllers/adminController.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB(process.env.MONGODB_URI);

app.post("/api/auth/login", login);
app.get("/api/admin/users", requireAuth, listUsers);
app.post("/api/admin/users", requireAuth, createUser);
app.get("/api/menu", getMenu);
app.post("/api/menu", requireAuth, addMenuItem);
app.patch("/api/menu/:id", requireAuth, updateMenuItem);
app.delete("/api/menu/:id", requireAuth, deleteMenuItem);

app.get("/api/branches", getBranches);
app.post("/api/branches", requireAuth, addBranch);
app.patch("/api/branches/:id", requireAuth, updateBranch);
app.delete("/api/branches/:id", requireAuth, deleteBranch);

app.get("/api/facebook/posts", getFacebookPosts);

app.get("/api/facebook/embeds", getFacebookEmbeds);
app.post("/api/facebook/embeds", requireAuth, addFacebookEmbed);
app.patch("/api/facebook/embeds/:id", requireAuth, updateFacebookEmbed);
app.delete("/api/facebook/embeds/:id", requireAuth, deleteFacebookEmbed);

function start(port, attemptsLeft = 10) {
  const server = app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE" && attemptsLeft > 0) {
      const next = Number(port) + 1;
      start(next, attemptsLeft - 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

start(process.env.PORT || 4000);
