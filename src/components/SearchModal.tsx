"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import "@/styles/components/search-modal.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`search-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="search-modal">
        <button className="search-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="search-form-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button
            type="submit"
            className="search-button"
            disabled={!searchQuery.trim()}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
