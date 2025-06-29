"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserByPhone, createUser } from "@/lib/firebase/firebaseHelpers";
import "@/styles/components/verifyotp.css";

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

  const verifyOtp = async () => {
    if (!phone) {
      toast.error("Phone number not found. Please try logging in again.");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      await window.confirmationResult.confirm(otp);

      // Check if user exists in Firestore
      let user = await getUserByPhone(phone);

      if (!user) {
        // Create new user with basic info
        await createUser({
          firstName: "",
          lastName: "",
          phone: phone,
          pincode: "",
        });

        // Get the created user
        user = await getUserByPhone(phone);
      }

      if (user) {
        setLoggedIn(true);
        setUserId(user.id);
        setUser(user);
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error("Failed to create user account");
      }
    } catch (e) {
      toast.error("Invalid OTP");
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
