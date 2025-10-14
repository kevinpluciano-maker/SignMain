import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Clock, MapPin, Shield, Calculator } from "lucide-react";

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "FREE on orders $75+ USD",
      description: "Our only shipping option - reliable delivery across Canada and USA",
      icon: Package
    }
  ];

  const deliveryZones = [
    {
      zone: "United States",
      time: "5-7 Business Days",
      cost: "Calculated at checkout (FREE over $75 USD)",
      description: "Standard shipping to all 50 states"
    },
    {
      zone: "Canada",
      time: "5-7 Business Days",
      cost: "Calculated at checkout (FREE over $75 USD)",
      description: "Standard shipping to all provinces and territories"
    }
  ];

  return (
    <>
      <SEO
        title="Shipping Information | Fast & Reliable Delivery | AB Signs"
        description="Standard shipping across Canada and USA. Free shipping on orders over $75 USD. Delivery in 5-7 business days."
        canonical="/shipping"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ModernNavigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fast, reliable shipping options to get your signs delivered safely and on time.
              </p>
            </div>

            {/* Free Shipping Banner */}
            <Card className="mb-12 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
                    FREE SHIPPING
                  </h2>
                </div>
                <p className="text-lg text-green-700 dark:text-green-300 mb-4">
                  On all orders over $75 USD across Canada & USA
                </p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Standard Shipping Only - Reliable 5-7 Business Day Delivery
                </Badge>
              </CardContent>
            </Card>

            {/* Domestic Shipping Options */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">U.S. Shipping Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shippingOptions.map((option, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <option.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{option.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-primary">{option.time}</div>
                        <div className="text-lg font-semibold">{option.cost}</div>
                      </div>
                      <p className="text-muted-foreground">{option.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Processing Time */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Clock className="h-6 w-6 text-primary" />
                  Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Standard Products</h4>
                    <p className="text-muted-foreground">
                      Most in-stock signs are processed and shipped within 1-2 business days.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Custom Products</h4>
                    <p className="text-muted-foreground">
                      Custom signs require 2-3 business days for production before shipping.
                    </p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-lg mb-3">Order Cutoff Times</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Orders placed before 2 PM EST on business days ship the same day</li>
                    <li>• Weekend orders are processed on the next business day</li>
                    <li>• Holiday processing may take additional time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Canada & USA Shipping */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Canada & USA Shipping</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    region: "Canada",
                    timeframe: "3-5 Business Days",
                    cost: "Free shipping over $85 CAD",
                    description: "Standard shipping across all Canadian provinces and territories"
                  },
                  {
                    region: "United States",
                    timeframe: "5-7 Business Days", 
                    cost: "$15 CAD flat rate",
                    description: "Reliable shipping to all 50 states including Alaska and Hawaii"
                  }
                ].map((zone, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">{zone.region}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{zone.timeframe}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              <span>{zone.cost}</span>
                            </div>
                          </div>
                          <p className="text-sm mt-3">{zone.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 border-0 shadow-lg bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-600" />
                    Canada & USA Shipping Notes
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Free shipping to Canada on orders over $85 CAD</li>
                    <li>• Flat $15 CAD shipping rate to USA</li>
                    <li>• Express shipping options available at checkout</li>
                    <li>• All orders include tracking information</li>
                    <li>• HST/taxes included for Canadian customers</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Calculator */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calculator className="h-6 w-6 text-primary" />
                  Shipping Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <p className="text-lg mb-4">
                    Get exact shipping costs and delivery estimates for your order
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Shipping costs are automatically calculated at checkout based on your location and selected items.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="font-semibold">Step 1</div>
                      <div className="text-sm text-muted-foreground">Add items to cart</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="font-semibold">Step 2</div>
                      <div className="text-sm text-muted-foreground">Enter shipping address</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="font-semibold">Step 3</div>
                      <div className="text-sm text-muted-foreground">View shipping options</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packaging & Protection */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Package className="h-6 w-6 text-primary" />
                  Packaging & Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Secure Packaging</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Protective bubble wrap for delicate items</li>
                      <li>• Sturdy cardboard boxes sized for your order</li>
                      <li>• Custom inserts for fragile or custom signs</li>
                      <li>• Weather-resistant packaging materials</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Quality Assurance</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Each order is inspected before shipping</li>
                      <li>• Photo verification for custom orders</li>
                      <li>• Damage protection guarantee</li>
                      <li>• Easy returns if items arrive damaged</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Shipping Questions */}
            <Card className="border-0 shadow-lg bg-primary/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Questions About Shipping?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our customer service team is here to help with any shipping questions or special requirements you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="text-center">
                    <div className="font-semibold">Email Support</div>
                    <div className="text-muted-foreground">shipping@bsignstore.com</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Phone Support</div>
                    <div className="text-muted-foreground">1-800-BSIGN-1</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Support Hours</div>
                    <div className="text-muted-foreground">Mon-Fri 9AM-6PM EST</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default Shipping;