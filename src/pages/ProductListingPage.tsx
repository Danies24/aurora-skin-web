import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "../constants/products";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [products, setProducts] = useState(getAllProducts());
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = getAllProducts().filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(getAllProducts());
    }
  }, [searchQuery]);

  const handleWhatsAppClick = (productName: string) => {
    const message = `Hi, I'm interested in ${productName}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/+918248365737?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-herb-cream">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-herb-green-dark mt-4">
            Our Sacred Formulas
          </h1>
          <p className="font-inter text-herb-green-dark/70 mt-2">
            Handcrafted herbal powders for every skin type and age
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-herbal text-herb-green-dark mb-8">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Our Products"}
          </h1>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-herb-green-dark text-lg">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-herbal text-herb-green-dark mb-2">
                      {product.name}
                    </h2>
                    <p className="text-herb-green-dark/80 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-herb-green font-semibold">
                        ₹{product.variants[0].price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppClick(product.name);
                        }}
                        className="flex items-center gap-2 bg-herb-green text-white px-4 py-2 rounded-lg hover:bg-herb-green-dark transition-colors"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
