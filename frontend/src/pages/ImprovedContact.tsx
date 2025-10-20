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
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ImprovedContact = () => {
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

  const features = [
    { icon: CheckCircle, text: "Custom door signs & plates" },
    { icon: CheckCircle, text: "Office & hotel signage" },
    { icon: CheckCircle, text: "ADA compliant solutions" },
    { icon: CheckCircle, text: "Bulk & commercial orders" }
  ];

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
        
        <main>
          {/* Hero Section */}
          <section className="page-section bg-gradient-to-br from-primary/5 via-background to-primary-muted/20">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="outline" className="mb-6 badge-gradient text-white border-white/20">
                Contact Us
              </Badge>
              <h1 className="heading-primary mb-6">
                Let's <span className="text-primary">Talk</span>
              </h1>
              <p className="text-professional text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to create your professional signage? Get in touch with our team for quotes, 
                custom designs, or any questions about our products and services.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="page-section">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="feature-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <MessageSquare className="h-6 w-6 text-primary" />
                        <span>Get In Touch</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Phone</p>
                          <p className="text-muted-foreground">+1 (647) 278-2905</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri 7:00 AM - 4:00 PM EST</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Email</p>
                          <p className="text-muted-foreground">info@signassist.com</p>
                          <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Business Hours</p>
                          <p className="text-muted-foreground">Monday - Friday</p>
                          <p className="text-muted-foreground">7:00 AM - 4:00 PM EST</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="feature-card">
                    <CardHeader>
                      <CardTitle>Why Choose Us?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">
                        Professional signage solutions with guaranteed quality and fast turnaround times.
                      </p>
                      <div className="space-y-3">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <feature.icon className="h-5 w-5 text-success flex-shrink-0" />
                            <span className="text-sm">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <Card className="feature-card">
                    <CardHeader>
                      <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                      <p className="text-muted-foreground">
                        Fill out the form below and we'll get back to you within 24 hours.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Enter your full name"
                              className="h-12"
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
                              className="h-12"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                              className="h-12"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => handleInputChange("company", e.target.value)}
                              placeholder="Enter your company name"
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inquiryType">Type of Inquiry</Label>
                          <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                            <SelectTrigger className="h-12">
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
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Please provide details about your signage needs, including quantity, size preferences, installation requirements, timeline, and any specific design requests..."
                            className="min-h-[150px] resize-none"
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full button-modern h-12 text-lg">
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </Button>
                        
                        <p className="text-sm text-muted-foreground text-center">
                          By submitting this form, you agree to our privacy policy. We typically respond within 24 hours.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="page-section bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="section-title">
                  Frequently Asked Questions
                </h2>
                <p className="section-subtitle">
                  Quick answers to common questions about our signage products and services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How long does production take?</h3>
                    <p className="text-muted-foreground">
                      Standard signs typically ship within 3-5 business days. Custom designs may take 7-10 business days.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Do you offer bulk discounts?</h3>
                    <p className="text-muted-foreground">
                      Yes! We offer competitive pricing for bulk orders. Contact us for a custom quote on quantities over 10 units.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Can you match existing signage?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Send us photos and specifications, and we'll match your existing signage design and materials.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Do you ship internationally?</h3>
                    <p className="text-muted-foreground">
                      Yes, we serve customers throughout Canada and the United States. Shipping costs and delivery times vary by location within our service area.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Are your signs ADA compliant?</h3>
                    <p className="text-muted-foreground">
                      We offer a full range of ADA compliant signage with proper contrast ratios, Braille, and tactile elements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Can you install the signs?</h3>
                    <p className="text-muted-foreground">
                      Installation services are available in select areas. Contact us to discuss installation options for your location.
                    </p>
                  </div>
                </div>
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

export default ImprovedContact;