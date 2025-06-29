"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllProducts, Product } from "@/constants/products";
import { FaStar } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import { addToCart } from "@/lib/firebase/firebaseHelpers";
import "@/styles/components/product.css";

const ProductSection = () => {
  const products = getAllProducts().slice(0, 4);
  const router = useRouter();
  const { toast } = useToast();
  const { userId, isLoggedIn } = useAuthStore();

  const handleAddToCart = async (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.variants[0].price,
      size: product.variants[0].size,
      weight: product.variants[0].weight,
      image: product.images[0],
      quantity: 1,
    };

    try {
      if (isLoggedIn && userId) {
        // Add to Firestore cart
        await addToCart(userId, {
          productId: product.id,
          productName: product.name,
          variant: product.variants[0].size,
          quantity: 1,
          price: product.variants[0].price,
          image: product.images[0],
          weight: product.variants[0].weight,
        });
      } else {
        // Fallback to localStorage for non-logged in users
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = existingCart.find(
          (item: typeof cartItem) =>
            item.id === cartItem.id && item.size === cartItem.size
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          existingCart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
      }

      toast({
        title: "Added to Cart!",
        description: `${product.name} added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
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
                    handleAddToCart(product);
                  }}
                  className="product-button"
                >
                  Add to Cart
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
