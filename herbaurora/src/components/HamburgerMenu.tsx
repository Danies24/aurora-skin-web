"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaWhatsapp, FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import "@/styles/components/hamburger-menu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Herb Aurora
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button onClick={handleSearchClick} className="nav-item">
            <FaSearch /> Search
          </button>
          <Link href="/products" className="nav-item">
            Products
          </Link>
          <Link href="/about" className="nav-item">
            About
          </Link>
          <Link href="/contact" className="nav-item">
            Contact
          </Link>
          <button onClick={handleWhatsAppClick} className="whatsapp-button">
            <FaWhatsapp /> Order on WhatsApp
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button className="hamburger-button" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "active" : ""}`}
        onClick={closeMenu}
      >
        <nav className={`menu-content ${isOpen ? "active" : ""}`}>
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
          <button
            onClick={handleWhatsAppClick}
            className="menu-whatsapp-button"
          >
            <FaWhatsapp /> Order on WhatsApp
          </button>
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
