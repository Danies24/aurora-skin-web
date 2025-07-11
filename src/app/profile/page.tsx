"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import {
  getUserById,
  getAddresses,
  AddressDetail,
} from "@/lib/firebase/firebaseHelpers";
import toast from "react-hot-toast";
import "@/styles/components/profile.css";

type Order = {
  id: string;
  createdAt?: string;
  status?: string;
  cart?: unknown[];
  [key: string]: unknown;
};

const ProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, userId, setLoggedIn, setUserId, setUser, user } =
    useAuthStore();
  const [addresses, setAddresses] = useState<AddressDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const loadUserData = async () => {
      console.log("[Profile] userId:", userId);
      console.log("[Profile] user:", user);
      if (user) {
        setFirstName(user.firstName || "Not provided");
        setLastName(user.lastName || "Not provided");
        setMobile(user.phone || "Not provided");
        setPincode(user.pincode || "Not provided");
      } else if (userId) {
        try {
          const userData = await getUserById(userId);
          if (userData) {
            setUser(userData);
            setFirstName(userData.firstName || "Not provided");
            setLastName(userData.lastName || "Not provided");
            setMobile(userData.phone || "Not provided");
            setPincode(userData.pincode || "Not provided");
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          toast.error("Failed to load profile data");
        }
      }
      // Always fetch addresses after login
      if (userId) {
        try {
          const userAddresses = await getAddresses(userId);
          setAddresses(userAddresses);
          console.log("[Profile] addresses:", userAddresses);
          if (userAddresses.length === 0) {
            toast("No addresses found for this user.");
          }
        } catch (error) {
          console.error("Error loading addresses:", error);
          toast.error("Failed to load addresses");
        }
      }
      setLoading(false);
    };

    loadUserData();

    // Fetch orders
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const userIdToFetch =
          userId || user?.id || (user && "uid" in user ? user.uid : null);
        if (!userIdToFetch) {
          setOrdersError("User ID not found");
          setOrdersLoading(false);
          return;
        }
        const res = await fetch(`/api/orders?userId=${userIdToFetch}`);
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch {
        setOrdersError("Failed to fetch orders");
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [isLoggedIn, userId, user, router, setUser]);

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

  // Manual refresh for debugging
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // force refetch by clearing user in Zustand
      setUser(null);
      // This will trigger the useEffect to fetch from Firestore
    }, 100);
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
                <span>{firstName}</span>
              </div>
              <div className="info-item">
                <label>Last Name</label>
                <span>{lastName}</span>
              </div>
              <div className="info-item">
                <label>Mobile Number</label>
                <span>{mobile}</span>
              </div>
              <div className="info-item">
                <label>Pincode</label>
                <span>{pincode}</span>
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
                      {address.default && (
                        <span className="default-badge">Default</span>
                      )}
                    </div>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
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
            {ordersLoading ? (
              <div className="loading-spinner">Loading orders...</div>
            ) : ordersError ? (
              <p className="no-orders">{ordersError}</p>
            ) : orders.length === 0 ? (
              <p className="no-orders">No orders placed yet</p>
            ) : (
              <div className="order-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div>
                      <strong>Order ID:</strong> {order.id}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "-"}
                    </div>
                    <div>
                      <strong>Status:</strong> {order.status || "Placed"}
                    </div>
                    <div>
                      <strong>Items:</strong>{" "}
                      {order.cart ? order.cart.length : 0}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
            <button
              onClick={handleRefresh}
              className="refresh-button"
              style={{ marginLeft: 8 }}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
