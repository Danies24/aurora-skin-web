"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import "@/styles/components/instagram.css";

const InstagramSection = () => {
  const instagramPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://instagram.com/herbaurora",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://instagram.com/herbaurora",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://instagram.com/herbaurora",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://instagram.com/herbaurora",
    },
  ];

  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <div className="instagram-header">
          <h2 className="instagram-title">Follow Our Journey</h2>
          <p className="instagram-subtitle">
            See how our products are making a difference in people&apos;s lives
          </p>
        </div>

        <div className="instagram-grid">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                width={400}
                height={400}
                className="instagram-image"
              />
              <div className="instagram-overlay">
                <Instagram className="instagram-icon" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
