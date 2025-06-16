
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProductListingPage = () => {
  const products = [
    {
      id: "bridalglow",
      name: "Bridal Glow Powder",
      price: "₹299",
      benefit: "Radiant bridal glow for your special day",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-rose"
    },
    {
      id: "tanremoval",
      name: "Tan Removal Powder",
      price: "₹299", 
      benefit: "Removes stubborn tan naturally and effectively",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-turmeric"
    },
    {
      id: "babysoft",
      name: "Baby Soft Skin Powder",
      price: "₹299",
      benefit: "Gentle care for delicate baby skin",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-green-light"
    }
  ];

  return (
    <div className="min-h-screen bg-herb-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="text-herb-green hover:text-herb-green-dark transition-colors">
            ← Back to Home
          </Link>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-herb-green-dark mt-4">
            Our Sacred Formulas
          </h1>
          <p className="font-inter text-herb-green-dark/70 mt-2">
            Handcrafted herbal powders for every skin type and age
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 bg-${product.color} text-white rounded-full`}>
                    <span className="font-inter text-sm font-bold">{product.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-herb-green-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="font-inter text-herb-green-dark/70 mb-6">
                    {product.benefit}
                  </p>
                  
                  <Link to={`/product?id=${product.id}`}>
                    <Button className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 rounded-full transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
