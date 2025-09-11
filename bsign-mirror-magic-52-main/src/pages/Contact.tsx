import { useState } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    toast.success("Thank you! Your message has been sent. We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEO
        title="Contact Signassist - Get a Quote for Professional Signage Solutions"
        description="Contact Signassist for custom signage quotes, support, and inquiries. Professional door signs, office signage, and architectural solutions. Fast response guaranteed."
        canonical="/contact"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="heading-primary mb-6">
              Let's Talk
            </h1>
            <p className="text-professional text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to create your professional signage? Get in touch with our team for quotes, 
              custom designs, or any questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Get In Touch</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (323) 843-0781</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 7:00 AM - 4:00 PM CST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@signassist.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">Monday - Friday</p>
                      <p className="text-muted-foreground">7:00 AM - 4:00 PM CST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>Quick Quote Request</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-4">
                    Need a quick estimate? Use our contact form with your project details, 
                    and we'll provide a competitive quote within 24 hours.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Custom door signs & plates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Office & hotel signage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">ADA compliant solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Bulk & commercial orders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Type of Inquiry</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="custom">Custom Design Project</SelectItem>
                      <SelectItem value="bulk">Bulk Order Inquiry</SelectItem>
                      <SelectItem value="support">Product Support</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide details about your signage needs, including quantity, size preferences, installation requirements, timeline, and any specific design requests..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full button-modern">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy. We typically respond within 24 hours.
                </p>
              </form>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Frequently Asked Questions</CardTitle>
              <p className="text-muted-foreground">
                Quick answers to common questions about our signage products and services.
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">How long does production take?</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard signs typically ship within 3-5 business days. Custom designs may take 7-10 business days.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Do you offer bulk discounts?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! We offer competitive pricing for bulk orders. Contact us for a custom quote on quantities over 10 units.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can you match existing signage?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. Send us photos and specifications, and we'll match your existing signage design and materials.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we ship worldwide. International shipping costs and delivery times vary by location.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Are your signs ADA compliant?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer a full range of ADA compliant signage with proper contrast ratios, Braille, and tactile elements.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can you install the signs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Installation services are available in select areas. Contact us to discuss installation options for your location.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <ImprovedFooter />
        <CurrencySwitcher />
      </div>
    </>
  );
};

export default Contact;