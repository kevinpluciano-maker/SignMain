import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Package, Mail, Clock, Shield } from "lucide-react";

const RefundReturns = () => {
  return (
    <>
      <SEO
        title="Refund & Returns Policy | AB Signs"
        description="Learn about our refund and returns policy for acrylic signs, door numbers, and Di-Noc films. We stand behind our quality with a 30-day satisfaction guarantee."
        canonical="/refund-returns"
        keywords={["refund policy", "returns", "sign returns", "acrylic sign refund", "customer satisfaction"]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <ModernNavigation />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Customer Protection
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                Refund & Returns Policy
              </h1>
              <p className="text-lg text-white/90">
                Your satisfaction is our priority. Learn about our policies for returns, refunds, and exchanges.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Summary Cards */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">30-Day Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Returns accepted within 30 days of purchase
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    100% replacement for manufacturing defects
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Easy Contact</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach our support team for quick resolution
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Overview */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Overview</h2>
                </div>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      Our refund and returns policy is valid for 30 days from the date of purchase. If more than 30 days have passed since your order, we are unable to offer a full refund or exchange.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      To qualify for a return, your item must be unused, in its original condition, and in the original packaging.
                    </p>
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-slate-800 font-medium">
                        <CheckCircle className="inline h-5 w-5 text-primary mr-2" />
                        We're committed to delivering perfect signs every time. Our quality control team inspects each product before shipping.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product Issues */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Product Issues & Defects</h2>
                </div>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <p className="text-slate-700 leading-relaxed">
                      If there's an issue with your sign or Di-Noc film, please contact our support team immediately. We'll work quickly to resolve the problem.
                    </p>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg text-slate-900">For Defective Products:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Send us photos of the defect within 10 days of receiving your order</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Once confirmed as a manufacturing defect, we'll ship a replacement immediately</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">No return shipping required for confirmed defects</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <p className="text-sm text-slate-800">
                        <strong>Important:</strong> We produce signs based on the files you provide. If issues arise from file quality, incorrect design, or wrong files uploaded, we cannot accept returns or issue refunds. We will contact you if we notice any problems with your file before production.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Installation */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Installation Services</h2>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      Please take care during installation or hire a professional installer. We cannot compensate for installation fees from third parties or errors during installation.
                    </p>
                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Professional Installation Available</h3>
                      <p className="text-slate-700 mb-4">
                        If you're concerned about installation, we offer professional installation services in select areas. Contact us to check availability in your location.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Expert installation team
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          100% satisfaction guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Quote provided upon request
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Return Requirements */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Return Requirements</h2>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 mb-4">To process your return, we require:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Original receipt or proof of purchase</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Product in original packaging and unused condition</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Return request submitted within 30 days of purchase</span>
                      </li>
                    </ul>
                    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Note:</strong> Please do not send your purchase back to the manufacturer. All returns must be sent to our designated address.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Refunds */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Refunds</h2>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <p className="text-slate-700 leading-relaxed">
                      Once we receive and inspect your return, we'll send you an email notification confirming receipt. We'll also notify you whether your refund has been approved or rejected.
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-slate-900">If Approved:</h3>
                      <p className="text-slate-700">
                        Your refund will be processed and automatically credited to your original payment method within 7-10 business days.
                      </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Late or Missing Refunds</h4>
                      <p className="text-sm text-slate-700 mb-3">If you haven't received your refund:</p>
                      <ol className="text-sm text-slate-700 space-y-1 list-decimal list-inside">
                        <li>Check your bank account again</li>
                        <li>Contact your credit card company (processing may take time)</li>
                        <li>Contact your bank about processing times</li>
                        <li>If still unresolved, email us at info@absigns.com</li>
                      </ol>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Sale Items</h4>
                      <p className="text-sm text-slate-700">
                        Only regular-priced items are eligible for refunds. Items purchased on sale or clearance cannot be refunded, but may be exchanged if defective.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Exchanges */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Exchanges</h2>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      We replace items only if they are defective or damaged during shipping. If you need an exchange for the same product, please contact us at info@absigns.com with your order number and photos of the issue.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-slate-700">
                        <strong>Custom Orders:</strong> Due to the personalized nature of our door numbers and custom signs, exchanges are limited to manufacturing defects only.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipping Returns */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Shipping Returns</h2>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      To return a product, please mail it to our designated return address. Contact us first to receive return authorization and shipping instructions.
                    </p>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-900">Return Shipping Costs:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">You are responsible for return shipping costs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Original shipping costs are non-refundable</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Return shipping costs will be deducted from your refund</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-700">
                        <strong>Recommendation:</strong> For high-value items, we recommend using a trackable shipping service or purchasing shipping insurance. We cannot guarantee receipt of untracked returns.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Section */}
              <div>
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Need Help?</h2>
                    <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                      Have questions about refunds, returns, or exchanges? Our customer support team is here to help.
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="mailto:info@absigns.com"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                      >
                        Email: info@absigns.com
                      </a>
                      <p className="text-sm text-slate-600">
                        Response time: Within 24 hours on business days
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default RefundReturns;
