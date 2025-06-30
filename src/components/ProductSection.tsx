
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/constants/products";
import { FaStar } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { addToCart } from "@/lib/firebase/firebaseHelpers";
import "@/styles/components/product.css";
import toast from "react-hot-toast";

type ProductSectionProps = {
  title: string;
  subTitle: string;
  products: Product[];
};

const ProductSection = ({ title, subTitle, products }: ProductSectionProps) => {
  const router = useRouter();
  const { userId, isLoggedIn } = useAuthStore();
  const { items: cartItems, addItem } = useCartStore();

  const isInCart = (productId: string, size: string) => {
    return cartItems.some(item => item.id === productId && item.size === size);
  };

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
      }

      // Add to local state
      addItem(cartItem);
      toast.success(`Added to your cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const handleGoToBag = () => {
    router.push("/cart");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="product-title">{title}</h2>
        <p className="product-subtitle">{subTitle}</p>

        <div className="product-grid">
          {products.map((product) => {
            const inCart = isInCart(product.id, product.variants[0].size);
            
            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="product-content">
                  <p className="product-rank">
                    #{product.rank} IN {product.category.toUpperCase()}
                  </p>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-benefit">{product.benefit}</p>
                  <div className="product-reviews">
                    <FaStar className="star-icon" />
                    <span>4.8 (120+ reviews)</span>
                  </div>
                  <p className="product-variant">{product.variants[0].size}</p>
                  <p className="product-price">₹{product.variants[0].price}</p>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      inCart ? handleGoToBag() : handleAddToCart(product);
                    }}
                    className={`product-button ${inCart ? 'in-cart' : ''}`}
                  >
                    {inCart ? "Go to Bag" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
