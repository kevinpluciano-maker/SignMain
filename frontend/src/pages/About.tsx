import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Globe, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <SEO 
        title="About Us - Professional Signage Solutions | Signassist"
        description="Learn about Acrylic Braille Signs' mission to provide premium architectural signage, door numbers, and ADA-compliant signs for modern workspaces in Canada & USA."
        keywords="about signage company, professional signs, ADA compliance, architectural signage, door numbers"
      />
      
      {/* Luxury Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 50%, rgba(15,23,42,0.95) 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge 
              className="mb-6 px-6 py-2 text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Signage Solutions
            </Badge>
            
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
              style={{
                fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Who Are We?
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.01em',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              We're the leading innovators in architectural signage, crafting premium solutions that define modern professional spaces across Canada & USA.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge 
                className="mb-6 px-4 py-2"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none'
                }}
              >
                <Award className="w-4 h-4 mr-2" />
                Our Legacy
              </Badge>
              
              <h2 
                className="text-4xl md:text-5xl font-black mb-8 text-gray-900"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '-0.01em'
                }}
              >
                Defining Excellence in Signage
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  For over a decade, <strong>Signassist</strong> has been at the forefront of architectural signage innovation, transforming how businesses present themselves through premium door numbers, office signs, and ADA-compliant solutions.
                </p>
                <p>
                  Our journey began with a simple mission: to create signage that doesn't just inform, but elevates the entire aesthetic of professional environments. Today, we're trusted by Fortune 500 companies, luxury hotels, and modern office complexes across Canada & USA.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Card 
                className="p-8 border-0 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(29,78,216,0.05))',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div 
                        className="text-4xl font-black text-blue-600 mb-2"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                      >
                        10,000+
                      </div>
                      <p className="text-gray-600 font-medium">Projects Completed</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-4xl font-black text-blue-600 mb-2"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                      >
                        500+
                      </div>
                      <p className="text-gray-600 font-medium">Enterprise Clients</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-4xl font-black text-blue-600 mb-2"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                      >
                        50+
                      </div>
                      <p className="text-gray-600 font-medium">Countries Served</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-4xl font-black text-blue-600 mb-2"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                      >
                        99.9%
                      </div>
                      <p className="text-gray-600 font-medium">Client Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Values Section */}
      <section 
        className="py-24"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge 
              className="mb-6 px-4 py-2"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none'
              }}
            >
              <Star className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            
            <h2 
              className="text-4xl md:text-5xl font-black mb-6 text-gray-900"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                letterSpacing: '-0.01em'
              }}
            >
              What Drives Us Forward
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Premium Quality",
                description: "Every sign is crafted with precision using the finest materials and cutting-edge manufacturing techniques.",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Client Partnership",
                description: "We build lasting relationships through exceptional service, custom solutions, and unwavering support.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Innovation",
                description: "Leading industry standards with ADA compliance, sustainable practices, and future-forward design.",
                gradient: "from-green-500 to-teal-600"
              }
            ].map((value, index) => (
              <Card 
                key={index}
                className="p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <CardContent className="p-0 text-center">
                  <div 
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4 text-gray-900"
                    style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 50%, rgba(15,23,42,0.98) 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L60 40L70 50L60 60z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 
            className="text-4xl md:text-5xl font-black mb-8 text-white"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            Ready to Transform Your Space?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied clients who trust Signassist for their premium signage needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/products">
              <Button 
                size="lg" 
                className="px-12 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  color: '#1e293b',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                View Our Products
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="px-12 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 border-white text-white hover:bg-white hover:text-gray-900"
                style={{
                  borderRadius: '16px',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;