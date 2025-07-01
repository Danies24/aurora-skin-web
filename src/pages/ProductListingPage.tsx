"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getAllProducts } from "@/constants/products";
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
    }
  }, [searchQuery]);

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
                  <p className="product-rank">
                    #{product.rank} IN {product.category.toUpperCase()}
                  </p>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-benefit">{product.benefit}</p>
                  <p className="product-variant">{product.variants[0].size}</p>
                  <p className="product-price">
                    {product.variants[0].strikedPrice && (
                      <span className="striked-price">
                        ₹{product.variants[0].strikedPrice}
                      </span>
                    )}
                    <span className="discounted-price">
                      ₹{product.variants[0].price}
                    </span>
                  </p>
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
