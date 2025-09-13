import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const { isEditing, isPreviewing } = useEditor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleTitleSave = (newTitle: string) => {
    console.log('Hero title updated:', newTitle);
  };

  const handleDescriptionSave = (newDescription: string) => {
    console.log('Hero description updated:', newDescription);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          video.muted = true;
          await video.play();
          console.log('Video started playing successfully');
          setVideoLoaded(true);
        } catch (error) {
          console.error('Video autoplay failed:', error);
          setVideoError(true);
        }
      };

      const handleCanPlay = () => {
        console.log('Video can play');
        playVideo();
      };

      const handleLoadedData = () => {
        console.log('Video data loaded');
        setVideoLoaded(true);
      };

      const handleError = (e: any) => {
        console.error('Video loading error:', e);
        setVideoError(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      if (video.readyState >= 3) {
        playVideo();
      }

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden" id="main-content">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback background if video fails */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        )}
        
        {/* Luxurious gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* Hero Content with premium spacing */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
        <div className="max-w-5xl text-center text-white">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]"
            style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.1)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            <InlineEditor
              value="Professional Signage Solutions"
              onSave={handleTitleSave}
              placeholder="Enter hero title"
              className="inline-block"
              editClassName="text-black"
              maxLength={100}
              required
            />
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.01em',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              lineHeight: '1.6'
            }}
          >
            <InlineEditor
              value="Discover our comprehensive collection of door numbers, office signs, and architectural signage designed for modern workspaces."
              onSave={handleDescriptionSave}
              placeholder="Enter hero description"
              className="inline-block"
              editClassName="text-black"
              multiline
              maxLength={200}
              required
            />
          </p>
          <div className="flex justify-center">
            <Link to="/products">
              <Button 
                size="lg" 
                className="group relative overflow-hidden px-12 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  color: '#1e293b',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)';
                }}
                aria-label="Browse our complete product collection"
              >
                <ShoppingBag className="h-6 w-6 mr-3" aria-hidden="true" />
                View All Products
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Luxurious scroll indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-80"
        aria-label="Scroll down to see more content"
        role="button"
        tabIndex={0}
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
        }}
      >
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center relative">
          <div className="w-1.5 h-4 bg-gradient-to-b from-white to-white/60 rounded-full mt-3 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;