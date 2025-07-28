import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function AdminCreateBlog() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/blogs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to create blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-3 w-full"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-3 w-full"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="mb-4"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit Blog
        </button>
        {message && <p className="mt-3 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
