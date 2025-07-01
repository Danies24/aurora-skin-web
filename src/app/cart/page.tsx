"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
} from "@/lib/firebase/firebaseHelpers";
import "@/styles/components/cart.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  weight: string;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { userId, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        if (isLoggedIn && userId) {
          // Load from Firestore
          const firestoreCartItems = await getCartItems(userId);
          // Transform Firestore cart items to match local interface
          const transformedItems = firestoreCartItems.map((item) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            size: item.variant,
            weight: item.weight,
            image: item.image,
            quantity: item.quantity,
            firestoreId: item.id, // Keep Firestore ID for operations
          }));
          setCartItems(transformedItems);
        } else {
          // Load from localStorage
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(cart);
        }
      } catch (error) {
        console.error("Error loading cart items:", error);
        toast.error("Failed to load cart items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, [userId, isLoggedIn]);

  const updateQuantity = async (
    id: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      if (isLoggedIn && userId) {
        // Find the Firestore cart item
        const firestoreCartItems = await getCartItems(userId);
        const firestoreItem = firestoreCartItems.find(
          (item) => item.productId === id && item.variant === size
        );

        if (firestoreItem) {
          await updateCartItemQuantity(userId, firestoreItem.id, newQuantity);
          // Reload cart items
          const updatedItems = await getCartItems(userId);
          const transformedItems = updatedItems.map((item) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            size: item.variant,
            weight: item.weight,
            image: item.image,
            quantity: item.quantity,
            firestoreId: item.id,
          }));
          setCartItems(transformedItems);
        }
      } else {
        // Update localStorage
        const updatedCart = cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const removeItem = async (id: string, size: string) => {
    try {
      if (isLoggedIn && userId) {
        // Find and remove from Firestore
        const firestoreCartItems = await getCartItems(userId);
        const firestoreItem = firestoreCartItems.find(
          (item) => item.productId === id && item.variant === size
        );

        if (firestoreItem) {
          await removeFromCart(userId, firestoreItem.id);
          // Reload cart items
          const updatedItems = await getCartItems(userId);
          const transformedItems = updatedItems.map((item) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            size: item.variant,
            weight: item.weight,
            image: item.image,
            quantity: item.quantity,
            firestoreId: item.id,
          }));
          setCartItems(transformedItems);
        }
      } else {
        // Remove from localStorage
        const updatedCart = cartItems.filter(
          (item) => !(item.id === id && item.size === size)
        );

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      toast.success("Removed from cart !!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to cart before checkout.");
      return;
    }
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h1 className="cart-title">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h1 className="cart-title">Your Cart is Empty</h1>
            <p className="empty-cart-text">Add some products to get started!</p>
            <Link href="/products" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="item-image"
                  />
                </div>

                <div className="cart-item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-size">Size: {item.size}</p>
                  <p className="item-weight">Weight: {item.weight}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <p className="unit-price">₹{item.price}</p>
                  <p className="total-price">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="remove-button"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹{shipping}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button onClick={proceedToCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
