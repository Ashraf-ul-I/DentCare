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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import { Navbar } from "./Components/Navbar";
import Footer from "./Components/Footer";

import BlogPage from "./pages/BlogPage";
import BlogCard from "./Components/BlogCard";
import { ContactUsPage } from "./pages/ContactUsPage";
import { BlogList } from "./Components/BlogList";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
