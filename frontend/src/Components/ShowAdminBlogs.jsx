import React, { useState } from "react";
import { useBlogs } from "../hooks/useBloges";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ShowAdminBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: blogs = [], isLoading, isError } = useBlogs();
  const navigate = useNavigate();
  const categories = ["all", ...new Set(blogs.map((p) => p.category))];

  const filteredPosts =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((post) => post.category === selectedCategory);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-200
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <AnimatePresence>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 bg-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {moment(item.createdAt).format("MMMM D, YYYY")}
                  </p>
                  <span className="mt-1 inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full w-fit">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  onClick={() =>
                    navigate("/dashboard/create-blog", { state: item })
                  }
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No blogs found.</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowAdminBlogs;
