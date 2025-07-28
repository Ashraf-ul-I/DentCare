// controllers/blogController.js
import Blog from "../models/blog.models.js";
import { cloudinary } from "../utils/cloudinary.js";
import { sanitizeHTML } from "../utils/sanitizeHtml.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Sanitize the HTML content to prevent XSS
    const sanitizedContent = sanitizeHTML(content);

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error || !result) {
            return reject(new Error("Cloudinary upload failed"));
          }
          resolve(result.secure_url);
        }
      );
      stream.end(req.file.buffer); // send image buffer to cloudinary
    });

    // Create the blog in MongoDB
    const blog = new Blog({
      title,
      category,
      content: sanitizedContent,
      image: imageUrl,
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const { title, content, category } = req.body;

    // Sanitize content to prevent XSS
    const sanitizedContent = content ? sanitizeHTML(content) : undefined;

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    existingBlog.title = title || existingBlog.title;
    existingBlog.content = sanitizedContent || existingBlog.content;
    existingBlog.category = category || existingBlog.category;

    // If new image uploaded, upload to Cloudinary
    if (req.file) {
      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error || !result) {
              return reject(new Error("Cloudinary upload failed"));
            }
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      existingBlog.image = imageUrl;
    }

    await existingBlog.save();

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: existingBlog });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
    res.json({ message: "Blogs fetched successfully", blogs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog fetched successfully", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};
