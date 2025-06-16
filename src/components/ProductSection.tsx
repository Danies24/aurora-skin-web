import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/constants/products";

const ProductSection = () => {
  const products = getAllProducts().slice(0, 3); // Get only first 3 products
  const navigate = useNavigate();

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
    <section className="py-16 bg-herb-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-herbal text-herb-green text-center mb-12">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.benefit}</p>
                <p className="text-herb-green font-semibold mb-4">
                  ₹{product.variants[0].price}
                </p>

                <Button className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 rounded-full transition-all duration-300">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate("/products")}
            className="bg-herb-green hover:bg-herb-green-dark text-white font-inter font-semibold py-3 px-8 transition-all duration-300"
          >
            View More Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
