// ✅ Paste this inside your `ProductListingPage.tsx` or equivalent
// Add/Update your CSS after this file

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getAllProducts } from "@/constants/products";
import { FaWhatsapp } from "react-icons/fa";
import "@/styles/components/product-listing.css";

const ProductListingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams?.get("search") || "";
  const [products, setProducts] = useState(getAllProducts());

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = getAllProducts().filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(getAllProducts());
    }
  }, [searchQuery]);

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hi, I&apos;m interested in ordering ${productName}. Can you help me?`;
    const whatsappUrl = `https://wa.me/918248365737?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClearFilters = () => {
    window.location.href = "/products";
  };

  return (
    <div className="product-listing-page">
      <div className="product-listing-container">
        <div className="product-listing-header">
          {searchQuery && (
            <>
              <h1 className="product-listing-heading">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h1>
              <button className="clear-filters" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </>
          )}
          {!searchQuery && (
            <h1 className="product-listing-heading">Our Products</h1>
          )}
        </div>

        {products.length === 0 && (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <button className="clear-filters" onClick={handleClearFilters}>
              View All Products
            </button>
          </div>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="product-image-container">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">
                  From ₹{product.variants[0].price}
                </p>
                <button
                  className="order-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppOrder(product.name);
                  }}
                >
                  <FaWhatsapp className="order-button-icon" /> Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
