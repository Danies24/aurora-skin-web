
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const InstagramSection = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Natural herbs and flowers"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Herbal skincare ingredients"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Traditional Tamil ingredients"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Natural skincare preparation"
    }
  ];

  const handleInstagramClick = () => {
    window.open('https://instagram.com/herbauroraoffl', '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-herb-green-dark mb-4">
            Follow Our Journey
          </h2>
          <p className="font-inter text-lg text-herb-green-dark/70 mb-8">
            See behind the scenes of our handcrafted herbal skincare products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <div 
              key={post.id}
              className="relative group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleInstagramClick}
            >
              <img 
                src={post.image}
                alt={post.alt}
                className="w-full h-48 sm:h-56 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-herb-green/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleInstagramClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-inter font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
