
"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import "@/styles/components/login.css";

interface RegisterModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterModal({ onClose, onSuccess }: RegisterModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId, phone, setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !pincode.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setIsLoading(true);
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
        createdAt: new Date() as unknown as import("firebase/firestore").Timestamp,
      });
      
      toast.success("Profile completed!");
      onSuccess();
    } catch (e) {
      toast.error("Failed to save profile");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <button className="close-button" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <span className="close-icon">×</span>
      </button>

      <div className="login-header">
        <div className="brand-icon">🌿</div>
        <h1 className="login-title">Complete Your Profile</h1>
        <p className="login-subtitle">
          Just a few details to get you started
        </p>
      </div>

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
            disabled={isLoading}
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
            disabled={isLoading}
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
            style={{ backgroundColor: '#f8faf8', color: '#6b7280' }}
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
            maxLength={6}
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" className="login-button" disabled={isLoading}>
          <span className="button-text">
            {isLoading ? "Saving..." : "Save & Continue"}
          </span>
          <span className="button-icon">→</span>
        </button>
      </form>
    </div>
  );
}
