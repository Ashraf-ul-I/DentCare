// frontend/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // allow sending cookies (refreshToken)
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // avoid infinite loop
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/auth/refresh",
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh also fails, logout user
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
