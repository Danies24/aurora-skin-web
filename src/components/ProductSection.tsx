"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/constants/products";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import "@/styles/components/product.css";

const ProductSection = () => {
  const products = getAllProducts().slice(0, 4); // Limit to 4 products for desktop
  const router = useRouter();

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(
      `Hi! I'd like to order ${productName} from Herb Aurora. Please share the details.`
    );
    window.open(`https://wa.me/+918248365737?text=${message}`, "_blank");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="product-title">Best-Selling Herbal Bath Powders 🌿</h2>
        <p className="product-subtitle">
          Loved by 1000+ families for pure, gentle skincare
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <span className="product-ribbon">BUY2@299</span>
              <div className="product-image-container">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="product-image"
                />
              </div>
              <div className="product-content">
                <p className="product-rank">
                  #{product.rank} IN {product.category.toUpperCase()}
                </p>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-benefit">{product.benefit}</p>
                <div className="product-reviews">
                  <FaStar className="star-icon" /> {product.rating} reviews
                </div>
                <p className="product-variant">{product.variants[0].size}</p>
                <p className="product-price">₹{product.variants[0].price}</p>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppOrder(product.name);
                  }}
                  className="product-button"
                >
                  <FaWhatsapp className="mr-2" /> Order on WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
