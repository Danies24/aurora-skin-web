"use client";
import React from "react";
import Link from "next/link";
import "@/styles/components/checkout.css";

const SuccessPage = () => (
  <div className="checkout-page">
    <div
      className="checkout-container"
      style={{ textAlign: "center", marginTop: 40 }}
    >
      <h1 className="checkout-title">Order Placed Successfully!</h1>
      <p
        style={{
          color: "var(--herb-green-dark)",
          fontSize: "1.25rem",
          marginBottom: 24,
        }}
      >
        Thank you for your purchase.
      </p>
      <a
        href="https://wa.me/918248365737?text=I%20want%20to%20track%20my%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="pay-button"
        style={{ display: "inline-block", marginBottom: 24, maxWidth: 320 }}
      >
        Track Order on WhatsApp
      </a>
      <br />
      <Link href="/">
        <button className="pay-button" style={{ maxWidth: 320 }}>
          Return to Home
        </button>
      </Link>
    </div>
  </div>
);

export default SuccessPage;
