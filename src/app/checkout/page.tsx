
"use client";

import React, { useState, useEffect } from "react";
import CartSummary from "@/components/CartSummary";
import AddressSection from "@/components/AddressSection";
import "@/styles/components/checkout.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handlePayment = () => {
    // Placeholder for payment integration
    alert('Payment integration coming soon!');
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
          <button onClick={handlePayment} className="pay-button">
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
