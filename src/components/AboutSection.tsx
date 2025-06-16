
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const benefits = [
    "Natural skin glow",
    "Effective tan removal", 
    "100% baby-safe ingredients",
    "Completely chemical-free"
  ];

  return (
    <section className="py-16 sm:py-24 bg-herb-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-herb-green-dark mb-6">
              Rooted in Tradition,
              <span className="text-herb-turmeric"> Made with Love</span>
            </h2>
            
            <p className="font-inter text-lg text-herb-green-dark/80 mb-8 leading-relaxed">
              Herb Aurora brings you the timeless wisdom of Tamil Paatti remedies in every handcrafted powder. 
              Using pure ingredients like vetiver, rose, turmeric, and aavaram poo, we create skincare solutions 
              that have been trusted for generations.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-herb-green flex-shrink-0" />
                  <span className="font-inter text-herb-green-dark font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Natural herbs and flowers"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-herb-turmeric rounded-full flex items-center justify-center shadow-lg">
                <span className="font-playfair text-2xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
