
"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@/styles/components/register.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId, phone, setUser } = useAuthStore();
  const router = useRouter();

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
      router.push("/cart");
    } catch (e) {
      toast.error("Failed to save profile");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-button" onClick={handleGoBack}>
          <span className="back-icon">←</span>
          <span className="back-text">Back</span>
        </button>

        <div className="register-header">
          <div className="brand-icon">🌿</div>
          <h1 className="register-title">Complete Your Profile</h1>
          <p className="register-subtitle">
            Just a few details to get you started with Herb Aurora
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="register-input"
                disabled={isLoading}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="register-input"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="phoneNumber" className="input-label">
              Mobile Number
            </label>
            <div className="phone-display">
              <span className="country-code">+91</span>
              <input
                id="phoneNumber"
                type="text"
                value={phone || ""}
                readOnly
                className="register-input readonly"
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="pincode" className="input-label">
              Pincode *
            </label>
            <input
              id="pincode"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your 6-digit pincode"
              className="register-input"
              maxLength={6}
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="register-button" disabled={isLoading}>
            <span className="button-text">
              {isLoading ? "Saving..." : "Save & Continue"}
            </span>
            <span className="button-icon">→</span>
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            By continuing, you agree to our{" "}
            <a href="/privacy" className="footer-link">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
