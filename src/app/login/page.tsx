"use client";
import { auth } from "@/lib/firebase/firebase";
import { useAuthStore } from "../../store/authStore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    confirmationResult: ConfirmationResult;
  }
}

export default function LoginPage() {
  const [number, setNumber] = useState("");
  const router = useRouter();
  const setPhone = useAuthStore((s) => s.setPhone);

  const sendOtp = async () => {
    if (!number || number.length !== 10)
      return toast.error("Enter valid 10-digit number");

    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${number}`,
        recaptcha
      );
      window.confirmationResult = confirmation;
      setPhone(number);
      router.push("/verify-otp");
    } catch (e) {
      toast.error("OTP Failed");
      console.log(e);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Login with Mobile</h2>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter mobile number"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={sendOtp}
        className="bg-black text-white w-full py-2 mt-3 rounded"
      >
        Send OTP
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}
