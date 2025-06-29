
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getAllProducts } from "@/constants/products";
import { useToast } from "@/components/ui/use-toast";
import "@/styles/components/product-listing.css";

const ProductListingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams?.get("search") || "";
  const [products, setProducts] = useState(getAllProducts());
  const { toast } = useToast();

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

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.variants[0].price,
      size: product.variants[0].size,
      weight: product.variants[0].weight,
      image: product.images[0],
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: any) => 
      item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} added to your cart.`,
    });
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
                    className="add-to-cart-button"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
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
