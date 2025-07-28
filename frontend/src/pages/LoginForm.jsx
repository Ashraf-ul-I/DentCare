import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  const handleForgot = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message || "OTP sent to your email");
      setCountdown(5);
    } catch (err) {
      setMessage("Failed to send reset link");
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate("/otp-reset");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgot(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {showForgot && (
          <div className="mt-6">
            <button
              onClick={handleForgot}
              className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-semibold"
            >
              Send Reset Otp
            </button>
          </div>
        )}

        {message && (
          <p className="text-center text-green-600 text-sm mt-4">{message}</p>
        )}
        {countdown !== null && (
          <p className="text-center text-gray-500 text-sm mt-2">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        )}
      </div>
    </div>
  );
}
