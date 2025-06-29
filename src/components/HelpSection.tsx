"use client";

import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";
import "@/styles/components/help-section.css";

const HelpSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+918248365737?text=${encodedMessage}`, "_blank");
  };

  const faqs = [
    {
      question: "When will I receive my order?",
      answer:
        "Orders are typically delivered within 3-5 business days within Tamil Nadu. For other states, delivery may take 5-7 business days. We'll send you tracking details once your order ships.",
    },
    {
      question: "Is this suitable for daily use?",
      answer:
        "Yes, all our products are made with natural ingredients and are safe for daily use. However, we recommend starting with 2-3 times per week and gradually increasing frequency based on your skin's response.",
    },
    {
      question: "Do you deliver outside Tamil Nadu?",
      answer:
        "Yes, we deliver across India! Shipping rates and delivery times may vary based on your location. International shipping is currently not available.",
    },
  ];

  return (
    <section className="help-section">
      <div className="help-container">
        <h1 className="help-title">Need Help or Recommendations?</h1>
        <p className="help-description">
          We&apos;re just a message away for product suggestions, order
          tracking, and skincare guidance.
        </p>

        <div className="help-cta">
          <button
            onClick={() =>
              handleWhatsAppClick("Hi! I need help with my order.")
            }
            className="primary-button"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </button>
          <a href="mailto:support@herbaurora.in" className="email-link">
            support@herbaurora.in
          </a>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="suggestion-section">
          <h2 className="suggestion-title">
            Not sure which product suits your skin?
          </h2>
          <button
            onClick={() =>
              handleWhatsAppClick(
                "Hi! I need help choosing the right product for my skin."
              )
            }
            className="secondary-button"
          >
            <FaWhatsapp /> Get Suggestion on WhatsApp
          </button>
        </div>

        <div className="social-links">
          <a
            href="https://instagram.com/herbaurora"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/@herbaurora"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/+918248365737"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
