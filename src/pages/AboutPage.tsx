import React from "react";
import Image from "next/image";
import { FaLeaf, FaHandHoldingHeart, FaFlask } from "react-icons/fa";
import "@/styles/components/about.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay" />
        <Image
          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Herb Aurora Banner"
          fill
          priority
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Herb Aurora</h1>
            <p className="hero-subtitle">
              Preserving Ancient Wisdom Through Modern Care
            </p>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="about-content">
        <div className="about-section">
          <h2 className="section-title">Our Story</h2>
          <p className="section-text">
            At Herb Aurora, we blend the ancient wisdom of Tamil herbal
            traditions with modern skincare science. Our journey began with a
            simple mission: to create natural, effective bathing powders that
            honor our rich cultural heritage while meeting contemporary skincare
            needs.
          </p>
        </div>

        {/* Values Section */}
        <div className="values-grid">
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h3 className="value-title">Natural Ingredients</h3>
            <p className="value-text">
              We source only the finest natural ingredients, carefully selected
              for their proven benefits and purity.
            </p>
          </div>
          <div className="value-card">
            <FaHandHoldingHeart className="value-icon" />
            <h3 className="value-title">Traditional Wisdom</h3>
            <p className="value-text">
              Our formulas are rooted in centuries-old Tamil herbal traditions,
              passed down through generations.
            </p>
          </div>
          <div className="value-card">
            <FaFlask className="value-icon" />
            <h3 className="value-title">Modern Innovation</h3>
            <p className="value-text">
              We combine traditional knowledge with modern research to create
              effective, safe products.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mission-card">
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-text">
            We are committed to creating bathing powders that not only cleanse
            and nourish the skin but also connect people with the rich heritage
            of Tamil herbal traditions. Each product is crafted with care, using
            authentic ingredients and traditional methods, ensuring that our
            customers experience the benefits of nature&apos;s wisdom in their
            daily skincare routine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
