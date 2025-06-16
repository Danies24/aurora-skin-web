import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/constants/products";

const ProductSection = () => {
  const navigate = useNavigate();
  const products = getAllProducts();

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(
      `Hi! I'd like to order ${productName} from Herb Aurora. Please share the details.`
    );
    window.open(`https://wa.me/+918248365737?text=${message}`, "_blank");
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-herb-green-dark mb-4">
            Our Sacred Formulas
          </h2>
          <p className="font-inter text-lg text-herb-green-dark/70 max-w-2xl mx-auto">
            Handcrafted herbal powders for every skin type and age, made with
            authentic Tamil ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 bg-${product.color} text-white rounded-full`}
                  >
                    <span className="font-inter text-sm font-medium">
                      {product.target}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-herb-green-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="font-inter text-herb-green-dark/70 mb-6">
                    {product.benefit}
                  </p>
                  <p className="text-herb-green font-semibold mb-4">
                    ₹{product.variants[0].price}
                  </p>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppOrder(product.name);
                    }}
                    className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    Order on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/products")}
            className="bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            View More Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
