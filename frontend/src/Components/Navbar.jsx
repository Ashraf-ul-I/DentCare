import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";
import { HashLink } from "react-router-hash-link";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">DentalCare</div>
          </div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <HashLink
                smooth
                to="/#home"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </HashLink>
              <HashLink
                smooth
                to="/#appointment"
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg "
              >
                Book Appointment
              </HashLink>
              <Link
                to="/blogs"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/about-us"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isOpen ? (
                <HamburgerIcon />
              ) : (
                // Close icon
                <CloseIcon />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-900 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu} // Close menu on click
            >
              Home
            </Link>
            <a
              href="#appointment"
              className="text-gray-900 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu} // Close menu on click
            >
              Book Appointment
            </a>
            <Link
              to="/blogs"
              className="text-gray-900 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu} // Close menu on click
            >
              Blogs
            </Link>
            <Link
              to="/about-us"
              className="text-gray-900 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu} // Close menu on click
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu} // Close menu on click
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
