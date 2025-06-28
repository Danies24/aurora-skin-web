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
      name: "Priya Sharma",
      rating: 5,
      text: "My skin has never looked better! The bridal glow powder gave me the perfect radiance for my wedding day. Thank you Herb Aurora!",
    },
    {
      id: 2,
      name: "Raj Kumar",
      rating: 5,
      text: "Amazing tan removal powder! After months of sun exposure, this brought back my original skin tone naturally. Highly recommended!",
    },
    {
      id: 3,
      name: "Meera Devi",
      rating: 5,
      text: "I've been using the baby powder for my 6-month-old. It's so gentle and keeps her skin soft and rash-free. Pure and natural!",
    },
    {
      id: 4,
      name: "Anita Lakshmi",
      rating: 5,
      text: "Traditional formulas that actually work! My grandmother would be proud. The turmeric glow is exactly what I was looking for.",
    },
    {
      id: 5,
      name: "Suresh Babu",
      rating: 5,
      text: "Chemical-free and effective. My wife and I both use different variants. The quality is outstanding and delivery is prompt.",
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
            <ChevronLeft />
          </Button>

          <Button
            onClick={nextTestimonial}
            className="testimonial-nav testimonial-next"
          >
            <ChevronRight />
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
