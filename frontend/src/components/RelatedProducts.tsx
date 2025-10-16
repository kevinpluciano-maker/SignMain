import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

interface RelatedProductsProps {
  currentProductId: string;
  currentProductCategory?: string;
  maxProducts?: number;
}

const RelatedProducts = ({ 
  currentProductId, 
  currentProductCategory = '',
  maxProducts = 4 
}: RelatedProductsProps) => {
  const navigate = useNavigate();
  const { convertPrice, currency } = useCurrency();

  // Get related products
  const relatedProducts = useMemo(() => {
    // Filter by same category, exclude current product
    let related = products.filter(
      p => p.id !== currentProductId && p.category === currentProductCategory
    );

    // If not enough from same category, add popular products
    if (related.length < maxProducts) {
      const additional = products
        .filter(p => p.id !== currentProductId && p.category !== currentProductCategory)
        .slice(0, maxProducts - related.length);
      related = [...related, ...additional];
    }

    // Shuffle and limit
    return related
      .sort(() => Math.random() - 0.5)
      .slice(0, maxProducts);
  }, [currentProductId, currentProductCategory, maxProducts]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Customers Also Bought
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card 
            key={product.id} 
            className="group hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-cyan-600">
                    {currency === 'CAD' ? 'CA' : ''}{currency === 'USD' ? '$' : '$'}
                    {convertPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${product.id}`);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
