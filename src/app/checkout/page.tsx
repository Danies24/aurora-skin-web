"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import AddressSection from "@/components/AddressSection";
import CartSummary from "@/components/CartSummary";
import "@/styles/components/checkout.css";
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, [isLoggedIn, router]);

  const handlePaySecurely = async () => {
    const res = await fetch("/api/payment/create", {
      method: "POST",
      body: JSON.stringify({
        amount: 1000 * 100,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    const paymentData = {
      key: data.key,
      amount: 1000 * 100,
      currency: "INR",
      name: "Test",
      description: "Test Description",
      order_id: data.orderId, // fixed to match backend response
      handler: async function (response: any) {
        // Save order to Firestore
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const orderPayload = {
          userId: user?.id || (user && "uid" in user ? user.uid : null),
          user,
          cart,
          payment: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          address: null, // TODO: Replace with actual address info
        };
        try {
          await fetch("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          });
        } catch {
          // Optionally handle error (e.g., show toast)
        }
        // Clear cart and redirect to success page
        localStorage.removeItem("cart");
        window.location.href = "/checkout/success";
      },
    };
    const rzp1 = new window.Razorpay(paymentData);
    rzp1.open();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-left">
            <AddressSection />
          </div>

          <div className="checkout-right">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>

        <div className="payment-section">
          <button
            onClick={handlePaySecurely}
            className="pay-button"
            disabled={!razorpayLoaded}
          >
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
