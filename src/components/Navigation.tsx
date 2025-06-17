import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = "Hi, I'm interested in your products. Can you help me?";
    const whatsappUrl = `https://wa.me/918248365737?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Aurora Skin" className="h-8 w-auto" />
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <SearchBar />
            <button
              onClick={toggleMenu}
              className="text-herb-green hover:text-herb-green-dark transition-colors"
            >
              {isMenuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <IoMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`text-herb-green-dark hover:text-herb-green transition-colors ${
                location.pathname === "/" ? "font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-herb-green-dark hover:text-herb-green transition-colors ${
                location.pathname === "/products" ? "font-semibold" : ""
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`text-herb-green-dark hover:text-herb-green transition-colors ${
                location.pathname === "/about" ? "font-semibold" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-herb-green-dark hover:text-herb-green transition-colors ${
                location.pathname === "/contact" ? "font-semibold" : ""
              }`}
            >
              Contact
            </Link>
            <button
              onClick={handleWhatsAppClick}
              className="bg-herb-green text-white px-4 py-2 rounded-lg hover:bg-herb-green-dark transition-colors flex items-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t border-herb-green/10`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-herb-green hover:text-herb-green-dark transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-herb-green hover:text-herb-green-dark transition-colors"
          >
            About
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 text-herb-green hover:text-herb-green-dark transition-colors"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-herb-green hover:text-herb-green-dark transition-colors"
          >
            Contact
          </Link>
          <button
            onClick={() => {
              closeMenu();
              handleWhatsAppClick();
            }}
            className="w-full bg-herb-green text-white px-4 py-2 rounded-lg hover:bg-herb-green-dark transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-xl" />
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
