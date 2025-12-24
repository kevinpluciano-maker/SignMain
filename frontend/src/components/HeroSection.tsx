import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const { isEditing, isPreviewing } = useEditor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(true); // Show video immediately
  const [videoError, setVideoError] = useState(false);

  const handleTitleSave = (newTitle: string) => {
    console.log('Hero title updated:', newTitle);
  };

  const handleDescriptionSave = (newDescription: string) => {
    console.log('Hero description updated:', newDescription);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && !videoError) {
      // Try to play video, but don't break if it fails
      const playVideo = async () => {
        try {
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          
          // Wait a bit for video to be ready
          await new Promise(resolve => setTimeout(resolve, 100));
          
          if (video.readyState >= 2) {
            await video.play();
            console.log('Hero video playing');
          }
        } catch (error) {
          console.log('Video autoplay blocked or failed, using fallback image');
          setVideoError(true);
        }
      };

      playVideo();
      
      // Set a timeout - if video doesn't load in 3 seconds, give up
      const timeout = setTimeout(() => {
        if (!videoLoaded) {
          console.log('Video loading timeout, using fallback image');
          setVideoError(true);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [videoError, videoLoaded]);

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden" id="main-content">
      {/* Background Image - Primary fallback that always shows */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/hero-office.jpg)',
          filter: videoLoaded ? 'blur(0px)' : 'blur(0px)',
          transition: 'filter 0.3s ease-in-out'
        }}
      />
      
      {/* Video Overlay - Progressive enhancement */}
      {!videoError && (
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
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
            onError={() => {
              console.log('Video failed to load, using fallback image');
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log('Video loaded successfully');
              setVideoLoaded(true);
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}
        
        {/* Luxurious gradient overlay - Darker on mobile for better logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50 md:from-black/25 md:via-black/15 md:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/12 to-transparent md:via-black/8" />
      </div>

      {/* Hero Content - Positioned lower for better video visibility */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center pt-32 md:pt-40">
        <div className="max-w-5xl text-center text-white">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] text-white"
            style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              letterSpacing: '-0.01em',
              textShadow: '0 3px 15px rgba(0,0,0,0.8), 0 0 30px rgba(79,195,247,0.3)'
            }}
          >
            <InlineEditor
              value="Professional Acrylic Braille Signs"
              onSave={handleTitleSave}
              placeholder="Enter hero title"
              className="inline-block"
              editClassName="text-black"
              maxLength={100}
              required
            />
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-xl mb-8 text-white max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.005em',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              lineHeight: '1.5'
            }}
          >
            <InlineEditor
              value="Professional quality door signs, restroom signs, and custom architectural signage for modern workspaces."
              onSave={handleDescriptionSave}
              placeholder="Enter hero description"
              className="inline-block"
              editClassName="text-black"
              multiline
              maxLength={250}
              required
            />
          </p>
          <div className="flex justify-center">
            <Link to="/products">
              <Button 
                size="lg" 
                className="group relative overflow-hidden px-10 py-3.5 text-base font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #4FC3F7 0%, #2196F3 100%)',
                  color: '#ffffff',
                  border: '2px solid rgba(79,195,247,0.25)',
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(79,195,247,0.25), inset 0 1px 0 rgba(255,255,255,0.35)',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #2196F3 0%, #4FC3F7 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,195,247,0.35), inset 0 1px 0 rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4FC3F7 0%, #2196F3 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,195,247,0.25), inset 0 1px 0 rgba(255,255,255,0.35)';
                }}
                aria-label="Browse our complete ADA compliant braille signage collection"
              >
                <ShoppingBag className="h-5 w-5 mr-2.5" aria-hidden="true" />
                View All Products
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Luxurious scroll indicator - Hidden on mobile to avoid line */}
      <div 
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-70"
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