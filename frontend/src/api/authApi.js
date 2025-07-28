// api/authApi.js

import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/auth";

export const loginUser = (loginData) => {
  return axiosInstance.post(`${BASE_URL}/login`, loginData, {
    withCredentials: true,
  });
};

export const forgotPassword = (emailData) => {
  return axios.post(`${BASE_URL}/forgot-password`, emailData);
};
