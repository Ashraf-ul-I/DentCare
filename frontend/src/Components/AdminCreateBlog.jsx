import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

export default function AdminCreateBlog() {
  const location = useLocation();
  const blogToEdit = location.state;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState("**Start writing your blog...**");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const isEditing = !!blogToEdit;

  const categories = [
    "Hygine",
    "Oral",
    "Canal",
    "Whitening teeth",
    "baler dat",
  ];

  // Populate fields if editing
  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title || "");
      setContent(blogToEdit.content || "");
      setCategory(blogToEdit.category || "");
      setPreview(blogToEdit.image || null);
    }
  }, [blogToEdit]);

  useEffect(() => {
    if (blogToEdit && blogToEdit.image) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [blogToEdit, preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");

    try {
      let response;

      if (isEditing) {
        // PUT request for update
        response = await axios.put(
          `http://localhost:3000/api/v1/blog/update/${blogToEdit._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            },
          }
        );
      } else {
        // POST request for create
        response = await axios.post(
          "http://localhost:3000/api/v1/blog/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            },
          }
        );
      }

      setMessage(response.data.message || "Blog submitted successfully");
      setUploadProgress(0);
      if (!isEditing) {
        // Only reset if it's a new blog
        setTitle("");
        setContent("**Start writing your blog...**");
        setCategory("");
        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      setMessage("Failed to submit blog");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {isEditing ? "Edit Blog" : "Create Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          className="border border-gray-300 p-3 rounded-lg w-full"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full text-gray-700"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer p-6 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-md mb-2 transition-all duration-700 ease-in-out"
              style={{
                filter: isLoaded ? "blur(0px)" : "blur(20px)",
                opacity: isLoaded ? 1 : 0.6,
              }}
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
          )}
          <span>
            {preview ? "Change Image" : "Click or Drag to Upload Image"}
          </span>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            required={!preview && !isEditing}
          />
        </label>

        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-blue-600 mt-1">
              Uploading: {uploadProgress}%
            </p>
          </>
        )}

        {/* Markdown Editor */}
        <div data-color-mode="light">
          <MDEditor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Blog" : "Submit Blog"}
        </button>

        {message && (
          <p className="text-center mt-4 font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
