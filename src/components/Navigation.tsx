
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaUser } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { useAuthStore } from "@/store/authStore";
import "@/styles/components/navigation.css";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          {/* Logo */}
          <Link href="/" className="navigation-logo">
            <Image
              src="/logo.png"
              alt="Aurora Skin"
              width={32}
              height={32}
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <div className="navigation-mobile">
            <SearchBar />
            <CartIcon />
            <button onClick={toggleMenu} className="menu-button">
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          {/* Desktop menu */}
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
              About Us
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
            
            <div className="nav-actions">
              <CartIcon />
              <Link href={isLoggedIn ? "/profile" : "/login"} className="profile-link">
                <FaUser />
              </Link>
              <button onClick={handleWhatsAppClick} className="whatsapp-button">
                <FaWhatsapp />
                Contact Us
              </button>
            </div>
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
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className="mobile-menu-link"
            onClick={closeMenu}
          >
            {isLoggedIn ? "Profile" : "Login"}
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
