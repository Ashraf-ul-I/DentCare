import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter as FilterIcon,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function BlogCard({ post }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => navigate(`/blogs/${post._id}`)} // Navigate to the detail page
    >
      {/* Blog post image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
        // Fallback for image loading errors
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
        }}
      />
      {/* Blog post content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Blog post title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>
        {/* Blog post excerpt */}
        <p className="text-gray-600 text-base flex-grow">
          {post.content.split(". ")[0]}.{" "}
          {/* Display only the first sentence for excerpt */}
        </p>
        {/* Blog post date */}
        <p className="text-sm text-gray-500 mt-4">{post.date}</p>
      </div>
    </div>
  );
}
