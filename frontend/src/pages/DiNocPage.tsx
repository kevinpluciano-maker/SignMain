import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
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
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playVideo = async () => {
              try {
                video.muted = true;
                video.playsInline = true;
                video.preload = "metadata";
                await video.play();
                setVideoLoaded(true);
              } catch (error) {
                console.error('Video autoplay failed:', error);
                setVideoError(true);
              }
            };
            playVideo();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(video);
      return () => observer.disconnect();
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
        <ImprovedNavigation />

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
              preload="metadata"
            >
              <source src="https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4" type="video/mp4" />
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
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Di-Noc
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl font-light">
                  Architectural Film
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Transform your spaces with premium architectural films. Over 450 design finishes that realistically mimic wood, stone, metal, and fabric textures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                  Explore Products
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Request Samples
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

        <Separator className="my-0" />

        {/* Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Di-Noc Collection</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Premium architectural films for every design vision
              </p>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Products are being updated. Please check back soon.</p>
                <Button variant="outline">Contact Us for Custom Solutions</Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <Card className="max-w-4xl mx-auto border-0 shadow-xl">
              <CardContent className="p-12">
                <Star className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get professional guidance on selecting the perfect Di-Noc architectural films for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Schedule Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                    Download Catalog
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Free samples</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Expert installation</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>10+ year warranty</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default DiNocPage;