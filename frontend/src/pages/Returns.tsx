import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Shield, Calendar, CheckCircle, AlertCircle, Package, ArrowRight } from "lucide-react";

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Email us within 30 days of delivery with your order number and reason for return",
      icon: Package
    },
    {
      step: 2,
      title: "Get Authorization",
      description: "We'll provide a Return Authorization (RA) number and prepaid shipping label",
      icon: CheckCircle
    },
    {
      step: 3,
      title: "Pack & Ship",
      description: "Securely package the item with the RA number and use the provided shipping label",
      icon: RotateCcw
    },
    {
      step: 4,
      title: "Refund Processed",
      description: "Once we receive and inspect the item, your refund will be processed within 3-5 business days",
      icon: Shield
    }
  ];

  const returnPolicies = [
    {
      title: "Standard Products",
      policy: "30-day returns",
      description: "Full refund available for unused items in original packaging",
      eligible: true
    },
    {
      title: "Custom Products",
      policy: "Defect-only returns",
      description: "Returns accepted only for manufacturing defects",
      eligible: false
    },
    {
      title: "Personalized Items",
      policy: "No returns",
      description: "Custom text/engraved items cannot be returned unless defective",
      eligible: false
    },
    {
      title: "Damaged Items",
      policy: "Immediate replacement",
      description: "Report damage within 48 hours for instant replacement",
      eligible: true
    }
  ];

  return (
    <>
      <SEO
        title="Return & Refund Policy | Easy Returns | AB Signs"
        description="Learn about our 30-day return policy, easy return process, and refund procedures. Hassle-free returns with prepaid shipping labels for eligible items."
        canonical="/returns"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ModernNavigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Return & Refund Policy</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We want you to be completely satisfied with your purchase. Learn about our simple return process and policies.
              </p>
            </div>

            {/* Policy Highlight */}
            <Card className="mb-12 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
                    30-Day Return Policy
                  </h2>
                </div>
                <p className="text-lg text-green-700 dark:text-green-300 mb-4">
                  Return eligible items within 30 days of delivery for a full refund
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Free return shipping
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Full refund guarantee
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    No restocking fees
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Return Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Return Your Order</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-primary">Step {step.step}</div>
                          <h3 className="font-bold text-lg">{step.title}</h3>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                    {index < returnSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Return Eligibility */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Return Eligibility by Product Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {returnPolicies.map((policy, index) => (
                  <Card key={index} className={`border-0 shadow-lg ${
                    policy.eligible ? 'bg-green-50 dark:bg-green-950/20' : 'bg-orange-50 dark:bg-orange-950/20'
                  }`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <span>{policy.title}</span>
                        {policy.eligible ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-orange-600" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={policy.eligible ? "default" : "secondary"} className={
                          policy.eligible 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        }>
                          {policy.policy}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{policy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Return Conditions */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Return Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-green-600">✓ Eligible for Return</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Items in original, unused condition</li>
                      <li>• Original packaging and materials included</li>
                      <li>• Returned within 30 days of delivery</li>
                      <li>• No signs of installation or mounting</li>
                      <li>• Receipt or order confirmation available</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-red-600">✗ Not Eligible for Return</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Custom or personalized products (unless defective)</li>
                      <li>• Items damaged by customer misuse</li>
                      <li>• Signs that have been installed or modified</li>
                      <li>• Items returned after 30 days</li>
                      <li>• Products without original packaging</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Information */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-primary" />
                  Refund Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">3-5</div>
                    <div className="text-sm text-muted-foreground">Business days for refund processing</div>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Full refund on eligible returns</div>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">FREE</div>
                    <div className="text-sm text-muted-foreground">Return shipping with our label</div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4">Refund Processing</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Refunds are processed to the original payment method</li>
                    <li>• Credit card refunds may take 5-10 business days to appear</li>
                    <li>• PayPal refunds are typically instant once processed</li>
                    <li>• You'll receive email confirmation when refund is issued</li>
                    <li>• Original shipping costs are refunded for defective items</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Exchanges */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Exchanges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We currently don't offer direct exchanges. To get a different size, color, or style:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Option 1: Return & Reorder</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Return the original item</li>
                        <li>Receive full refund</li>
                        <li>Place new order for desired item</li>
                      </ol>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Option 2: Contact Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Our customer service team can help coordinate returns and new orders to minimize delays.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warranty Information */}
            <Card className="mb-12 border-0 shadow-lg bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Product Warranty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-blue-800 dark:text-blue-200">
                    All our signs come with a 2-year warranty against manufacturing defects and material failures.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Warranty Covers:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Manufacturing defects</li>
                        <li>• Material failure under normal use</li>
                        <li>• Fading or color issues</li>
                        <li>• Structural integrity problems</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Warranty Excludes:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Damage from misuse or abuse</li>
                        <li>• Normal wear and tear</li>
                        <li>• Weather damage beyond normal exposure</li>
                        <li>• Damage from improper installation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-primary/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with a Return?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our customer service team is here to make your return process as smooth as possible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="font-semibold">Email Returns</div>
                    <div className="text-muted-foreground">returns@absigns.com</div>
                    <div className="text-sm text-muted-foreground mt-1">Include order number</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Phone Support</div>
                    <div className="text-muted-foreground">(555) 123-4567</div>
                    <div className="text-sm text-muted-foreground mt-1">Mon-Fri 9AM-6PM EST</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Live Chat</div>
                    <div className="text-muted-foreground">Available on website</div>
                    <div className="text-sm text-muted-foreground mt-1">Instant assistance</div>
                  </div>
                </div>
                <Button className="mt-6" size="lg">
                  Start Return Process
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default Returns;