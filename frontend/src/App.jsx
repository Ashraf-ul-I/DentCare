import React, { useState } from "react";
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
import LoginForm from "./pages/LoginForm";
import ResetPassword from "./Components/ResetPassword";

import { useLocation } from "react-router-dom";

import { Routes, Route, Outlet } from "react-router-dom";

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
  return <Outlet />; // Just render child pages, no Navbar/Footer
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/otp-reset" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

// Wrap your App with Router higher up (like index.js or main entry)

export default App;
