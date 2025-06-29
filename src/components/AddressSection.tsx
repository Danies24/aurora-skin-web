
"use client";

import React, { useState } from "react";
import "@/styles/components/address.css";

interface Address {
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

const AddressSection = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [savedAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "9876543210",
      pincode: "600001",
      street: "123 Main Street",
      landmark: "Near Park",
      city: "Chennai",
      state: "Tamil Nadu",
      isDefault: true
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    landmark: "",
    city: "",
    state: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Address submitted:", formData);
    setShowForm(false);
  };

  return (
    <div className="address-section">
      <h2 className="address-title">Delivery Address</h2>
      
      {savedAddresses.length > 0 && (
        <div className="saved-addresses">
          <h3 className="saved-addresses-title">Saved Addresses</h3>
          {savedAddresses.map((address) => (
            <div key={address.id} className="address-card">
              <input
                type="radio"
                id={address.id}
                name="selectedAddress"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="address-radio"
              />
              <label htmlFor={address.id} className="address-label">
                <div className="address-details">
                  <h4 className="address-name">{address.name}</h4>
                  <p className="address-phone">{address.phone}</p>
                  <p className="address-full">
                    {address.street}, {address.landmark}<br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
      
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
