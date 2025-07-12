"use client";

import { FaWhatsapp } from "react-icons/fa";
import "@/styles/components/whatsapp-float.css";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in Herb Aurora's herbal skincare products. Please share more details."
    );
    window.open(`https://wa.me/+918248365737?text=${message}`, "_blank");
  };

  return (
    <div className="whatsapp-float">
      <button
        onClick={handleWhatsAppClick}
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-text">Chat on WhatsApp</span>
      </button>
    </div>
  );
};

export default WhatsAppFloat;
