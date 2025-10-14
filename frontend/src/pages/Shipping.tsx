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
            {/* Delivery Zones */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Delivery Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {deliveryZones.map((zone, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-semibold mb-2">{zone.zone}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Time:</span>
                          <span className="font-medium">{zone.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping Cost:</span>
                          <span className="font-medium text-xs">{zone.cost}</span>
                        </div>
                        <p className="text-muted-foreground mt-3">{zone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> We currently only ship to Canada and the United States. For international inquiries, please contact us at info@absigns.com
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Simple Shipping Rates */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="h-6 w-6 text-primary" />
                  Shipping Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {/* Free Shipping */}
                  <div className="border-2 border-green-500 bg-green-50 rounded-lg p-6 text-center">
                    <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">FREE</h3>
                    <p className="text-sm text-green-700 mb-4">
                      On orders <strong>$75 USD+</strong>
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Delivery Time</div>
                      <div className="font-semibold">5-7 Business Days</div>
                    </div>
                  </div>

                  {/* Flat Rate */}
                  <div className="border-2 border-primary/30 bg-primary/5 rounded-lg p-6 text-center">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">$12</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Flat rate on orders <strong>under $75</strong>
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Delivery Time</div>
                      <div className="font-semibold">5-7 Business Days</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3 text-center">How Shipping Works</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <div className="text-center">
                      <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 text-lg font-bold">1</div>
                      <div className="text-sm font-medium text-blue-900">Add to Cart</div>
                      <div className="text-xs text-blue-700">Shop our products</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 text-lg font-bold">2</div>
                      <div className="text-sm font-medium text-blue-900">Proceed to Checkout</div>
                      <div className="text-xs text-blue-700">Shipping calculated automatically</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 text-lg font-bold">3</div>
                      <div className="text-sm font-medium text-blue-900">Receive Your Order</div>
                      <div className="text-xs text-blue-700">5-7 business days</div>
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
                    <div className="text-muted-foreground">shipping@absigns.com</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Phone Support</div>
                    <div className="text-muted-foreground">(555) 123-4567</div>
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