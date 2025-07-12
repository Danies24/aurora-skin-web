"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import AddressSection from "@/components/AddressSection";
import type { Address } from "@/components/AddressSection"; // This line will error: Address is not exported. Remove or fix.
import CartSummary from "@/components/CartSummary";
import "@/styles/components/checkout.css";
import toast from "react-hot-toast";
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
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

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
    // if (!selectedAddress) {
    //   toast.error("Please select an address before proceeding.");
    //   return;
    // }
    let data;
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        body: JSON.stringify({
          amount: 1000 * 100,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment initiation failed");
    } catch (err) {
      toast.error("Failed to initiate payment. Please try again.");
      console.error("Payment error:", err);
      return;
    }
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
          userId: user?.id || user?.uid,
          user,
          cart,
          address: selectedAddress, // ✅ Include this
          payment: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
        };
        try {
          const orderRes = await fetch("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          });
          const orderData = await orderRes.json();
          if (!orderRes.ok)
            throw new Error(orderData.error || "Order creation failed");
          // Clear cart and redirect to success page
          localStorage.removeItem("cart");
          window.location.href = "/checkout/success";
        } catch (err) {
          toast.error("Failed to place order. Please contact support.");
          console.error("Order error:", err);
        }
      },
      modal: {
        ondismiss: function () {
          toast("Payment cancelled.");
        },
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
            <AddressSection onSelectAddress={setSelectedAddress} />
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
