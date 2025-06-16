import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "@/constants/products";
import HamburgerMenu from "@/components/HamburgerMenu";

const ProductListingPage = () => {
  const products = getAllProducts();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-herb-cream">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                <div className="relative overflow-hidden rounded-t-lg p-6">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{product.benefit}</p>
                    <p className="text-herb-green font-semibold mb-4">
                      ₹{product.variants[0].price}
                    </p>
                  </div>
                  <Button
                    className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 rounded-full transition-all duration-300"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
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
