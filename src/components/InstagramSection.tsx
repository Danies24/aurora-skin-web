"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import "@/styles/components/instagram.css";

const InstagramSection = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "/images/instagram/reel1.jpg", // <-- Use your own thumbnail image here
      link: "https://www.instagram.com/reel/DL_9wgByJH2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 2,
      image: "/images/instagram/reel2.jpg",
      link: "https://www.instagram.com/reel/DL_9wgByJH2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 3,
      image: "/images/instagram/reel3.jpg",
      link: "https://www.instagram.com/reel/DL_9wgByJH2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 4,
      image: "/images/instagram/reel4.jpg",
      link: "https://www.instagram.com/reel/DL_9wgByJH2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
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
              <div style={{ position: "relative" }}>
                <Image
                  src={post.image}
                  alt="Instagram Reel thumbnail"
                  width={400}
                  height={400}
                  className="instagram-image"
                />
                <div className="instagram-overlay">
                  <span
                    className="play-button"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: 64,
                      color: "white",
                      textShadow: "0 0 10px black",
                      pointerEvents: "none",
                    }}
                  >
                    ▶️
                  </span>
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
