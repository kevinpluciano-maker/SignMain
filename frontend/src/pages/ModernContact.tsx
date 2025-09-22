import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Zap,
  Globe,
  Shield,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";

const ModernContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
    urgency: 'standard',
    budget: '',
    source: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <>
        <SEO
          title="Thank You | Contact Submitted | Bsign Store"
          description="Thank you for contacting us. We'll get back to you within 24 hours."
          canonical="/contact"
          type="website"
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <Header />
          <ImprovedNavigation />
          
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Message Sent Successfully!
                </h1>
                <p className="text-xl text-blue-200">
                  Thank you for reaching out. Our team will review your project details and respond within 24 hours.
                </p>
              </div>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6 text-white">
                    <div>
                      <div className="text-sm text-blue-200">Reference ID</div>
                      <div className="font-mono text-lg">BSG-{Date.now().toString().slice(-6)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200">Expected Response</div>
                      <div className="text-lg">Within 24 hours</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200">Project Type</div>
                      <div className="text-lg capitalize">{formData.urgency} Priority</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200">Next Steps</div>
                      <div className="text-lg">Quote & Timeline</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Our Portfolio
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
          
          <ImprovedFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Contact Us | Professional ADA Compliant Braille Signs | Acrylic Braille Signs"
        description="Get in touch with our ADA compliance experts for custom acrylic braille signage quotes, project consultation, and professional support. Available 24/7 for urgent projects."
        canonical="/contact"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50">
        <Header />
        <ImprovedNavigation />{" "}

        {/* Enhanced Hero Section with Better Visibility */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-6 py-3 text-sm font-bold tracking-wider">
                <Zap className="h-5 w-5 mr-3" />
                ADA COMPLIANCE EXPERTS AVAILABLE
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Get Your Custom
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {" "}Braille Signage Quote
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
                Professional ADA compliant acrylic braille signage consultation, custom design, and rapid delivery. 
                From concept to installation, we're your trusted partner.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center gap-3 bg-white shadow-lg px-6 py-3 rounded-2xl text-gray-800 border border-cyan-200">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">24hr Response</span>
                </div>
                <div className="flex items-center gap-3 bg-white shadow-lg px-6 py-3 rounded-2xl text-gray-800 border border-cyan-200">
                  <Shield className="h-5 w-5 text-cyan-500" />
                  <span className="font-semibold">ADA Compliant</span>
                </div>
                <div className="flex items-center gap-3 bg-white shadow-lg px-6 py-3 rounded-2xl text-gray-800 border border-cyan-200">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Nationwide Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Start Your Project</h2>
                  <p className="text-blue-200">
                    Tell us about your signage needs and we'll provide a custom quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-white mb-2 block">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectDetails" className="text-white mb-2 block">
                      Project Details *
                    </Label>
                    <Textarea
                      id="projectDetails"
                      required
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 resize-none"
                      placeholder="Describe your signage needs, dimensions, materials, quantity, timeline, and any special requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency" className="text-white mb-2 block">
                        Project Urgency
                      </Label>
                      <select
                        id="urgency"
                        value={formData.urgency}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2 focus:border-blue-400 focus:outline-none"
                      >
                        <option value="standard" className="text-gray-900">Standard (2-3 weeks)</option>
                        <option value="expedited" className="text-gray-900">Expedited (1 week)</option>
                        <option value="rush" className="text-gray-900">Rush (3-5 days)</option>
                        <option value="emergency" className="text-gray-900">Emergency (24-48 hours)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="budget" className="text-white mb-2 block">
                        Budget Range
                      </Label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2 focus:border-blue-400 focus:outline-none"
                      >
                        <option value="" className="text-gray-900">Select budget</option>
                        <option value="under-500" className="text-gray-900">Under $500</option>
                        <option value="500-1000" className="text-gray-900">$500 - $1,000</option>
                        <option value="1000-5000" className="text-gray-900">$1,000 - $5,000</option>
                        <option value="5000-10000" className="text-gray-900">$5,000 - $10,000</option>
                        <option value="over-10000" className="text-gray-900">Over $10,000</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Get Professional Quote
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Call Us</h4>
                        <p className="text-blue-200 mb-2">+1 (323) 843-0781</p>
                        <p className="text-sm text-blue-300">Available 24/7 for urgent projects</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Email Us</h4>
                        <p className="text-blue-200 mb-2">info@signassist.com</p>
                        <p className="text-sm text-blue-300">Response within 4 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Live Chat</h4>
                        <p className="text-blue-200 mb-2">Available on website</p>
                        <p className="text-sm text-blue-300">Instant support during business hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Visit Us</h4>
                        <p className="text-blue-200 mb-2">123 Business Ave, Suite 100</p>
                        <p className="text-blue-200 mb-2">Los Angeles, CA 90210</p>
                        <p className="text-sm text-blue-300">By appointment only</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-400" />
                    Business Hours
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Monday - Friday</span>
                      <span className="text-white font-semibold">7:00 AM - 4:00 PM CST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Saturday</span>
                      <span className="text-white font-semibold">9:00 AM - 2:00 PM CST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Sunday</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 mt-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-blue-300">Emergency support available 24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">15+ years of signage expertise</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">ADA compliant designs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Free design consultation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Lifetime quality guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Worldwide shipping available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <ImprovedFooter />
      </div>
    </>
  );
};

export default ModernContact;