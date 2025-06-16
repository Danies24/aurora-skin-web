import React from "react";
import { FaLeaf, FaHandHoldingHeart, FaFlask } from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-herb-cream">
      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-herb-green/10">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Herb Aurora Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-herbal mb-4">
              Herb Aurora
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Preserving Ancient Wisdom Through Modern Care
            </p>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-herbal text-herb-green mb-4">
            Our Story
          </h2>
          <p className="text-herb-green-dark text-lg leading-relaxed">
            At Herb Aurora, we blend the ancient wisdom of Tamil herbal
            traditions with modern skincare science. Our journey began with a
            simple mission: to create natural, effective bathing powders that
            honor our rich cultural heritage while meeting contemporary skincare
            needs.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaLeaf className="w-12 h-12 text-herb-green mx-auto mb-4" />
            <h3 className="text-xl font-herbal text-herb-green mb-2">
              Natural Ingredients
            </h3>
            <p className="text-herb-green-dark">
              We source only the finest natural ingredients, carefully selected
              for their proven benefits and purity.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaHandHoldingHeart className="w-12 h-12 text-herb-green mx-auto mb-4" />
            <h3 className="text-xl font-herbal text-herb-green mb-2">
              Traditional Wisdom
            </h3>
            <p className="text-herb-green-dark">
              Our formulas are rooted in centuries-old Tamil herbal traditions,
              passed down through generations.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaFlask className="w-12 h-12 text-herb-green mx-auto mb-4" />
            <h3 className="text-xl font-herbal text-herb-green mb-2">
              Modern Innovation
            </h3>
            <p className="text-herb-green-dark">
              We combine traditional knowledge with modern research to create
              effective, safe products.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-herbal text-herb-green mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-herb-green-dark text-lg leading-relaxed">
            We are committed to creating bathing powders that not only cleanse
            and nourish the skin but also connect people with the rich heritage
            of Tamil herbal traditions. Each product is crafted with care, using
            authentic ingredients and traditional methods, ensuring that our
            customers experience the benefits of nature's wisdom in their daily
            skincare routine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
