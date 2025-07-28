import { useState } from "react";
import { Filter as FilterIcon } from "lucide-react";
import { useBlogs } from "../hooks/useBloges";
import BlogCard from "./BlogCard";

export const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: blogs = [], isLoading, isError } = useBlogs();
  // Prepare categories safely
  const categories = ["all", ...new Set(blogs.map((p) => p.category))];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((post) => post.category === selectedCategory);
  console.log("filterd", filteredPosts);
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-lg text-gray-600">Loading blogs...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-lg text-red-600">Failed to load blogs.</p>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recent Blogs
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with our latest dental health insights
          </p>
        </div>
        {/* Filter dropdown */}
        <div className="flex justify-end py-4">
          <div className="inline-flex items-center space-x-2">
            <FilterIcon className="w-5 h-5 text-blue-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No blogs found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
