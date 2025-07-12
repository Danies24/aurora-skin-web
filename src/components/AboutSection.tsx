// components/AboutSection.tsx

"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import "@/styles/components/about.css";

const AboutSection = () => {
  const benefits = [
    "Natural skin glow",
    "Effective tan removal",
    "100% baby-safe",
    "Completely chemical-free",
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Content */}
          <div className="about-content">
            <h2 className="about-title">
              Rooted in Tradition,
              <span> Made with Love</span>
            </h2>

            <p className="about-description">
              Herb Aurora brings you the timeless wisdom of Tamil Paatti
              remedies in every handcrafted powder. Using pure ingredients like
              vetiver, rose, turmeric, and aavaram poo, we create skincare
              solutions that have been trusted for generations.
            </p>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <CheckCircle className="benefit-icon" />
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <Image
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Natural herbs and flowers"
                width={800}
                height={384}
                className="about-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
