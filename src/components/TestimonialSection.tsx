
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "My skin has never looked better! The bridal glow powder gave me the perfect radiance for my wedding day. Thank you Herb Aurora!"
    },
    {
      id: 2,
      name: "Raj Kumar",
      rating: 5,
      text: "Amazing tan removal powder! After months of sun exposure, this brought back my original skin tone naturally. Highly recommended!"
    },
    {
      id: 3,
      name: "Meera Devi",
      rating: 5,
      text: "I've been using the baby powder for my 6-month-old. It's so gentle and keeps her skin soft and rash-free. Pure and natural!"
    },
    {
      id: 4,
      name: "Anita Lakshmi",
      rating: 5,
      text: "Traditional formulas that actually work! My grandmother would be proud. The turmeric glow is exactly what I was looking for."
    },
    {
      id: 5,
      name: "Suresh Babu",
      rating: 5,
      text: "Chemical-free and effective. My wife and I both use different variants. The quality is outstanding and delivery is prompt."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 sm:py-24 bg-herb-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-herb-green-dark mb-4">
            Happy Customers
          </h2>
          <p className="font-inter text-lg text-herb-green-dark/70">
            See what our customers say about their natural skincare journey
          </p>
        </div>

        <div className="relative">
          <Card className="bg-white shadow-xl border-0 min-h-[280px] flex items-center">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-herb-turmeric fill-current" />
                ))}
              </div>
              
              <blockquote className="font-inter text-lg sm:text-xl text-herb-green-dark/80 mb-6 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>
              
              <cite className="font-playfair text-xl font-semibold text-herb-green-dark">
                - {testimonials[currentIndex].name}
              </cite>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-herb-green-light hover:text-white border-herb-green-light"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-herb-green-light hover:text-white border-herb-green-light"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-herb-green' : 'bg-herb-green/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
