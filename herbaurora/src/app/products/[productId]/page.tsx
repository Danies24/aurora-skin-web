"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductById } from "../../../constants/products";
import useEmblaCarousel from "embla-carousel-react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../../styles/components/product-details.css";

const ProductDetailsPage = () => {
  const params = useParams();
  const id = params?.productId as string;
  const product = getProductById(id || "");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!product) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <h2 className="not-found-title">Product not found</h2>
          <Link href="/products" className="not-found-link">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const message = `Hi, I'm interested in ordering:\n\nProduct: ${product.name}\nSize: ${product.variants[selectedVariant].size}\nPrice: ₹${product.variants[selectedVariant].price}`;
    const whatsappUrl = `https://wa.me/918248365737?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-grid">
          {/* Image Carousel */}
          <div className="product-carousel">
            <div className="carousel-container" ref={emblaRef}>
              <div className="carousel-slides">
                {product.images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="carousel-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button onClick={scrollPrev} className="carousel-nav carousel-prev">
              <IoIosArrowBack className="w-6 h-6 text-herb-green" />
            </button>
            <button onClick={scrollNext} className="carousel-nav carousel-next">
              <IoIosArrowForward className="w-6 h-6 text-herb-green" />
            </button>

            {/* Image Dots */}
            <div className="carousel-dots">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`carousel-dot ${
                    index === selectedIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>

            {/* Price Tag */}
            <div className="price-tag">
              <span className="price-tag-text">
                ₹{product.variants[selectedVariant].price}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-info">
            <div>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-target">{product.target}</p>
            </div>

            <div>
              <h2 className="section-title">Benefits</h2>
              <p className="section-content">{product.benefit}</p>
            </div>

            <div>
              <h2 className="section-title">Description</h2>
              <p className="section-content">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h2 className="section-title">Select Size</h2>
              <div className="size-options">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`size-button ${
                      selectedVariant === index ? "selected" : ""
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <h2 className="section-title">Price Details</h2>
              <div className="price-row">
                <span className="section-content">Selected Size:</span>
                <span className="section-content">
                  {product.variants[selectedVariant].size}
                </span>
              </div>
              <div className="price-row">
                <span className="section-content">Weight:</span>
                <span className="section-content">
                  {product.variants[selectedVariant].weight}
                </span>
              </div>
              <div className="price-row price-divider">
                <span className="section-content">Total Price:</span>
                <span className="total-price">
                  ₹{product.variants[selectedVariant].price}
                </span>
              </div>
            </div>

            <div>
              <h2 className="section-title">Key Ingredients</h2>
              <p className="section-content">{product.ingredients}</p>
            </div>

            <div>
              <h2 className="section-title">How to Use</h2>
              <p className="section-content">{product.usage}</p>
            </div>

            {product.features && (
              <div>
                <h2 className="section-title">Features</h2>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order Button */}
            <button onClick={handleWhatsAppOrder} className="order-button">
              <FaWhatsapp className="order-button-icon" />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
