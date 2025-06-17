
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-herb-cream">
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <TestimonialSection />
      <InstagramSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
