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
  const [videoLoaded, setVideoLoaded] = useState(true); // Show video immediately
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Simple, direct video playback
      const playVideo = async () => {
        try {
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          await video.play();
          console.log('Di-Noc video playing');
        } catch (error) {
          console.error('Video autoplay failed:', error);
          setVideoError(true);
        }
      };

      // Play video as soon as component mounts
      playVideo();

      // Handle video errors
      const handleError = () => {
        console.error('Video failed to load');
        setVideoError(true);
      };

      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('error', handleError);
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
      
      {/* Fixed Full-Page Video Background */}
      <div className="fixed inset-0 z-0">
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
            pointerEvents: 'none'
          }}
        >
          <source src="https://customer-assets.emergentagent.com/job_code-journey-79/artifacts/ubju0k36_202509191706%20%281%29%20%281%29.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback gradient if video fails */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-xl mb-4">Video unavailable</p>
              <p className="text-sm text-slate-300">Displaying neutral background</p>
            </div>
          </div>
        )}
        
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content with Transparent Background */}
      <div className="relative z-10 min-h-screen">
        <Header />
        <ModernNavigation />

        {/* Hero Section - Transparent */}
        <section className="relative h-[80vh] min-h-[700px] overflow-hidden">
          {/* Removed video container - now using fixed background */}

          {/* Hero Content - Transparent with white text */}
          <div className="container mx-auto px-6 h-full flex items-center justify-center">
            <div className="max-w-4xl text-center bg-black/30 backdrop-blur-md rounded-3xl p-12 border border-white/20">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-3 leading-none tracking-tight" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] relative">
                  Di-Noc
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-white/90 mb-12 tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: '"Inter", sans-serif', letterSpacing: '0.15em' }}>
                Architectural Film
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 text-white font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:scale-105 transition-all duration-300 border-2 border-cyan-300/50"
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
                  className="border-2 border-cyan-400/70 text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-300 text-lg px-10 py-6 rounded-full backdrop-blur-md bg-slate-900/30 font-semibold shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
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

        {/* Features Section - Transparent with backdrop blur */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20 bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/20">
              <Badge className="mb-6 bg-white/10 text-white border border-white/30 text-lg px-6 py-2 backdrop-blur-sm">
                Why Choose Di-Noc
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Premium Features
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Experience the perfect blend of aesthetics and functionality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 border-white/30 bg-black/40 backdrop-blur-xl hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
                  <CardContent className="p-10 text-center">
                    <div className="bg-white/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all">
                      <feature.icon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/20">
              {[
                { value: "450+", label: "Design Options" },
                { value: "10+", label: "Years Durability" },
                { value: "Class A", label: "Fire Rating" },
                { value: "Low VOC", label: "Eco-Friendly" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Transparent */}
        <section className="py-24 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              {/* Centered Icon and Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  Let's Discuss Your Project
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Connect with our Di-Noc specialists for expert guidance and tailored solutions
                </p>
              </div>

              {/* Contact Cards - Futuristic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
                {/* Phone Card */}
                <a href="tel:+15551234567" className="group block">
                  <div className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                        <Phone className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-cyan-100 mb-1">Call Us</h3>
                        <p className="text-xs text-cyan-300/60">Direct Line</p>
                      </div>
                      <div className="text-base font-mono text-white bg-slate-900/50 px-4 py-2 rounded-lg border border-cyan-500/20">
                        (555) 123-4567
                      </div>
                    </div>
                  </div>
                </a>

                {/* Email Card */}
                <a href="mailto:info@bsignstore.com" className="group block">
                  <div className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                        <Mail className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-cyan-100 mb-1">Email Us</h3>
                        <p className="text-xs text-cyan-300/60">Quick Response</p>
                      </div>
                      <div className="text-xs font-mono text-white bg-slate-900/50 px-3 py-2 rounded-lg border border-cyan-500/20 break-all">
                        info@bsignstore.com
                      </div>
                    </div>
                  </div>
                </a>

                {/* Contact Form Card */}
                <a href="/contact" className="group block">
                  <div className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                        <MessageSquare className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-cyan-100 mb-1">Message Us</h3>
                        <p className="text-xs text-cyan-300/60">Detailed Inquiry</p>
                      </div>
                      <div className="text-sm font-semibold text-cyan-400 bg-slate-900/50 px-4 py-2 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/10 transition-all">
                        Contact Form →
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* CTA Buttons - Futuristic */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-3xl mx-auto">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-base px-8 py-4 h-auto rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all border border-cyan-400/50"
                >
                  Request Product Information
                </Button>
                <Button 
                  size="lg" 
                  className="bg-slate-800/80 backdrop-blur-sm text-cyan-100 hover:bg-slate-700/80 font-bold text-base px-8 py-4 h-auto rounded-xl border-2 border-cyan-500/40 hover:border-cyan-400/60 shadow-lg hover:scale-[1.02] transition-all"
                >
                  Schedule Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-cyan-500/20">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Free Samples Available</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Fast Response Time</span>
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