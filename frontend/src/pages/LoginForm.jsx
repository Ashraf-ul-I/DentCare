import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForgotPassMutation } from "../hooks/useForgotPass";
import { useLoginMutation } from "../hooks/useLoginMutation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  const forgotMutation = useForgotPassMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          localStorage.setItem("token", res.data.accessToken);
          setMessage("Login successful!");
          navigate("/dashboard");
        },
        onError: () => {
          setMessage("Login failed");
        },
      }
    );
  };

  const handleForgot = () => {
    setMessage("");
    forgotMutation.mutate(
      { email },
      {
        onSuccess: (res) => {
          setMessage(res.data.message || "OTP sent to your email");
          setCountdown(5);
        },
        onError: () => {
          setMessage("Failed to send reset link");
        },
      }
    );
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate("/otp-reset");
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
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
              disabled={loginMutation.isLoading}
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
              disabled={loginMutation.isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgot(true)}
            className="text-sm text-blue-600 hover:underline"
            disabled={forgotMutation.isLoading}
          >
            Forgot Password?
          </button>
        </div>

        {showForgot && (
          <div className="mt-6">
            <button
              onClick={handleForgot}
              className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-semibold"
              disabled={forgotMutation.isLoading}
            >
              {forgotMutation.isLoading ? "Sending OTP..." : "Send Reset OTP"}
            </button>
          </div>
        )}

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
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
