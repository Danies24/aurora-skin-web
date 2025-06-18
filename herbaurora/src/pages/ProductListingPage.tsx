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
      const filtered = getAllProducts().filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(getAllProducts());
      console.log("hey");
    }
  }, [searchQuery]);

  const handleWhatsAppClick = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation(); // Prevent card click when clicking WhatsApp button
    const message = `Hi, I'm interested in ${productName}. Can you provide more information?`;
    window.open(
      `https://wa.me/+918248365737?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleClearFilters = () => {
    window.location.href = "/products";
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="product-listing-page">
      <div className="product-listing-container">
        <div className="product-listing-header">
          {searchQuery ? (
            <>
              <h1 className="product-listing-heading">
                Search Results for &quot;{searchQuery}&quot;
              </h1>
              <button className="clear-filters" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </>
          ) : (
            <h1 className="product-listing-heading">Our Products</h1>
          )}
        </div>

        {searchQuery && products.length === 0 ? (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <button className="clear-filters" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
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
                    {product.variants[0].size} - ₹{product.variants[0].price}
                  </p>
                  <button
                    className="order-button"
                    onClick={(e) => handleWhatsAppClick(e, product.name)}
                  >
                    <FaWhatsapp className="order-button-icon" /> Order on
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
