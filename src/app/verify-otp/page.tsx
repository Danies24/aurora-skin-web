"use client";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      console.error(e); // Optional for debugging
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={verifyOtp}
        className="bg-black text-white w-full py-2 mt-3 rounded"
      >
        Verify & Login
      </button>
    </div>
  );
}
