import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "@/styles/components/page.css";

export default function Home() {
  return (
    <div className="page-container">
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <TestimonialSection />
      <InstagramSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
