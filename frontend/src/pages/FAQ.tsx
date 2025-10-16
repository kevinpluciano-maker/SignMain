import SEO from "@/components/SEO";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const faqData = [
  {
    category: "Products & Ordering",
    questions: [
      {
        q: "What materials are your signs made from?",
        a: "Our signs are made from premium 1/8\" or 1/4\" acrylic with laser-engraved text and Grade 2 Braille. All materials are ADA compliant and built to last."
      },
      {
        q: "How do I know which size to order?",
        a: "Standard sizes are 6\"x6\" for most applications. For custom sizes, use our 'Request Custom Quote' feature on any product page. Our team will help you determine the right size for your needs."
      },
      {
        q: "Can I customize the text on the signs?",
        a: "Yes! All our signs can be customized with your specific text and room numbers. Simply enter your requirements in the product customization options or contact us for bulk orders."
      },
      {
        q: "Do you offer bulk discounts?",
        a: "Yes! We offer volume pricing for orders of 10+ signs. Contact us with your requirements for a custom quote with discounted pricing."
      },
      {
        q: "What's the difference between Raster and Tactile Braille?",
        a: "Raster (Grade 1) uses raised dots for simple text. Tactile (Grade 2) uses contractions for complex text. We'll recommend the correct type based on your needs."
      }
    ]
  },
  {
    category: "ADA Compliance",
    questions: [
      {
        q: "Are your signs ADA compliant?",
        a: "Yes! All our signs meet current ADA standards including proper Braille (Grade 2), raised characters, color contrast, and mounting height requirements."
      },
      {
        q: "What makes a sign ADA compliant?",
        a: "ADA compliant signs must have: Grade 2 Braille, raised characters (1/32\" min), proper color contrast (70% min), non-glare finish, and correct mounting height (48-60\" to centerline)."
      },
      {
        q: "Do I need Braille on all my signs?",
        a: "Permanent room identification signs require Braille. Temporary, directional, and overhead signs typically don't. We can help you determine which signs need Braille."
      },
      {
        q: "What's the correct mounting height?",
        a: "ADA requires signs to be mounted 48-60 inches from the floor to the centerline of the sign, on the latch side of the door."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Production takes 3-5 business days. Standard shipping adds 3-5 days. Expedited options available. Total timeline: 6-10 business days for most orders."
      },
      {
        q: "Do you ship to Canada?",
        a: "Yes! We ship to both USA and Canada. Shipping costs and delivery times vary by location. Canadian orders may be subject to customs duties."
      },
      {
        q: "What if my signs arrive damaged?",
        a: "We package carefully, but if damage occurs, contact us within 48 hours with photos. We'll replace damaged items at no charge."
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time."
      }
    ]
  },
  {
    category: "Installation",
    questions: [
      {
        q: "How do I install the signs?",
        a: "Most signs use double-sided VHB tape (included) or screws. Clean the surface, position the sign, and apply firm pressure for tape installation. Installation guides provided with each order."
      },
      {
        q: "What surfaces can I mount signs on?",
        a: "Our signs work on most smooth, clean surfaces: painted walls, metal, glass, wood, and plastic. Avoid extremely textured or porous surfaces."
      },
      {
        q: "Can I reposition a sign after installation?",
        a: "VHB tape creates a permanent bond. If you need to reposition, we recommend using screws instead. Contact us for remounting options."
      },
      {
        q: "Do you provide installation templates?",
        a: "Yes! We can provide mounting templates for precise placement, especially useful for multiple signs or large projects."
      }
    ]
  },
  {
    category: "Returns & Warranty",
    questions: [
      {
        q: "What's your return policy?",
        a: "Custom signs are non-returnable due to personalization. Standard signs can be returned within 30 days if unused and in original packaging. Contact us before returning."
      },
      {
        q: "Do you offer a warranty?",
        a: "Yes! All signs come with a 2-year warranty against manufacturing defects. This covers material flaws and Braille accuracy, but not damage from improper installation or use."
      },
      {
        q: "What if I ordered the wrong text?",
        a: "Please review your order carefully before submitting. We'll send a proof for approval on large orders. If we made an error, we'll remake it free of charge."
      }
    ]
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, Amex, Discover), PayPal, and ACH transfers for large orders. Purchase orders accepted for established business accounts."
      },
      {
        q: "Do you offer net terms for businesses?",
        a: "Yes! Established businesses can apply for net-30 payment terms. Contact us with your company details for credit application."
      },
      {
        q: "Are prices listed in USD or CAD?",
        a: "Prices are in USD by default. Canadian customers can switch to CAD using the currency selector in the header. Exchange rates update daily."
      }
    ]
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <SEO
        title="Frequently Asked Questions - ADA Braille Signs"
        description="Find answers to common questions about ADA compliant braille signs, ordering, shipping, installation, and compliance requirements."
        canonical="/faq"
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <ImprovedNavigation />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our ADA compliant braille signs
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredFAQs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">No results found. Try a different search term.</p>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((category, catIndex) => (
                <div key={catIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((faq, qIndex) => {
                      const itemId = `${catIndex}-${qIndex}`;
                      const isOpen = openItems.includes(itemId);
                      
                      return (
                        <Card key={itemId} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-0">
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-semibold text-gray-900 flex-1">
                                {faq.q}
                              </span>
                              <ChevronDown
                                className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-6">
                                <p className="text-gray-600 leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                <p className="mb-6 text-cyan-50">
                  Our team is here to help with any questions about ADA compliance, custom orders, or product selection.
                </p>
                <a href="/contact">
                  <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Contact Us
                  </button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default FAQ;
