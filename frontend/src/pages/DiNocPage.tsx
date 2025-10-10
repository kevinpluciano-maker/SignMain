import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Palette, Shield, Wrench, Leaf, Phone, Mail, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DiNocPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Enhanced video playback for mobile and desktop - same as homepage
      const playVideo = async () => {
        try {
          // Set video attributes for optimal playback on all devices
          video.muted = true;
          video.loop = true; // Ensure loop is set
          video.playsInline = true;
          video.setAttribute('playsinline', '');
          video.setAttribute('webkit-playsinline', '');
          video.setAttribute('x5-playsinline', '');
          video.preload = "auto"; // Preload for smoother playback
          
          // Attempt to play
          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log('Di-Noc video started playing successfully');
            setVideoLoaded(true);
          }
        } catch (error) {
          console.error('Di-Noc video autoplay failed:', error);
          // Mobile-specific retry logic with multiple attempts
          let retryCount = 0;
          const maxRetries = 3;
          
          const retryPlay = async () => {
            if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(async () => {
                try {
                  await video.play();
                  console.log(`Di-Noc video started on retry ${retryCount}`);
                  setVideoLoaded(true);
                } catch (retryError) {
                  console.error(`Di-Noc video retry ${retryCount} failed:`, retryError);
                  if (retryCount < maxRetries) {
                    retryPlay();
                  } else {
                    setVideoError(true);
                  }
                }
              }, 500 * retryCount);
            }
          };
          
          retryPlay();
        }
      };

      // Handle visibility change to restart video on mobile when page becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden && video.paused) {
          console.log('Di-Noc page became visible, attempting to play video');
          playVideo();
        }
      };

      // Lazy load video when in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const handleCanPlay = () => {
              console.log('Di-Noc video can play');
              playVideo();
            };

            const handleLoadedData = () => {
              console.log('Di-Noc video data loaded');
              setVideoLoaded(true);
            };

            const handleError = (e: any) => {
              console.error('Di-Noc video loading error:', e);
              setVideoError(true);
            };

            const handleEnded = () => {
              // Ensure loop continues on mobile
              console.log('Di-Noc video ended, restarting');
              video.currentTime = 0;
              playVideo();
            };
            
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('error', handleError);
            video.addEventListener('ended', handleEnded);
            document.addEventListener('visibilitychange', handleVisibilityChange);
            
            // Start loading immediately
            playVideo();
            
            observer.unobserve(video);
            
            return () => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('loadeddata', handleLoadedData);
              video.removeEventListener('error', handleError);
              video.removeEventListener('ended', handleEnded);
              document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(video);
      
      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  const features = [
    {
      icon: Palette,
      title: "450+ Design Finishes",
      description: "Realistic wood, stone, leather, concrete, and fabric textures",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Fire Resistant",
      description: "Class A fire and smoke safety ratings for commercial use",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Wrench,
      title: "Easy Installation",
      description: "Self-adhesive film for flat and curved surfaces",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Low VOC emissions and antimicrobial properties",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <>
      <SEO
        title="Di-Noc Architectural Film | Premium Interior Surface Materials"
        description="Professional Di-Noc architectural films with 450+ design finishes. Realistic wood, stone, and metal textures. Fire resistant, eco-friendly, and easy to install for commercial and residential applications."
        canonical="/collections/di-noc"
        keywords={["di-noc", "architectural film", "interior design", "surface materials", "wood grain film", "stone texture film", "metal finish film"]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <ModernNavigation />

        {/* Hero Section with Background Video */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          {/* Background Video */}
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
              preload="auto"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                // Fix for iOS Safari video rendering
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <source src="https://customer-assets.emergentagent.com/job_code-journey-79/artifacts/xrwy80f0_202509191706%20%281%29%20%281%29.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Fallback gradient if video fails */}
            {videoError && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
            <div className="max-w-4xl text-center text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Di-Noc
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                  Architectural Film
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Transform your spaces with premium architectural films. Over 450 design finishes that realistically mimic wood, stone, metal, and fabric textures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                  onClick={() => {
                    const contactSection = document.querySelector('section[class*="primary"]');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Us Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
                  onClick={() => {
                    const featuresSection = document.querySelector('section');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Professional Grade Materials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Di-Noc?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Industry-leading architectural films trusted by designers and architects worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "450+", label: "Design Options" },
                { value: "10+", label: "Years Durability" },
                { value: "Class A", label: "Fire Rating" },
                { value: "Low VOC", label: "Eco-Friendly" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prominent Contact Us Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <MessageSquare className="h-20 w-20 mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Let's Discuss Your Project
              </h2>
              <p className="text-2xl md:text-3xl mb-8 text-white/90 font-light leading-relaxed">
                Contact us directly to inquire about our Di-Noc architectural films, get expert advice, or request product information.
              </p>
              <p className="text-xl mb-12 text-white/80 max-w-2xl mx-auto">
                Our team of specialists is ready to help you select the perfect finishes for your commercial or residential project.
              </p>

              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="p-8 text-center">
                    <Phone className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
                    <p className="text-white/80 mb-4">Speak with our experts</p>
                    <Button variant="secondary" size="lg" className="w-full">
                      (555) 123-4567
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
                    <p className="text-white/80 mb-4">Get a detailed response</p>
                    <Button variant="secondary" size="lg" className="w-full">
                      info@bsignstore.com
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2 text-white">Contact Form</h3>
                    <p className="text-white/80 mb-4">Send us a message</p>
                    <Button variant="secondary" size="lg" className="w-full">
                      Fill Out Form
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:scale-105 transition-transform"
                >
                  Request Product Information
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-xl px-12 py-8 h-auto font-bold border-white/30 text-white hover:bg-white/10 shadow-2xl hover:scale-105 transition-transform"
                >
                  Schedule Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg">Free Samples Available</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg">Fast Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default DiNocPage;