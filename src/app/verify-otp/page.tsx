"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setLoggedIn, setUserId, setUser, phone } = useAuthStore();
  const { items: localCart, clearCart } = useCartStore();

  const verifyOtp = async () => {
    if (!phone) {
      toast.error("Phone number not found. Please try logging in again.");
      router.push("/login");
      return;
    }
    setIsLoading(true);
    try {
      // 1. Verify OTP with Firebase Auth
      await window.confirmationResult.confirm(otp);
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      // 2. Fetch Firestore user doc
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;

      // 3. Check for required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "phoneNumber",
        "pincode",
      ];
      const isComplete =
        userData &&
        requiredFields.every(
          (field) => userData[field] && userData[field].trim()
        );

      if (!isComplete) {
        // 4. Redirect to /register to complete profile
        setLoggedIn(true);
        setUserId(user.uid);
        setUser({
          id: user.uid,
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          phone: userData?.phoneNumber || phone,
          pincode: userData?.pincode || "",
          createdAt:
            new Date() as unknown as import("firebase/firestore").Timestamp, // Not used in Zustand UI, just for type
        });
        router.push("/register");
        return;
      }

      // 5. If complete, update Zustand, merge cart, redirect to /cart
      setLoggedIn(true);
      setUserId(user.uid);
      setUser({
        id: user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phoneNumber,
        pincode: userData.pincode,
        createdAt:
          new Date() as unknown as import("firebase/firestore").Timestamp, // Not used in Zustand UI, just for type
      });

      // 6. Merge localStorage cart into Firestore
      if (localCart && localCart.length > 0) {
        const batch = [];
        for (const item of localCart) {
          // Use a subcollection for cart items
          const itemRef = doc(
            db,
            `users/${user.uid}/cartItems`,
            `${item.id}_${item.size}`
          );
          batch.push(
            setDoc(
              itemRef,
              {
                ...item,
                createdAt: serverTimestamp(),
              },
              { merge: true }
            )
          );
        }
        await Promise.all(batch);
        clearCart();
      }

      toast.success("Login successful! Cart synced.");
      router.push("/cart");
    } catch (e) {
      toast.error("Invalid OTP or login failed");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <div className="verify-header">
          <div className="brand-icon">🌿</div>
          <h1 className="verify-title">Verify Your Mobile</h1>
          <p className="verify-subtitle">
            We&apos;ve sent a 6-digit OTP to your mobile number
          </p>
        </div>

        <form
          className="verify-form"
          onSubmit={(e) => {
            e.preventDefault();
            verifyOtp();
          }}
        >
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
            <button className="resend-link">Resend OTP</button>
          </p>
        </div>
      </div>
    </div>
  );
}
