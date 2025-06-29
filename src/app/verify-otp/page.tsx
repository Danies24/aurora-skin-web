"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/verifyOtp.css"; // 👈 Import custom CSS

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn);

  const verifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      setLoggedIn(true);
      toast.success("Login successful");
      router.push("/");
    } catch (e) {
      toast.error("Invalid OTP");
      console.error(e);
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">Enter OTP</h2>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="verify-input"
      />
      <button onClick={verifyOtp} className="verify-button">
        Verify & Login
      </button>
    </div>
  );
}
