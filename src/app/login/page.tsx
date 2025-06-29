
"use client";

import { auth } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/login.css";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export default function LoginPage() {
  const [number, setNumber] = useState("");
  const router = useRouter();
  const setPhone = useAuthStore((s) => s.setPhone);

  useEffect(() => {
    // Attach reCAPTCHA only once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
        }
      );
    }
  }, []);

  const sendOtp = async () => {
    if (!number || number.length !== 10) {
      toast.error("Enter valid 10-digit number");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${number}`,
        appVerifier
      );

      window.confirmationResult = confirmation;
      setPhone(number);
      router.push("/verify-otp");
    } catch (e) {
      console.error("OTP Error", e);
      toast.error("OTP Failed. Try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="brand-icon">🌿</div>
          <h1 className="login-title">Welcome to Herb Aurora</h1>
          <p className="login-subtitle">Enter your mobile number to continue</p>
        </div>
        
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
          <div className="input-group">
            <label htmlFor="mobile" className="input-label">Mobile Number</label>
            <div className="phone-input-wrapper">
              <span className="country-code">+91</span>
              <input
                id="mobile"
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                className="login-input"
                maxLength={10}
              />
            </div>
          </div>
          
          <button type="submit" className="login-button">
            <span className="button-text">Send OTP</span>
            <span className="button-icon">→</span>
          </button>
        </form>
        
        <div className="login-footer">
          <p className="footer-text">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
        
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
