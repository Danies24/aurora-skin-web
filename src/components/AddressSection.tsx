"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/firebase/firebaseHelpers";
import toast from "react-hot-toast";
import "@/styles/components/address.css";
import { useRouter } from "next/navigation";

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

interface AddressSectionProps {
  onSelectAddress?: (address: Address) => void;
}

const AddressSection = ({ onSelectAddress }: AddressSectionProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, isLoggedIn } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        if (isLoggedIn && userId) {
          // Load from Firestore
          const firestoreAddresses = await getAddresses(userId);
          // Transform Firestore addresses to match local interface
          const transformedAddresses = firestoreAddresses.map((addr) => ({
            id: addr.id,
            name: addr.fullName,
            phone: addr.phone,
            pincode: addr.pincode,
            street: addr.addressLine1,
            landmark: addr.landmark || "",
            city: addr.city,
            state: addr.state,
            isDefault: addr.default,
          }));
          setSavedAddresses(transformedAddresses);
        } else {
          // Fallback to mock data for non-logged in users
          setSavedAddresses([
            {
              id: "1",
              name: "John Doe",
              phone: "9876543210",
              pincode: "600001",
              street: "123 Main Street",
              landmark: "Near Park",
              city: "Chennai",
              state: "Tamil Nadu",
              isDefault: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading addresses:", error);
        toast.error("Failed to load addresses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, [userId, isLoggedIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLoggedIn && userId) {
        // Add to Firestore
        await addAddress(userId, {
          fullName: formData.name,
          phone: formData.phone,
          pincode: formData.pincode,
          addressLine1: formData.street,
          addressLine2: "",
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          default: savedAddresses.length === 0, // First address becomes default
        });

        // Reload addresses
        const firestoreAddresses = await getAddresses(userId);
        const transformedAddresses = firestoreAddresses.map((addr) => ({
          id: addr.id,
          name: addr.fullName,
          phone: addr.phone,
          pincode: addr.pincode,
          street: addr.addressLine1,
          landmark: addr.landmark || "",
          city: addr.city,
          state: addr.state,
          isDefault: addr.default,
        }));
        setSavedAddresses(transformedAddresses);

        toast.success("Address added successfully.");
        router.push("/checkout/payment");
      } else {
        // Fallback for non-logged in users
        const newAddress: Address = {
          id: Date.now().toString(),
          name: formData.name,
          phone: formData.phone,
          pincode: formData.pincode,
          street: formData.street,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          isDefault: savedAddresses.length === 0,
        };

        setSavedAddresses([...savedAddresses, newAddress]);
        toast.success("Address added successfully.");
      }

      setShowForm(false);
      setFormData({
        name: "",
        phone: "",
        pincode: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
      });
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      if (isLoggedIn && userId) {
        await setDefaultAddress(userId, addressId);

        // Reload addresses
        const firestoreAddresses = await getAddresses(userId);
        const transformedAddresses = firestoreAddresses.map((addr) => ({
          id: addr.id,
          name: addr.fullName,
          phone: addr.phone,
          pincode: addr.pincode,
          street: addr.addressLine1,
          landmark: addr.landmark || "",
          city: addr.city,
          state: addr.state,
          isDefault: addr.default,
        }));
        setSavedAddresses(transformedAddresses);

        toast.success("Default address updated.");
      } else {
        // Update local state for non-logged in users
        const updatedAddresses = savedAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        }));
        setSavedAddresses(updatedAddresses);

        toast.success("Default address updated.");
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to set default address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      if (isLoggedIn && userId) {
        await deleteAddress(userId, addressId);

        // Reload addresses
        const firestoreAddresses = await getAddresses(userId);
        const transformedAddresses = firestoreAddresses.map((addr) => ({
          id: addr.id,
          name: addr.fullName,
          phone: addr.phone,
          pincode: addr.pincode,
          street: addr.addressLine1,
          landmark: addr.landmark || "",
          city: addr.city,
          state: addr.state,
          isDefault: addr.default,
        }));
        setSavedAddresses(transformedAddresses);

        toast.success("Address deleted successfully.");
      } else {
        // Update local state for non-logged in users
        const updatedAddresses = savedAddresses.filter(
          (addr) => addr.id !== addressId
        );
        setSavedAddresses(updatedAddresses);

        toast.success("Address deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="address-section">
        <div className="address-container">
          <h2 className="address-title">Loading addresses...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="address-section">
      <h2 className="address-title">Delivery Address</h2>

      <div className="address-list">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`address-card ${
              selectedAddress === address.id ? "selected" : ""
            } ${address.isDefault ? "default" : ""}`}
            onClick={() => {
              setSelectedAddress(address.id);
              if (onSelectAddress) onSelectAddress(address);
            }}
          >
            <div className="address-content">
              <h3 className="address-name">{address.name}</h3>
              <p className="address-phone">{address.phone}</p>
              <p className="address-details">
                {address.street}, {address.landmark && `${address.landmark}, `}
                {address.city}, {address.state} - {address.pincode}
              </p>
              {address.isDefault && (
                <span className="default-badge">Default</span>
              )}
            </div>
            <div className="address-actions">
              {!address.isDefault && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(address.id);
                  }}
                  className="set-default-button"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAddress(address.id);
                }}
                className="delete-address-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="add-address-button"
      >
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Landmark (Optional)</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="save-address-button">
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default AddressSection;
