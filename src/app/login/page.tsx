"use client";

import { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, RecaptchaVerifier } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/login.css";

declare global {
  interface Window {
    confirmationResult: {
      confirm: (code: string) => Promise<unknown>;
    };
  }
}

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

      window.confirmationResult = confirmationResult;
      setPhoneInStore(phone);
      toast.success("OTP sent successfully");
      router.push("/verify-otp");
    } catch (e) {
      toast.error("Failed to send OTP");
      console.error(e);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="close-button" onClick={handleClose}>
          <span className="close-icon">×</span>
        </button>

        <div className="login-container">
          <div className="login-header">
            <div className="brand-icon">🌿</div>
            <h1 className="login-title">Welcome to Herb Aurora</h1>
            <p className="login-subtitle">
              Enter your mobile number to get started
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendOtp();
            }}
          >
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
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
            <p className="footer-text">
              Don&apos;t have an account?{" "}
              <a href="/register" className="register-link">
                Register here
              </a>
            </p>
          </div>

          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
}
