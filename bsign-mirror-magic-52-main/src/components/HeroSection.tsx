import { Button } from "@/components/ui/button";
import { Play, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";
import { OptimizedImage } from "@/hooks/useImageOptimization";
import heroOffice from "@/assets/hero-office.jpg";

const HeroSection = () => {
  const { isEditing, isPreviewing } = useEditor();

  const handleTitleSave = (newTitle: string) => {
    console.log('Hero title updated:', newTitle);
  };

  const handleDescriptionSave = (newDescription: string) => {
    console.log('Hero description updated:', newDescription);
  };

  return (
    <section className="relative h-screen overflow-hidden" id="main-content">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={heroOffice}
          alt="Modern office space with professional signage solutions"
          width={1920}
          height={1080}
          priority={true}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <InlineEditor
              value="Professional Signage Solutions"
              onSave={handleTitleSave}
              placeholder="Enter hero title"
              className="text-white inline-block"
              editClassName="text-black"
              maxLength={100}
              required
            />
          </h1>
          <p className="text-xl mb-8 text-white/90">
            <InlineEditor
              value="Discover our comprehensive collection of door numbers, office signs, and architectural signage designed for modern workspaces."
              onSave={handleDescriptionSave}
              placeholder="Enter hero description"
              className="text-white/90 inline-block"
              editClassName="text-black"
              multiline
              maxLength={200}
              required
            />
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 w-full sm:w-auto"
                aria-label="Browse our complete product collection"
              >
                <ShoppingBag className="h-5 w-5 mr-2" aria-hidden="true" />
                View All Products
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 w-full sm:w-auto"
              aria-label="Watch introduction video about our signage solutions"
            >
              <Play className="h-4 w-4 mr-2" aria-hidden="true" />
              Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down to see more content"
        role="button"
        tabIndex={0}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;