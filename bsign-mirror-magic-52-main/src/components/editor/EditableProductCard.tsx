import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEditor } from "@/contexts/EditorContext";
import InlineEditor from "./InlineEditor";

interface EditableProductCardProps {
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
}

const EditableProductCard = ({
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
  badges = []
}: EditableProductCardProps) => {
  const { isEditing, productData, updateProductData } = useEditor();
  
  const displayReviews = reviews || reviewCount || 0;

  // Get current product data (original + any edits)
  const currentProductData = productData[id];
  const displayName = currentProductData?.name ?? name;

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


  const handleNameSave = (newName: string) => {
    updateProductData(id, { name: newName });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
    }
  };

  return (
    <Link to={`/products/${id}`} onClick={handleCardClick}>
      <Card className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden cursor-pointer">
        {isNew && (
          <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
            New
          </Badge>
        )}
        
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-muted/30">
            <img
              src={image}
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-3 md:p-4 space-y-2 md:space-y-3">
            {/* Product Name - Editable */}
            <div className="font-medium text-sm md:text-base leading-tight hover:text-primary line-clamp-2">
              <InlineEditor
                value={displayName}
                onSave={handleNameSave}
                placeholder="Enter product name"
                className="block"
                maxLength={100}
                required
              />
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(rating)}
              </div>
              <span className="text-xs md:text-sm font-medium">{displayReviews}</span>
            </div>

            {/* Price */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <span className="text-base md:text-lg font-semibold">
                {typeof price === 'string' ? price : `from $${price.toFixed(2)}`} USD
              </span>
              {originalPrice && (
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  {typeof originalPrice === 'string' ? originalPrice : `$${originalPrice.toFixed(2)}`}
                </span>
              )}
            </div>

            {/* View Product Button */}
            <Button 
              className="w-full mt-3 md:mt-4 text-sm md:text-base" 
              variant="outline" 
              onClick={(e) => e.preventDefault()}
            >
              View Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EditableProductCard;