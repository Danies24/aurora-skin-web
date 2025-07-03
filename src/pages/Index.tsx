
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { products } from "@/constants/products";

const Index = () => {
  return (
    <div className="min-h-screen bg-herb-cream">
      <HeroSection />
      <ProductSection
        title={"Best-Selling Herbal Bath Powders 🌿"}
        subTitle={"Loved by 1000+ families for pure, gentle skincare"}
        products={products.slice(0, 4)}
      />
      <TestimonialSection />
      <ProductSection
        title={"Herbal Combo Packs for Every Family 👨‍👩‍👧‍👦"}
        subTitle={
          "Specially curated packs for couples, kids, and complete families"
        }
        products={products.slice(4, 8)}
      />
      <AboutSection />
      <InstagramSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
