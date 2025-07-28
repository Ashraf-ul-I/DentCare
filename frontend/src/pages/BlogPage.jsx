import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogById } from "../hooks/useGetBlogsById.js";
import BlogSkeleton from "../Components/BlogSkeleton.jsx";
import ErrorMessage from "../icons/ErrorMessage.jsx";
import NotFound from "../icons/NotFound.jsx";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading, isError, error } = useGetBlogById(id);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  if (!blog) {
    return <NotFound />;
  }

  // Format date nicely
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto my-8">
      {/* Button to go back to the blog list */}
      <button
        onClick={() => navigate("/blogs")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mb-6"
      >
        &larr; Back to Blogs
      </button>

      {/* Blog post image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-100 object-cover rounded-lg mb-6"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/800x400/cccccc/333333?text=Image+Not+Found`;
        }}
      />

      {/* Blog post title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

      {/* Blog post date */}
      <p className="text-base text-gray-500 mb-6">{formattedDate}</p>

      {/* Blog post content */}
      <div className="text-lg text-gray-700 leading-relaxed">
        {blog.content.split(". ").map((sentence, i, arr) => (
          <p key={i} className={i < arr.length - 1 ? "mb-4" : ""}>
            {sentence.trim()}.
          </p>
        ))}
      </div>
    </div>
  );
}
