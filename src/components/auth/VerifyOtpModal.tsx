
"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import "@/styles/components/verifyotp.css";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useCartStore } from "@/store/cartStore";

declare global {
  interface Window {
    confirmationResult: {
      confirm: (code: string) => Promise<unknown>;
    };
  }
}

interface VerifyOtpModalProps {
  onClose: () => void;
  onRegister: () => void;
  onSuccess: () => void;
}

export default function VerifyOtpModal({ onClose, onRegister, onSuccess }: VerifyOtpModalProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedIn, setUserId, setUser, phone } = useAuthStore();
  const { items: localCart, clearCart } = useCartStore();

  const verifyOtp = async () => {
    if (!phone) {
      toast.error("Phone number not found. Please try logging in again.");
      onClose();
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await window.confirmationResult.confirm(otp);
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;

      const requiredFields = ["firstName", "lastName", "phoneNumber", "pincode"];
      const isComplete = userData && requiredFields.every(
        (field) => userData[field] && userData[field].trim()
      );

      if (!isComplete) {
        setLoggedIn(true);
        setUserId(user.uid);
        setUser({
          id: user.uid,
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          phone: userData?.phoneNumber || phone,
          pincode: userData?.pincode || "",
          createdAt: new Date() as unknown as import("firebase/firestore").Timestamp,
        });
        onRegister();
        return;
      }

      setLoggedIn(true);
      setUserId(user.uid);
      setUser({
        id: user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phoneNumber,
        pincode: userData.pincode,
        createdAt: new Date() as unknown as import("firebase/firestore").Timestamp,
      });

      // Merge localStorage cart into Firestore
      if (localCart && localCart.length > 0) {
        const batch = [];
        for (const item of localCart) {
          const itemRef = doc(db, `users/${user.uid}/cartItems`, `${item.id}_${item.size}`);
          batch.push(
            setDoc(itemRef, {
              ...item,
              createdAt: serverTimestamp(),
            }, { merge: true })
          );
        }
        await Promise.all(batch);
        clearCart();
      }

      toast.success("Login successful! Cart synced.");
      onSuccess();
    } catch (e) {
      toast.error("Invalid OTP. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtp();
  };

  return (
    <div className="verify-container">
      <button className="close-button" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <span className="close-icon">×</span>
      </button>

      <div className="verify-header">
        <div className="brand-icon">🌿</div>
        <h1 className="verify-title">Verify Your Mobile</h1>
        <p className="verify-subtitle">
          We&apos;ve sent a 6-digit OTP to +91{phone}
        </p>
      </div>

      <form className="verify-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="otp" className="input-label">
            Enter OTP
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="verify-input"
            maxLength={6}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="verify-button" disabled={isLoading}>
          <span className="button-text">
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </span>
          <span className="button-icon">✓</span>
        </button>
      </form>

      <div className="verify-footer">
        <p className="footer-text">
          Didn&apos;t receive OTP?
          <button className="resend-link" type="button">Resend OTP</button>
        </p>
      </div>
    </div>
  );
}
