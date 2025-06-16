
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProductDetailPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const productData = {
    bridalglow: {
      id: "bridalglow",
      name: "Bridal Glow Powder",
      price: "₹299",
      description: "Transform your skin with our traditional Bridal Glow Powder, specially crafted for your most special day. This sacred blend of Tamil herbal ingredients has been passed down through generations, ensuring your skin radiates with natural luminosity and ethereal glow.",
      ingredients: [
        "Pure Turmeric (Manjal)",
        "Rose Petals (Roja)",
        "Sandalwood Powder (Chandanam)",
        "Vetiver (Vettiver)",
        "Orange Peel Powder",
        "Kasturi Turmeric"
      ],
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "herb-rose"
    },
    tanremoval: {
      id: "tanremoval",
      name: "Tan Removal Powder",
      price: "₹299",
      description: "Say goodbye to stubborn tan with our powerful yet gentle Tan Removal Powder. Formulated with traditional Tamil ingredients known for their skin-brightening properties, this herbal blend naturally exfoliates and removes tan while nourishing your skin.",
      ingredients: [
        "Aavaram Poo (Senna Auriculata)",
        "Raw Turmeric (Pachai Manjal)",
        "Lemon Peel Powder",
        "Gram Flour (Kadalai Maavu)",
        "Neem Powder",
        "Fuller's Earth (Multani Mitti)"
      ],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "herb-turmeric"
    },
    babysoft: {
      id: "babysoft",
      name: "Baby Soft Skin Powder",
      price: "₹299",
      description: "Gentle care for your little one's delicate skin with our Baby Soft Skin Powder. Made with the mildest Tamil herbs, this powder is specially formulated to be safe for babies while providing natural cleansing and nourishment for soft, healthy skin.",
      ingredients: [
        "Green Gram Powder (Payatham Paruppu)",
        "Rice Flour (Arisi Maavu)",
        "Dried Rose Petals",
        "Coconut Milk Powder",
        "Aloe Vera Powder",
        "Gentle Turmeric"
      ],
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "herb-green-light"
    }
  };

  const product = productId ? productData[productId as keyof typeof productData] : null;

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(`Hi! I'd like to order ${productName} from Herb Aurora. Please share the details and confirm availability.`);
    window.open(`https://wa.me/+919876543210?text=${message}`, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-herb-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-2xl text-herb-green-dark mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button className="bg-herb-green hover:bg-herb-green-dark text-white">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-herb-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/products" className="inline-flex items-center text-herb-green hover:text-herb-green-dark transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-herb-green-dark">
            {product.name}
          </h1>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardContent className="p-0">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className={`absolute top-6 right-6 px-4 py-2 bg-${product.color} text-white rounded-full shadow-lg`}>
                  <span className="font-inter text-lg font-bold">{product.price}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-herb-green-dark mb-4">
                Product Description
              </h2>
              <p className="font-inter text-herb-green-dark/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="font-playfair text-xl font-bold text-herb-green-dark mb-4">
                Natural Ingredients
              </h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="font-inter text-herb-green-dark/80 flex items-center">
                    <span className="w-2 h-2 bg-herb-green rounded-full mr-3 flex-shrink-0"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="font-playfair text-2xl font-bold text-herb-green-dark">
                  {product.price}
                </span>
                <span className="font-inter text-herb-green-dark/60">
                  100g Pack
                </span>
              </div>
              
              <Button 
                onClick={() => handleWhatsAppOrder(product.name)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-inter font-semibold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Order on WhatsApp
              </Button>
              
              <p className="font-inter text-herb-green-dark/60 text-sm text-center mt-3">
                Free delivery across Tamil Nadu 🌿
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
