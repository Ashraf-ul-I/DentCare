import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/blog";

export const fetchBlogService = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/all-blogs`);
  console.log("api response", res.data);
  return res.data.blogs;
};

export const fetchBlogByIdService = async (id) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${id}`);
  return data.blog;
};
