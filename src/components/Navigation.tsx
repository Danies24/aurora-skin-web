import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";
import "@/styles/components/navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    console.log("hello");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWhatsAppClick = () => {
    const message =
      "Hi, I&apos;m interested in your products. Can you help me?";
    const whatsappUrl = `https://wa.me/918248365737?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-logo-container">
            <Link href="/" className="navigation-logo">
              <Image
                src="/logo.png"
                alt="Aurora Skin"
                width={150}
                height={50}
                className="logo-image"
              />
            </Link>
          </div>

          <div className="navigation-mobile">
            <SearchBar />
            <button onClick={toggleMenu} className="menu-button">
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          <div className="navigation-desktop">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`nav-link ${pathname === "/products" ? "active" : ""}`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`nav-link ${pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
            <button onClick={handleWhatsAppClick} className="whatsapp-button">
              <FaWhatsapp className="whatsapp-icon" />
              Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <Link href="/" className="mobile-menu-link" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/about" className="mobile-menu-link" onClick={closeMenu}>
            About
          </Link>
          <Link
            href="/products"
            className="mobile-menu-link"
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="mobile-menu-link"
            onClick={closeMenu}
          >
            Contact
          </Link>
          <button
            onClick={() => {
              closeMenu();
              handleWhatsAppClick();
            }}
            className="mobile-whatsapp-button"
          >
            <FaWhatsapp />
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
