
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import { getUserById, getAddresses, AddressDetail } from "@/lib/firebase/firebaseHelpers";
import toast from "react-hot-toast";
import "@/styles/components/profile.css";

const ProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, userId, user, setLoggedIn, setUserId, setUser } = useAuthStore();
  const [addresses, setAddresses] = useState<AddressDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const loadUserData = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          if (userData) {
            setUser(userData);
          }

          const userAddresses = await getAddresses(userId);
          setAddresses(userAddresses);
        } catch (error) {
          console.error("Error loading user data:", error);
          toast.error("Failed to load profile data");
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, [isLoggedIn, userId, router, setUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setUserId(null);
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>First Name</label>
                <span>{user?.firstName || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>Last Name</label>
                <span>{user?.lastName || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>Mobile Number</label>
                <span>{user?.phone || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>Pincode</label>
                <span>{user?.pincode || "Not provided"}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="section-title">Address Book</h2>
            {addresses.length > 0 ? (
              <div className="address-list">
                {addresses.map((address) => (
                  <div key={address.id} className="address-card">
                    <div className="address-header">
                      <h3>{address.fullName}</h3>
                      {address.default && <span className="default-badge">Default</span>}
                    </div>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-addresses">No addresses added yet</p>
            )}
          </div>

          <div className="profile-section">
            <h2 className="section-title">Order History</h2>
            <p className="no-orders">No orders placed yet</p>
          </div>

          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
