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
import "@/styles/components/login.css"; // custom CSS file

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
    <div className="login-container">
      <h2 className="login-title">Login with Mobile</h2>
      <input
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter mobile number"
        className="login-input"
      />
      <button onClick={sendOtp} className="login-button">
        Send OTP
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}
