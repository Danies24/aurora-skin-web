"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import "@/styles/components/hero.css";

const HeroSection = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/products");
  };

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {/* Tagline */}
        <p className="hero-tagline">Pure Skin. Pure Roots. Pure You.</p>

        {/* Description */}
        <p className="hero-description">
          100% chemical-free Tamil herbal skincare inspired by traditional
          Paatti remedies. Handmade with love for naturally glowing skin.
        </p>

        {/* CTA Button */}
        <div className="hero-cta">
          <Button onClick={handleShopNow} className="hero-button">
            Shop Now
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration hero-decoration-1"></div>
        <div className="hero-decoration hero-decoration-2"></div>
        <div className="hero-decoration hero-decoration-3"></div>
      </div>
    </section>
  );
};

export default HeroSection;
