import { useState } from "react";
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQProps {
  variant?: "full" | "compact";
  category?: string;
}

export const FAQ = ({ variant = "full", category }: FAQProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days. Express shipping (2-3 days) and overnight shipping are also available at checkout. Custom signs may require additional 1-2 days for production."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship internationally to most countries. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's regulations."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time using our order tracking system."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "We package all orders carefully, but if your sign arrives damaged, please contact us within 48 hours with photos. We'll send a replacement immediately at no additional cost."
        }
      ]
    },
    {
      category: "Products & Customization",
      questions: [
        {
          question: "Can I customize the text on my sign?",
          answer: "Yes! Most of our signs can be customized with your preferred text, font, and colors. Use our online customization tool or contact us for special requests."
        },
        {
          question: "What materials are your signs made from?",
          answer: "We use premium materials including brushed aluminum, acrylic, wood, and weather-resistant plastics. Each product page lists the specific materials used."
        },
        {
          question: "Are your signs suitable for outdoor use?",
          answer: "Many of our signs are weather-resistant and suitable for outdoor use. Check the product description for 'Outdoor Use' or 'Weather Resistant' labels."
        },
        {
          question: "Do you offer bulk discounts?",
          answer: "Yes! We offer volume discounts for orders of 10 or more signs. Contact our sales team for a custom quote on bulk orders."
        }
      ]
    },
    {
      category: "Installation & Maintenance",
      questions: [
        {
          question: "How do I install my door sign?",
          answer: "Each sign comes with installation instructions and necessary hardware. Most signs can be installed with basic tools in under 10 minutes. We also have video tutorials available."
        },
        {
          question: "What tools do I need for installation?",
          answer: "Most installations require only a drill, level, and measuring tape. Specific tool requirements are listed in the product description and installation guide."
        },
        {
          question: "How do I clean and maintain my sign?",
          answer: "Clean your sign with a soft cloth and mild soap solution. Avoid abrasive cleaners. For detailed care instructions, see our maintenance guide."
        }
      ]
    },
    {
      category: "Returns & Warranty",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for non-customized items in original condition. Custom signs can only be returned if there's a manufacturing defect."
        },
        {
          question: "Do you offer a warranty?",
          answer: "Yes! All our signs come with a 2-year warranty against manufacturing defects and material failures under normal use conditions."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service team to initiate a return. We'll provide a return authorization number and prepaid shipping label for eligible returns."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for large orders."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes! We use SSL encryption and secure payment processors. We never store your credit card information on our servers."
        },
        {
          question: "Do you offer payment plans?",
          answer: "For large orders over $500, we offer payment plans. Contact our sales team to discuss financing options."
        }
      ]
    }
  ];

  // Filter FAQs based on search term and category
  const filteredFAQs = faqData
    .filter(section => !category || section.category.toLowerCase().includes(category.toLowerCase()))
    .map(section => ({
      ...section,
      questions: section.questions.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(section => section.questions.length > 0);

  if (variant === "compact") {
    // Show only top 5 most common questions
    const topQuestions = faqData.flatMap(section => section.questions).slice(0, 5);
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {topQuestions.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping, and services. Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredFAQs.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{sectionIndex + 1}</span>
                </div>
                {section.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`section-${sectionIndex}-faq-${faqIndex}`}
                    className="border rounded-lg px-6 py-2 bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="border-0 shadow-lg bg-primary/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <MessageCircle className="h-4 w-4" />
              Live Chat
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <Phone className="h-4 w-4" />
              Call Us
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Support Hours: Monday - Friday, 9 AM - 6 PM EST</p>
            <p>Average Response Time: Under 2 hours</p>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Message */}
      {searchTerm && filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-4">No results found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any FAQs matching "{searchTerm}". Try different keywords or contact our support team.
          </p>
          <Button onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};