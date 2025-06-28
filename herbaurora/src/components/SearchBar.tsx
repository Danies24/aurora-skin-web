import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="w-full pl-3 pr-8 py-1.5 text-sm rounded-lg border border-herb-green/20 focus:outline-none focus:border-herb-green bg-white/90 text-herb-green-dark placeholder-herb-green-dark/50"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-herb-green hover:text-herb-green-dark transition-colors"
      >
        <IoSearch className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;
