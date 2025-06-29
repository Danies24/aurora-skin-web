
import React from "react";
import Image from "next/image";
import "@/styles/components/cart-summary.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  weight: string;
  image: string;
  quantity: number;
}

interface CartSummaryProps {
  cartItems: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-summary-container">
      <h2 className="cart-summary-title">Order Summary</h2>
      
      <div className="cart-summary-items">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="summary-item">
            <div className="summary-item-image">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="summary-image"
              />
            </div>
            <div className="summary-item-details">
              <h4 className="summary-item-name">{item.name}</h4>
              <p className="summary-item-size">{item.size}</p>
              <p className="summary-item-quantity">Qty: {item.quantity}</p>
            </div>
            <div className="summary-item-price">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary-totals">
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
      </div>
    </div>
  );
};

export default CartSummary;
