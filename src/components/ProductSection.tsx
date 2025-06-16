
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: "Bridal Glow Powder",
      target: "For Women",
      benefit: "Radiant bridal glow for your special day",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-rose"
    },
    {
      id: 2,
      name: "Tan Removal Powder",
      target: "For Men",
      benefit: "Removes stubborn tan naturally and effectively",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-turmeric"
    },
    {
      id: 3,
      name: "Baby Soft Skin Powder",
      target: "For Kids",
      benefit: "Gentle care for delicate baby skin",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "herb-green-light"
    }
  ];

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(`Hi! I'd like to order ${productName} from Herb Aurora. Please share the details.`);
    window.open(`https://wa.me/+919876543210?text=${message}`, '_blank');
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-herb-green-dark mb-4">
            Our Sacred Formulas
          </h2>
          <p className="font-inter text-lg text-herb-green-dark/70 max-w-2xl mx-auto">
            Handcrafted herbal powders for every skin type and age, 
            made with authentic Tamil ingredients
          </p>
        </div>

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
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-${product.color} text-white rounded-full`}>
                    <span className="font-inter text-sm font-medium">{product.target}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-herb-green-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="font-inter text-herb-green-dark/70 mb-6">
                    {product.benefit}
                  </p>
                  
                  <Button 
                    onClick={() => handleWhatsAppOrder(product.name)}
                    className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    Order on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
