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

        {/* Streamlined Hero Section - Smaller, Cleaner */}
        <div className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-6 py-2 text-sm font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                ADA EXPERTS AVAILABLE
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Get Your Custom
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {" "}Braille Quote
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Professional ADA compliant signage consultation and rapid delivery.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl text-gray-700 text-sm">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="font-medium">24hr Response</span>
                </div>
                <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl text-gray-700 text-sm">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  <span className="font-medium">ADA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl text-gray-700 text-sm">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Streamlined Contact Form */}
            <Card className="bg-white shadow-lg border border-gray-200 rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Project</h2>
                  <p className="text-gray-600">
                    Tell us about your braille signage needs and get a custom quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 mb-2 block font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 h-10"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-900 mb-2 block font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 h-10"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-gray-900 mb-2 block font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 h-10"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-gray-900 mb-2 block font-semibold">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 h-10"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectDetails" className="text-gray-900 mb-2 block font-semibold">
                      Braille Signage Requirements *
                    </Label>
                    <Textarea
                      id="projectDetails"
                      required
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 min-h-[100px]"
                      placeholder="Describe your ADA compliant braille signage needs: room types, quantities, mounting requirements, text specifications, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency" className="text-gray-900 mb-2 block font-semibold">
                        Project Timeline
                      </Label>
                      <select
                        id="urgency"
                        value={formData.urgency}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="standard" className="text-gray-900">Standard (2-3 weeks)</option>
                        <option value="expedited" className="text-gray-900">Expedited (1 week)</option>
                        <option value="rush" className="text-gray-900">Rush (3-5 days)</option>
                        <option value="emergency" className="text-gray-900">Emergency (24-48 hours)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="budget" className="text-gray-900 mb-2 block font-semibold">
                        Budget Range
                      </Label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing Your Request...</>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Get Your ADA Compliant Quote
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Streamlined Contact Information */}
            <div className="space-y-6">
              {/* Contact Methods - Compact */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Our Team</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold">Call Our Specialists</h4>
                        <p className="text-cyan-600 font-semibold">+1 (323) 843-0781</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold">Email Our Team</h4>
                        <p className="text-cyan-600 font-semibold">info@acrylicbraillesigns.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold">Visit Our Showroom</h4>
                        <p className="text-cyan-600 font-semibold">Los Angeles, CA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours - Compact */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-500" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900 font-semibold">7:00 AM - 4:00 PM CST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900 font-semibold">9:00 AM - 2:00 PM CST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us - Compact */}
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-800">15+ years ADA expertise</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-800">100% ADA compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-800">Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-800">Fast shipping</span>
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