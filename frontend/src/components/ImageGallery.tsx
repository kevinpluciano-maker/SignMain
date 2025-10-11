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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const nextImage = () => {
    onIndexChange((selectedIndex + 1) % images.length);
  };

  const prevImage = () => {
    onIndexChange((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image - Click disabled per user request */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30 group">
          <OptimizedImage
            src={images[selectedIndex]}
            alt={`${productName} - Main view`}
            className="w-full h-full object-cover"
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
                className={`aspect-square overflow-hidden rounded-lg bg-muted/30 cursor-pointer hover:opacity-75 transition-all ${
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

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white border-white/20 hover:bg-white/10"
              onClick={closeFullscreen}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-white/20 hover:bg-white/10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-white/20 hover:bg-white/10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <div onClick={closeFullscreen} className="cursor-pointer">
              <OptimizedImage
                src={images[selectedIndex]}
                alt={`${productName} - Fullscreen view`}
                className="max-w-full max-h-full object-contain"
                width={1200}
                height={1200}
                priority={true}
                loading="eager"
              />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;