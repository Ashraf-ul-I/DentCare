import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useLoginMutation } from "../hooks/useLoginMutation";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

export default function LoginPageForm() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const loginMutation = useLoginMutation();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const handleGoogleLogin = async () => {
    setMessage("");
    try {
      //  Firebase Google login popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get Firebase ID token
      const token = await user.getIdToken(true);

      // 3️⃣ Send token to backend for verification/login
      loginMutation.mutate(
        { token },
        {
          onSuccess: (res) => {
            localStorage.setItem("token", res.data.accessToken); // save backend token
            localStorage.setItem("isLoggedIn", "true");
            setMessage("Login successful!");
            navigate("/dashboard"); // redirect to dashboard
          },
          onError: (err) => {
            console.error("Backend login error:", err);
            setMessage("Login failed: Not authorized");
          },
        }
      );
    } catch (error) {
      console.error("Google login error:", error);
      setMessage("Google login failed");
    }
  };

  //   const handleGoogleLogin = async () => {
  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       const token = await result.user.getIdToken(); // Firebase ID token

  //       const res = await axios.post(
  //         "http://localhost:3000/api/v1/auth/login",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("Backend response:", res.data);
  //     } catch (error) {
  //       console.error("Backend login error:", error);
  //     }
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging in..." : "Login with Google"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.toLowerCase().includes("failed")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
