import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OptimizedImage } from "@/hooks/useImageOptimization";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  has360View?: boolean;
}

export const ProductImageGallery = ({ 
  images, 
  productName, 
  has360View = false 
}: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // Zoom feature removed as requested

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 360° view simulation (would need actual 360° images in production)
  const handle360Drag = (e: React.MouseEvent) => {
    if (!is360Active) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newRotation = (x / rect.width) * 360;
    setRotation(newRotation);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative group">
        <div
          ref={imageRef}
          className="aspect-square overflow-hidden rounded-2xl bg-muted/20 relative"
          onMouseDown={is360Active ? handle360Drag : undefined}
        >
          <OptimizedImage
            src={images[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            width={600}
            height={600}
            className={`w-full h-full object-cover ${is360Active ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={
                : is360Active
                ? {
                    transform: `rotate(${rotation}deg)`,
                  }
                : {}
            }
            priority={currentImageIndex === 0}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && !is360Active && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Fullscreen Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white"
                aria-label="View fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95">
              <div className="relative w-full h-full flex items-center justify-center">
                <OptimizedImage
                  src={images[currentImageIndex]}
                  alt={`${productName} - Fullscreen`}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* 360° View Indicator */}
          {is360Active && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              360° View - Drag to rotate
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {has360View && (
              <Button
                variant={is360Active ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setIs360Active(!is360Active);
                  setRotation(0);
                }}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                360° View
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {isZoomed ? "Move mouse to explore" : "Hover to zoom"}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentImageIndex === index
                  ? "border-primary shadow-lg"
                  : "border-transparent hover:border-muted-foreground/50"
              }`}
            >
              <OptimizedImage
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Features */}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="bg-muted/50 px-2 py-1 rounded">High Resolution</span>
        <span className="bg-muted/50 px-2 py-1 rounded">Zoom Available</span>
        {has360View && (
          <span className="bg-muted/50 px-2 py-1 rounded">360° View</span>
        )}
        <span className="bg-muted/50 px-2 py-1 rounded">Multiple Angles</span>
      </div>
    </div>
  );
};