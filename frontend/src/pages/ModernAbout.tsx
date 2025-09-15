import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Users, 
  Globe, 
  Zap, 
  Target, 
  Lightbulb, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Heart,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";

const ModernAbout = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "10,000+", color: "from-blue-500 to-cyan-500" },
    { icon: Globe, label: "Countries Served", value: "50+", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Years Experience", value: "15+", color: "from-purple-500 to-violet-500" },
    { icon: Star, label: "5-Star Reviews", value: "98%", color: "from-yellow-500 to-orange-500" }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision Engineering",
      description: "Every sign is crafted with meticulous attention to detail, ensuring perfect alignment, spacing, and finish.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We constantly push the boundaries of signage technology, incorporating the latest materials and design trends.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Lifetime warranty on all products. If you're not completely satisfied, we'll make it right.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Customer Obsessed",
      description: "Your success is our success. We go above and beyond to exceed expectations on every project.",
      color: "from-red-500 to-rose-500"
    }
  ];

  const timeline = [
    {
      year: "2009",
      title: "Founded",
      description: "Started as a small family business with a passion for quality signage."
    },
    {
      year: "2012",
      title: "ADA Certification",
      description: "Became certified ADA compliance specialists, pioneering accessible design."
    },
    {
      year: "2015",
      title: "International Expansion",
      description: "Expanded worldwide shipping, serving clients across 6 continents."
    },
    {
      year: "2018",
      title: "Technology Integration",
      description: "Launched advanced 3D modeling and virtual sign placement tools."
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "Achieved carbon-neutral production and eco-friendly materials."
    },
    {
      year: "2024",
      title: "AI-Powered Design",
      description: "Introduced AI-assisted design optimization for maximum impact."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "15+ years in commercial design, former Tesla design engineer.",
      image: "👩‍💼"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Production",
      bio: "Master craftsman with 20+ years in precision manufacturing.",
      image: "👨‍🔧"
    },
    {
      name: "Dr. Emily Watson",
      role: "ADA Compliance Director",
      bio: "PhD in Accessibility Design, published researcher in inclusive design.",
      image: "👩‍🎓"
    },
    {
      name: "James Park",
      role: "Customer Success Lead",
      bio: "Former hospitality executive, obsessed with client satisfaction.",
      image: "👨‍💼"
    }
  ];

  return (
    <>
      <SEO
        title="About Us | Leaders in Professional Signage Solutions | Bsign Store"
        description="Discover our 15-year journey of creating premium door signs and architectural signage. Award-winning design, ADA compliance, and lifetime quality guarantee."
        canonical="/about"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header />
        <ImprovedNavigation />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                <Sparkles className="h-4 w-4 mr-2" />
                Award-Winning Signage Experts
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Crafting the Future of
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Professional Signage
                </span>
              </h1>
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                For over 15 years, we've been transforming spaces with precision-engineered signage that combines cutting-edge design with unmatched durability. Every sign tells a story – let us help you tell yours.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border-white/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-blue-200 leading-relaxed">
                  To revolutionize how businesses communicate through space by creating signage solutions that are not just functional, but inspiring. We believe every sign should be a perfect marriage of form, function, and innovation – elevating the spaces they inhabit while serving their intended purpose flawlessly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">What Drives Us</h2>
              <p className="text-xl text-blue-200">The core values that guide every decision we make</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mb-6`}>
                      <value.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-blue-200 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
              <p className="text-xl text-blue-200">Milestones that shaped our company</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative flex items-start gap-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                        {item.year.slice(-2)}
                      </div>
                      <Card className="flex-1 bg-white/10 backdrop-blur-lg border-white/20">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-2xl font-bold text-white">{item.year}</span>
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                              {item.title}
                            </Badge>
                          </div>
                          <p className="text-blue-200">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Meet Our Experts</h2>
              <p className="text-xl text-blue-200">The passionate team behind every perfect sign</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-center hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-blue-200">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications & Awards */}
          <div className="mb-20">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-white text-center mb-8">Recognition & Certifications</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">ADA Certified</h3>
                    <p className="text-blue-200">Official ADA compliance certification for accessibility design</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">ISO 9001</h3>
                    <p className="text-blue-200">International quality management system certification</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Industry Leader</h3>
                    <p className="text-blue-200">Recognized as top 10 signage company in North America</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-lg border-white/20">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
                <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied clients who trust us with their most important signage projects. Let's bring your vision to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                      Start Your Project
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                      View Our Work
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2 text-blue-200">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>24-hour quotes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Lifetime warranty</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <ImprovedFooter />
      </div>
    </>
  );
};

export default ModernAbout;