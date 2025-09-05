import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/auth";

export const loginUser = ({ token }) => {
  return axiosInstance.post(
    `${BASE_URL}/login`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};
