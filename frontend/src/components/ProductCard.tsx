import { useState } from "react";
import { OptimizedImage } from "@/hooks/useImageOptimization";
import { Star, StarHalf, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string | number;
  originalPrice?: string | number;
  rating: number;
  reviews?: number;
  reviewCount?: number;
  colors?: string[];
  isNew?: boolean;
  badges?: string[];
  materials?: string[];
  designs?: string[];
  glbUrl?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  reviewCount,
  colors = [],
  isNew = false,
  badges = [],
  glbUrl
}: ProductCardProps) => {
  const { convertPrice, selectedCurrency } = useCurrency();
  const { addToCart, isInCart, totalItems } = useCart();
  const displayReviews = reviews || reviewCount || 0;
  const [isAdding, setIsAdding] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-primary text-primary" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />);
    }

    return stars;
  };


  return (
    <Link to={`/products/${id}`}>
      <Card className="group relative overflow-hidden cursor-pointer border-0 bg-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl backdrop-blur-sm border border-border/50">
        {isNew && (
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            New
          </div>
        )}
        
        {/* Floating discount badge */}
        {originalPrice && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)}%
          </div>
        )}
        
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 relative">
            <OptimizedImage
              src={image}
              alt={name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              priority={false}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            
            {/* Rating badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-900">{rating}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4">
            {/* Product Name */}
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] text-gray-900">
              {name}
            </h3>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                ({displayReviews})
              </span>
            </div>

            {/* Price Display */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">
                  {convertPrice(price)}
                </span>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {selectedCurrency}
                </span>
              </div>
              {originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-base text-muted-foreground line-through">
                    {convertPrice(originalPrice)}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-lg font-bold">
                    Save {convertPrice(Number(originalPrice) - Number(price))}
                  </span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <Button 
              className="w-full mt-6 py-3 font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform" 
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Select Options
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;