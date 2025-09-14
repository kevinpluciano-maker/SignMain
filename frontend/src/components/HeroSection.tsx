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
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
      </div>

      {/* Hero Content - Moved down to align with button */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-end justify-center pb-24">
        <div className="max-w-5xl text-center text-white">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]"
            style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              letterSpacing: '-0.01em',
              textShadow: '0 3px 15px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.1)',
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
            className="text-lg md:text-xl lg:text-xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.005em',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              lineHeight: '1.5'
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
                className="group relative overflow-hidden px-10 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  color: '#1e293b',
                  border: '2px solid rgba(255,255,255,0.25)',
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)';
                }}
                aria-label="Browse our complete product collection"
              >
                <ShoppingBag className="h-5 w-5 mr-2.5" aria-hidden="true" />
                View All Products
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Luxurious scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-70"
        aria-label="Scroll down to see more content"
        role="button"
        tabIndex={0}
        style={{
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))'
        }}
      >
        <div className="w-7 h-11 border-2 border-white/50 rounded-full flex justify-center relative">
          <div className="w-1 h-3.5 bg-gradient-to-b from-white to-white/50 rounded-full mt-2.5 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-white/8 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;