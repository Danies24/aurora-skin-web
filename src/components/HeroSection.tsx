import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-herb-green to-herb-green-light overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-herb-green/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">
            Herb Aurora
          </h1>
          <div className="w-24 h-1 bg-herb-turmeric mx-auto mb-6"></div>
        </div>

        {/* Tagline */}
        <p
          className="font-playfair text-xl sm:text-2xl lg:text-3xl text-herb-cream mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Pure Skin. Pure Roots. Pure You.
        </p>

        {/* Description */}
        <p
          className="font-inter text-lg sm:text-xl text-herb-cream/90 mb-12 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          100% chemical-free Tamil herbal skincare inspired by traditional
          Paatti remedies. Handmade with love for naturally glowing skin.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button
            onClick={handleShopNow}
            className="bg-herb-turmeric hover:bg-herb-turmeric-dark text-herb-green-dark font-inter font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-herb-turmeric rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute bottom-32 right-16 w-4 h-4 bg-herb-rose rounded-full opacity-60 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-8 w-3 h-3 bg-herb-cream rounded-full opacity-60 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
