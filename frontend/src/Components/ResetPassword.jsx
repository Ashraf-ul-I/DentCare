import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      setMessage(res.data.message);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Reset Your Password
      </h2>

      <div className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="otp">
            OTP
          </label>
          <input
            id="otp"
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Reset Password
        </button>

        <Link to="/login">
          <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            Back to Sign In
          </button>
        </Link>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
