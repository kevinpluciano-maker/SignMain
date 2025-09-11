import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Clock, Palette, Quote, Star, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImprovedAbout = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "13+", label: "Years Experience", color: "text-pink-500" },
    { number: "10k+", label: "Happy Customers", color: "text-blue-500" },
    { number: "50k+", label: "Projects Completed", color: "text-orange-500" },
    { number: "99%", label: "Satisfaction Rate", color: "text-green-500" }
  ];

  const features = [
    {
      icon: Star,
      title: "Premium Quality",
      description: "Top quality prints using the latest technology and materials for lasting durability."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We understand that without you as a client, there's no business. Your satisfaction is our priority."
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality. Most orders ship within 3-5 business days."
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Mix and match colors, sizes, and designs. Create anything for your office, hotel, or commercial space."
    }
  ];

  return (
    <>
      <SEO
        title="About Signassist - Professional Signage Solutions | Quality & Service"
        description="Learn about Signassist's commitment to quality signage solutions. 13+ years of experience delivering professional door signs, office signage, and custom architectural signs worldwide."
        canonical="/about"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <main>
          {/* Hero Section */}
          <section className="page-section bg-gradient-to-br from-primary/5 via-background to-primary-muted/20">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="outline" className="mb-6 badge-gradient text-white border-white/20">
                About Signassist
              </Badge>
              <h1 className="heading-primary mb-6">
                Quality is what <span className="text-primary">matters most</span>
              </h1>
              <p className="text-professional text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
                We take pride in creating only high-quality signage solutions. With our state-of-the-art equipment and expertise, 
                we deliver professional results without compromising on quality or speed!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="text-lg">Premium quality materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="text-lg">Global shipping available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="text-lg">Custom design services</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="button-modern text-lg px-8 py-4"
                onClick={() => navigate('/products')}
              >
                Explore Our Products
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="page-section bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="stats-card feature-card">
                    <div className={`stats-number ${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="stats-label">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="page-section">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h2 className="section-title text-left mb-6">
                      Our Story
                    </h2>
                    <p className="text-professional text-muted-foreground mb-6 leading-relaxed">
                      Founded in 2010, Signassist began with a simple mission: to provide high-quality printing solutions at 
                      competitive prices with exceptional customer service.
                    </p>
                    <p className="text-professional text-muted-foreground mb-6 leading-relaxed">
                      What started as a small operation has grown into a trusted partner for businesses of all sizes across the country. 
                      Our commitment to quality and customer satisfaction remains at the heart of everything we do.
                    </p>
                    <p className="text-professional text-muted-foreground leading-relaxed">
                      We've invested in state-of-the-art printing technology and a team of experienced professionals to ensure that every 
                      product that leaves our facility meets our high standards.
                    </p>
                  </div>

                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    size="lg"
                  >
                    Get In Touch
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="overflow-hidden">
                    <img 
                      src="/src/assets/office-sign.jpg" 
                      alt="Professional Office Signage"
                      className="w-full h-64 object-cover"
                    />
                  </Card>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="overflow-hidden">
                      <img 
                        src="/src/assets/door-sign-159.jpg" 
                        alt="Custom Door Signs"
                        className="w-full h-32 object-cover"
                      />
                    </Card>
                    <Card className="overflow-hidden">
                      <img 
                        src="/src/assets/conference-room-sign.jpg" 
                        alt="Conference Room Signs"
                        className="w-full h-32 object-cover"
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="page-section bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="section-title">
                  Why Choose Signassist?
                </h2>
                <p className="section-subtitle">
                  We're committed to delivering exceptional signage solutions that exceed expectations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="feature-card text-center">
                    <CardContent className="p-6">
                      <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="page-section">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="section-title">
                  How It Works
                </h2>
                <p className="section-subtitle">
                  Simple process to get your professional signage
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Browse & Select</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our collection and choose the perfect signage for your needs
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Customize</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalize your design with our easy-to-use customization tools
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Production</h3>
                  <p className="text-sm text-muted-foreground">
                    We manufacture your signs using premium materials and latest technology
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast, secure shipping to your location anywhere in the world
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="page-section bg-gradient-to-r from-primary/10 to-primary-muted/20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="section-title mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Professional signage created and shipped on demand. Contact us today for a quote or browse our catalog.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="button-modern"
                >
                  Get A Quote
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  onClick={() => navigate('/products')}
                >
                  View Products
                </Button>
              </div>
            </div>
          </section>
        </main>

        <ImprovedFooter />
        <CurrencySwitcher />
      </div>
    </>
  );
};

export default ImprovedAbout;