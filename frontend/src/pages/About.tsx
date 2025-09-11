import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Clock, Palette, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="About Signassist - Professional Signage Solutions | Quality & Service"
        description="Learn about Signassist's commitment to quality signage solutions. 8+ years of experience delivering professional door signs, office signage, and custom architectural signs worldwide."
        canonical="/about"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              About Us
            </Badge>
            <h1 className="heading-primary mb-6">
              Who Are We
            </h1>
            <h2 className="heading-secondary text-primary mb-8">
              Quality is what matters most
            </h2>
            <p className="text-professional text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
              We take pride in creating only high-quality signage solutions. With our state-of-the-art equipment and expertise, 
              we deliver professional results without compromising on quality or speed!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Top quality prints using the latest technology</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Mix and match colors, sizes, and designs</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="button-modern"
              onClick={() => navigate('/products')}
            >
              ORDER NOW
            </Button>
          </div>

          {/* Feature Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="product-card-gradient overflow-hidden">
              <img 
                src="/src/assets/office-sign.jpg" 
                alt="Professional Office Signage"
                className="w-full h-64 object-cover"
              />
            </Card>
            <Card className="product-card-gradient overflow-hidden">
              <img 
                src="/src/assets/door-sign-159.jpg" 
                alt="Custom Door Signs"
                className="w-full h-64 object-cover"
              />
            </Card>
            <Card className="product-card-gradient overflow-hidden">
              <img 
                src="/src/assets/conference-room-sign.jpg" 
                alt="Conference Room Signs"
                className="w-full h-64 object-cover"
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Let us create your next project!
                </h2>
                <p className="text-muted-foreground mb-6">
                  We have been creating professional signage solutions for the past 8+ years, serving customers worldwide. 
                  Our expertise ranges from door number signs to office directional signage to large architectural installations. 
                  High-quality customer service is our focus while bringing your signage ideas to life.
                </p>
                <p className="text-muted-foreground">
                  We have a dedicated and creative design team that are here to help. We understand that without you as a client, 
                  there's no Signassist as a business, and we will do our best to better serve our clients with fast turnaround, 
                  quality materials, and professional sign solutions.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Bring your ideas to life instantly!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create anything for your office, hotel, or commercial space
                </p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="button-modern"
                >
                  Get Started Today
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quality Over Quantity</h3>
                <p className="text-muted-foreground">
                  You design, we create it. We are specialists in creating and installing signs and door plates 
                  worldwide. If you need a custom sign, then we are the company to work with. Share your next project details!
                </p>
              </Card>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">Sign Up for Free</h4>
                  <p className="text-sm text-muted-foreground">
                    Create an account without paying anything and become our valued customer.
                  </p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">Signage & Door Plates</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore our different types of signs and door plates, order online in minutes.
                  </p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Palette className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">Design It</h4>
                  <p className="text-sm text-muted-foreground">
                    You can design your own sign using our easy-to-use customizer tools.
                  </p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Quote className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">Request a Quote</h4>
                  <p className="text-sm text-muted-foreground">
                    Not sure about size or price? Request a quote for estimated pricing.
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-primary-muted">
            <h2 className="text-2xl font-bold mb-4">Let's Talk</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Professional signage created and shipped on demand!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
              <Button 
                onClick={() => navigate('/products')}
                className="button-modern"
              >
                View Our Products
              </Button>
            </div>
          </Card>
        </main>

        <ImprovedFooter />
        <CurrencySwitcher />
      </div>
    </>
  );
};

export default About;