
"use client";

import { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, RecaptchaVerifier } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/login.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const setPhoneInStore = useAuthStore((s) => s.setPhone);

  const sendOtp = async () => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );
      
      (window as any).confirmationResult = confirmationResult;
      setPhoneInStore(phone);
      toast.success("OTP sent successfully");
      router.push("/verify-otp");
    } catch (e) {
      toast.error("Failed to send OTP");
      console.error(e);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="brand-icon">🌿</div>
          <h1 className="login-title">Welcome to Herb Aurora</h1>
          <p className="login-subtitle">
            Enter your mobile number to get started
          </p>
        </div>
        
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
          <div className="input-group">
            <label htmlFor="phone" className="input-label">Mobile Number</label>
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
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
