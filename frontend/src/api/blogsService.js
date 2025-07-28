import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/blog";

export const fetchBlogService = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/all-blogs`);
  return res.data.blogs;
};

export const fetchBlogByIdService = async (id) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${id}`);
  return data.blog;
};

export const deleteBlogService = async (id) => {
  const res = await axiosInstance.delete(`${BASE_URL}/delete/${id}`);
  return res.data;
};

export const createBlogService = async (formData) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateBlogService = async ({ id, formData }) => {
  const token = localStorage.getItem("token");

  const { data } = await axiosInstance.put(`${BASE_URL}/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      e,
    },
  });

  console.log(data);
  return data;
};
