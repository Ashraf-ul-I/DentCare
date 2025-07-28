import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controller.js";
import { adminOnly } from "../middlewares/adminOnly.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const blogRoute = express.Router();

blogRoute.post(
  "/create",
  authenticate,
  adminOnly,
  upload.single("image"),
  createBlog
);
blogRoute.put(
  "/edit/:id",

  authenticate,
  adminOnly,
  upload.single("image"),
  updateBlog
);

blogRoute.delete("/delete/:id", authenticate, adminOnly, deleteBlog);

blogRoute.get("/all-blogs", getAllBlogs);
blogRoute.get("/:id", getBlogById);
export default blogRoute;
