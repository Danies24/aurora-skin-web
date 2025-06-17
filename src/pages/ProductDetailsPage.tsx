import React, { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../constants/products";
import useEmblaCarousel from "embla-carousel-react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
      <div className="min-h-screen bg-herb-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-herbal mb-4">Product not found</h2>
          <Link
            to="/products"
            className="text-herb-green hover:text-herb-green-dark"
          >
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
    <div className="min-h-screen bg-herb-cream py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Carousel */}
            <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
              <div
                className="overflow-hidden rounded-lg shadow-lg h-full"
                ref={emblaRef}
              >
                <div className="flex h-full">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <IoIosArrowBack className="w-6 h-6 text-herb-green" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <IoIosArrowForward className="w-6 h-6 text-herb-green" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndex ? "bg-herb-green" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-herb-green text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-herbal text-xl">
                  ₹{product.variants[selectedVariant].price}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-herbal text-herb-green mb-2">
                  {product.name}
                </h1>
                <p className="text-herb-green-dark italic">{product.target}</p>
              </div>

              <div>
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  Benefits
                </h2>
                <p className="text-herb-green-dark">{product.benefit}</p>
              </div>

              <div>
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  Description
                </h2>
                <p className="text-herb-green-dark">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  Select Size
                </h2>
                <div className="flex gap-4">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant === index
                          ? "border-herb-green bg-herb-green text-white"
                          : "border-herb-green text-herb-green hover:bg-herb-green/10"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-herb-cream p-4 rounded-lg">
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  Price Details
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-herb-green-dark">Selected Size:</span>
                    <span className="font-semibold">
                      {product.variants[selectedVariant].size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-herb-green-dark">Weight:</span>
                    <span className="font-semibold">
                      {product.variants[selectedVariant].weight}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-herb-green/20">
                    <span className="text-herb-green-dark font-semibold">
                      Total Price:
                    </span>
                    <span className="text-herb-green font-bold text-xl">
                      ₹{product.variants[selectedVariant].price}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  Key Ingredients
                </h2>
                <p className="text-herb-green-dark">{product.ingredients}</p>
              </div>

              <div>
                <h2 className="text-xl font-herbal text-herb-green mb-2">
                  How to Use
                </h2>
                <p className="text-herb-green-dark">{product.usage}</p>
              </div>

              {product.features && (
                <div>
                  <h2 className="text-xl font-herbal text-herb-green mb-2">
                    Features
                  </h2>
                  <ul className="list-disc list-inside text-herb-green-dark">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-herb-green text-white py-3 px-6 rounded-lg hover:bg-herb-green-dark transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
