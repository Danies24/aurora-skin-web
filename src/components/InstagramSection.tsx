"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import "@/styles/components/instagram.css";

const instagramPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://instagram.com/herbaurora",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://instagram.com/herbaurora",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://instagram.com/herbaurora",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://instagram.com/herbaurora",
  },
];

const InstagramSection = () => {
  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <div className="instagram-header">
          <h2 className="instagram-title">Follow Our Journey</h2>
          <p className="instagram-subtitle">
            Join us on Instagram for daily inspiration and updates
          </p>
        </div>
        <div className="instagram-grid">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item"
            >
              <div className="instagram-image-container">
                <Image
                  src={post.image}
                  alt="Instagram post"
                  fill
                  className="instagram-image"
                />
                <div className="instagram-overlay">
                  <Instagram className="instagram-icon" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
