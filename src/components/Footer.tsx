"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import "@/styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              <h3 className="footer-logo">Herb Aurora</h3>
              <p className="footer-tagline">
                Pure, natural skincare inspired by Tamil tradition
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-links-title">Quick Links</h4>
            <div className="footer-links">
              <Link href="/about" className="footer-link">
                About Us
              </Link>
              <Link href="/products" className="footer-link">
                Products
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="footer-links-title">Connect With Us</h4>
            <div className="footer-social">
              <a
                href="https://instagram.com/herbaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Instagram />
              </a>
              <a
                href="https://facebook.com/herbaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com/herbaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Herb Aurora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
