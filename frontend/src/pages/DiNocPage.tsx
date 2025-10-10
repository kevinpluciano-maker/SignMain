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
      
      <div className="min-h-screen bg-background">
        <Header />
        <ModernNavigation />

        {/* Hero Section with Background Video - Futuristic Design */}
        <section className="relative h-[80vh] min-h-[700px] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'grid-flow 20s linear infinite'
            }}></div>
          </div>

          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              className="w-full h-full object-cover opacity-70"
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-cyan-900 flex items-center justify-center z-10">
                <div className="text-white text-center">
                  <p className="text-xl mb-4">Video unavailable</p>
                  <p className="text-sm text-cyan-300/70">Displaying futuristic background</p>
                </div>
              </div>
            )}
            
            {/* Futuristic Gradient Overlay with Blue Tones */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-cyan-900/50 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-blue-950/60 z-10" />
            
            {/* Glowing Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-6 h-full flex items-center justify-center">
            <div className="max-w-4xl text-center text-white">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-pulse">
                  Di-Noc
                </span>
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Architectural Film
                </span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light backdrop-blur-sm bg-slate-900/30 p-6 rounded-2xl border border-cyan-500/20">
                Transform spaces with premium <span className="text-cyan-400 font-semibold">3M™ DI-NOC™</span> architectural finishes. Endless design possibilities for modern interiors.
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

              {/* Contact Options - Redesigned */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Phone Card */}
                <a href="tel:+15551234567" className="group">
                  <Card className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <CardContent className="p-10 text-center">
                      <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all">
                        <Phone className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Call Us</h3>
                      <p className="text-white/90 mb-6 text-lg">Speak with our experts</p>
                      <div className="bg-white text-primary font-bold text-xl py-4 px-6 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                        (555) 123-4567
                      </div>
                    </CardContent>
                  </Card>
                </a>

                {/* Email Card */}
                <a href="mailto:info@bsignstore.com" className="group">
                  <Card className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <CardContent className="p-10 text-center">
                      <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all">
                        <Mail className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Email Us</h3>
                      <p className="text-white/90 mb-6 text-lg">Get a detailed response</p>
                      <div className="bg-white text-primary font-bold text-lg py-4 px-6 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-lg break-all">
                        info@bsignstore.com
                      </div>
                    </CardContent>
                  </Card>
                </a>

                {/* Contact Form Card */}
                <a href="/contact" className="group">
                  <Card className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <CardContent className="p-10 text-center">
                      <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all">
                        <MessageSquare className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Contact Form</h3>
                      <p className="text-white/90 mb-6 text-lg">Send us a message</p>
                      <div className="bg-white text-primary font-bold text-xl py-4 px-6 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                        Fill Out Form
                      </div>
                    </CardContent>
                  </Card>
                </a>
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