
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import "@/styles/components/cart-icon.css";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  return (
    <Link href="/cart" className="cart-icon-link">
      <div className="cart-icon-container">
        <ShoppingCart className="cart-icon" />
        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
