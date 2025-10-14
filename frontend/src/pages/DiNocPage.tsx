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
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        <ModernNavigation />

        {/* Hero Section with Video Background - Contained */}
        <section className="relative h-[80vh] min-h-[700px] overflow-hidden">
          {/* Video Background - Only in Hero Section */}
          <div className="absolute inset-0 z-0">
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
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Hero Content - No background, just text */}
          <div className="container mx-auto px-6 h-full flex items-center justify-center">
            <div className="max-w-4xl text-center">
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

        {/* Features Section - With Solid Background */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 text-lg px-6 py-2">
                Why Choose Di-Noc
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
                Premium Features
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Experience the perfect blend of aesthetics and functionality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 border-slate-200 bg-white hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
                  <CardContent className="p-10 text-center">
                    <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                      <feature.icon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border border-slate-200">
              {[
                { value: "450+", label: "Design Options" },
                { value: "10+", label: "Years Durability" },
                { value: "Class A", label: "Fire Rating" },
                { value: "Low VOC", label: "Eco-Friendly" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - With Solid Background */}
        <section className="py-24 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Centered Icon and Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 rounded-2xl border border-white/30">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                  Let's Discuss Your Project
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Connect with our Di-Noc specialists for expert guidance and tailored solutions
                </p>
              </div>

              {/* Contact Cards - Futuristic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
                {/* Phone Card */}
                <a href="tel:+15551234567" className="group block">
                  <Card className="bg-white/95 hover:bg-white border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 mb-1">Call Us</h3>
                          <p className="text-xs text-slate-600">Direct Line</p>
                        </div>
                        <div className="text-base font-mono text-primary bg-primary/10 px-4 py-2 rounded-lg">
                          (555) 123-4567
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                {/* Email Card */}
                <a href="mailto:info@absigns.com" className="group block">
                  <Card className="bg-white/95 hover:bg-white border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 mb-1">Email Us</h3>
                          <p className="text-xs text-slate-600">Quick Response</p>
                        </div>
                        <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-2 rounded-lg break-all">
                          info@absigns.com
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                {/* Contact Form Card */}
                <a href="/contact" className="group block">
                  <Card className="bg-white/95 hover:bg-white border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 mb-1">Message Us</h3>
                          <p className="text-xs text-slate-600">Detailed Inquiry</p>
                        </div>
                        <div className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg group-hover:bg-primary/20 transition-all">
                          Contact Form →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-3xl mx-auto">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 py-4 h-auto rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Request Product Information
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-base px-8 py-4 h-auto rounded-xl shadow-lg hover:scale-[1.02] transition-all"
                >
                  Schedule Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/30">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Free Samples Available</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Fast Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <ImprovedFooter />
      </div>
    </>
  );
};

export default DiNocPage;