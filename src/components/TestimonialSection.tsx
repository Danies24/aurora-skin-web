"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "@/styles/components/testimonial.css";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Nisha (Ettaiyapuram)",
      rating: 5,
      text: "Hi Herb Aurora 😇 unagaloda herbal bathing powder super ah irunthuchu face um nalla soft and clean ah aagiruchu. Ennoda boy baby kum use pannaen, soft ah glowing ah skin change aagiruchu. Really love this product 🫂",
    },
    {
      id: 2,
      name: "Jeeva (Sattur)",
      rating: 5,
      text: "Hi Herb Aurora bro,  unga product first purchase pandra apa romba doubt iruthuchu... result tharuma nu... but nejama face avlo glow ahgirchu within a week. I can feel changes romba soft ah iruku kandipa re purchase panuven 👍👍👍",
    },
    {
      id: 3,
      name: "Karthika (Thanjavur)",
      rating: 5,
      text: "Hi pa I got the bath powder and it works really well. I’m really happy with it. Thanks for the free shipping on my first order too! I’ll definitely be ordering more soon 😊. Appreciate the quick delivery and smooth experience!",
    },
    {
      id: 4,
      name: "Prasana (Coimbatore)",
      rating: 5,
      text: "Herb Aurora bathing powder really good! Removes black spots within a week ,brighten and softens my skin. Really I like these products 😍",
    },
    {
      id: 5,
      name: "Vada malar (Coimbatore)",
      rating: 5,
      text: "Product nalla irunthuchi pa.. Black spot la pothu konjam konjam ah and gud product pa. Thank you so much🤎🤩",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2 className="testimonial-title">Happy Customers</h2>
          <p className="testimonial-subtitle">
            See what our customers say about their natural skincare journey
          </p>
        </div>

        <div className="testimonial-card">
          <CardContent className="testimonial-content">
            <div className="testimonial-rating">
              {Array.from({ length: testimonials[currentIndex].rating }).map(
                (_, i) => (
                  <Star key={i} className="testimonial-star" />
                )
              )}
            </div>

            <blockquote className="testimonial-text">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </blockquote>

            <cite className="testimonial-author">
              - {testimonials[currentIndex].name}
            </cite>
          </CardContent>

          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            className="testimonial-nav testimonial-prev"
          >
            <ChevronLeft size={30} />
          </Button>

          <Button
            onClick={nextTestimonial}
            className="testimonial-nav testimonial-next"
          >
            <ChevronRight size={30} />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`testimonial-dot ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
