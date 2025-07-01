"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import SearchModal from "./SearchModal";
import "@/styles/components/hamburger-menu.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import CartIcon from "./CartIcon";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to order from Herb Aurora. Please share the details."
    );
    window.open(`https://wa.me/+918248365737?text=${message}`, "_blank");
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchOpen(true);
    closeMenu();
  };

  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/cart");
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Herb Aurora
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link href="/products" className="nav-item">
            Products
          </Link>
          <Link href="/about" className="nav-item">
            About
          </Link>
          <Link href="/contact" className="nav-item">
            Contact
          </Link>

          <div className="nav-icons">
            <button
              onClick={handleSearchClick}
              className="nav-icon-button"
              aria-label="Search products"
            >
              <FaSearch />
            </button>
            <button
              onClick={handleCartClick}
              className="nav-icon-button"
              aria-label="Shopping cart"
            >
              <CartIcon />
            </button>
            <button
              onClick={handleProfileClick}
              className="nav-icon-button"
              aria-label="User profile"
            >
              <FaUserCircle />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="whatsapp-button"
              aria-label="Order on WhatsApp"
            >
              <FaWhatsapp /> Order
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "active" : ""}`}
        onClick={closeMenu}
        role="presentation"
      >
        <nav
          className={`menu-content ${isOpen ? "active" : ""}`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="menu-header">
            <h2 className="menu-title">Menu</h2>
            <button
              onClick={closeMenu}
              className="close-button"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="menu-links">
            <button onClick={handleSearchClick} className="menu-item">
              <FaSearch /> Search
            </button>
            <Link href="/products" className="menu-item" onClick={closeMenu}>
              Products
            </Link>
            <Link href="/about" className="menu-item" onClick={closeMenu}>
              About
            </Link>
            <Link href="/contact" className="menu-item" onClick={closeMenu}>
              Contact
            </Link>
            <button onClick={handleCartClick} className="menu-item">
              <FaShoppingCart /> Cart
            </button>
            <button onClick={handleProfileClick} className="menu-item">
              <FaUserCircle /> Profile
            </button>
          </div>

          <div className="menu-footer">
            <button
              onClick={handleWhatsAppClick}
              className="menu-whatsapp-button"
              aria-label="Order on WhatsApp"
            >
              <FaWhatsapp /> Order on WhatsApp
            </button>
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default HamburgerMenu;
