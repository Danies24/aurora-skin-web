
"use client";

import { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, RecaptchaVerifier } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import "@/styles/components/login.css";

declare global {
  interface Window {
    confirmationResult: {
      confirm: (code: string) => Promise<unknown>;
    };
  }
}

interface LoginModalProps {
  onClose: () => void;
  onVerifyOtp: () => void;
}

export default function LoginModal({ onClose, onVerifyOtp }: LoginModalProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setPhoneInStore = useAuthStore((s) => s.setPhone);

  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    try {
      const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setPhoneInStore(phone);
      toast.success("OTP sent successfully");
      onVerifyOtp();
    } catch (e) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendOtp();
  };

  return (
    <div className="login-container">
      <button className="close-button" onClick={onClose}>
        <span className="close-icon">×</span>
      </button>

      <div className="login-header">
        <div className="brand-icon">🌿</div>
        <h1 className="login-title">Welcome to Herb Aurora</h1>
        <p className="login-subtitle">
          Enter your mobile number to get started
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="phone" className="input-label">
            Mobile Number
          </label>
          <div className="phone-input-wrapper">
            <span className="country-code">+91</span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your mobile number"
              className="login-input"
              maxLength={10}
              disabled={isLoading}
            />
          </div>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          <span className="button-text">
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </span>
          <span className="button-icon">→</span>
        </button>
      </form>

      <div className="login-footer">
        <p className="footer-text">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
}
