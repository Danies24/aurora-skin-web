"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/login.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pincode, setPincode] = useState("");
  const { userId, phone, setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !pincode.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      const uid = userId || auth.currentUser?.uid;
      if (!uid) throw new Error("No user ID");
      await setDoc(
        doc(db, "users", uid),
        {
          firstName,
          lastName,
          phoneNumber: phone,
          pincode,
        },
        { merge: true }
      );
      setUser({
        id: uid,
        firstName,
        lastName,
        phone: phone || "",
        pincode,
        createdAt:
          new Date() as unknown as import("firebase/firestore").Timestamp,
      });
      toast.success("Profile completed!");
      router.push("/cart");
    } catch (e) {
      toast.error("Failed to save profile");
      console.error(e);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Complete Your Profile</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber" className="input-label">
              Mobile Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phone || ""}
              readOnly
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="pincode" className="input-label">
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your pincode"
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            <span className="button-text">Save & Continue</span>
            <span className="button-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
