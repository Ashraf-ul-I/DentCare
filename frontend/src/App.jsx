import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
import HomePage from "./pages/Homepage";
import { Navbar } from "./Components/Navbar";
import Footer from "./Components/Footer";

import BlogPage from "./pages/BlogPage";
import BlogCard from "./Components/BlogCard";
import { ContactUsPage } from "./pages/ContactUsPage";
import { BlogList } from "./Components/BlogList";

import ResetPassword from "./Components/ResetPassword";

import { useLocation, useNavigate } from "react-router-dom";

import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DoctorCard from "./Components/DoctorCard";
import AdminCreateBlog from "./Components/AdminCreateBlog";
import ShowAdminBlogs from "./Components/ShowAdminBlogs";
import ProtectedRoute from "./utils/ProtectedRoute"; // import it
import AppointmentDashboard from "./Components/AppointmentDashboard";
import DoctorProfile from "./Components/DoctorProfileAdd";
import LoginPageForm from "./pages/LoginPageForm";
import HospitalImages from "./Components/HospitalImages";
import AboutUs from "./pages/AboutUs";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function AuthLayout() {
  return <Outlet />;
}

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isLoggedIn" && !event.newValue) {
        // Logout happened in another tab
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPageForm />} />
        <Route path="/otp-reset" element={<ResetPassword />} />

        {/* Protect dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="create-blog" element={<AdminCreateBlog />} />
            <Route path="home-image" element={<DoctorCard />} />
            <Route path="show-blogs" element={<ShowAdminBlogs />} />
            <Route path="show-appointment" element={<AppointmentDashboard />} />
            <Route path="doctorsProfile" element={<DoctorProfile />} />
            <Route path="hospital-pic-add" element={<HospitalImages />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

// Wrap your App with Router higher up (like index.js or main entry)

export default App;
