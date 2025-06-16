import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = "Hi, I'm interested in your products. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-2xl font-herbal text-herb-green">
              Herb Aurora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            <button
              onClick={handleWhatsAppClick}
              className="bg-herb-green text-white px-4 py-2 rounded-lg hover:bg-herb-green-dark transition-colors flex items-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-herb-green-dark hover:text-herb-green transition-colors"
          >
            {isMenuOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-4">
            <Link
              to="/"
              className="block text-herb-green-dark hover:text-herb-green transition-colors py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-herb-green-dark hover:text-herb-green transition-colors py-2"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block text-herb-green-dark hover:text-herb-green transition-colors py-2"
              onClick={closeMenu}
            >
              About Us
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
      )}
    </nav>
  );
};

export default Navigation;
