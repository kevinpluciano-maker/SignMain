import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const ImageGallery = ({ images, productName, selectedIndex, onIndexChange }: ImageGalleryProps) => {
  // Fullscreen functionality removed per user request

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image - Centered on mobile */}
        <div className="relative aspect-square overflow-hidden rounded-lg group bg-white dark:bg-slate-900 flex items-center justify-center">
          <OptimizedImage
            src={images[selectedIndex]}
            alt={`${productName} - Main view`}
            className="w-full h-full object-contain md:object-cover"
            width={600}
            height={600}
            priority={true}
            loading="eager"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-75 transition-all ${
                  selectedIndex === index ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => onIndexChange(index)}
              >
                <OptimizedImage
                  src={image}
                  alt={`${productName} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal removed - click on images disabled per user request */}
    </>
  );
};

export default ImageGallery;