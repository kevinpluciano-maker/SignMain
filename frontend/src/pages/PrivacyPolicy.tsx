import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, FileText, UserCheck, Globe, AlertCircle } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 2025";

  return (
    <>
      <SEO
        title="Privacy Policy | BSign Store"
        description="Learn how BSign Store collects, uses, and protects your personal information. We are committed to safeguarding your privacy and data security."
        canonical="/privacy-policy"
        keywords={["privacy policy", "data protection", "personal information", "privacy rights", "GDPR"]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <ModernNavigation />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Your Privacy Matters
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-white/90 mb-2">
                We are committed to protecting your personal information and your right to privacy.
              </p>
              <p className="text-sm text-white/80">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm">Secure Data</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    SSL Encrypted
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm">No Sharing</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Never Sold
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm">Your Control</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Access Anytime
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm">Compliance</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    GDPR & CCPA
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

              {/* Introduction */}
              <div>
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                        <div className="space-y-4 text-slate-700">
                          <p className="leading-relaxed">
                            At BSign Store, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                          </p>
                          <p className="leading-relaxed">
                            By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the site.
                          </p>
                          <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                            <p className="text-sm font-medium text-slate-800">
                              <Shield className="inline h-5 w-5 text-primary mr-2" />
                              We do not store credit card details and never share customer information with third parties for marketing purposes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Information We Collect */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Information We Collect</h2>
                </div>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Personal Information</h3>
                      <p className="text-slate-700 mb-4">
                        When you make a purchase or create an account, we may collect the following information:
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Name and contact information (email address, phone number)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Billing and shipping addresses</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Payment information (processed securely through third-party payment processors)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Order history and preferences</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Automatically Collected Information</h3>
                      <p className="text-slate-700 mb-4">
                        When you visit our website, we automatically collect certain information about your device:
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>IP address and browser type</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Operating system and device information</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Pages visited and time spent on our site</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Referring website addresses</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* How We Use Your Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">How We Use Your Information</h2>
                </div>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 mb-6">
                      We use the information we collect for the following purposes:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">🛍️ Order Processing</h4>
                        <p className="text-sm text-slate-700">
                          To process and fulfill your orders, including payment verification, shipping, and customer service
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">📧 Communication</h4>
                        <p className="text-sm text-slate-700">
                          To send order confirmations, shipping updates, and respond to your inquiries
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">📊 Analytics & Improvement</h4>
                        <p className="text-sm text-slate-700">
                          To analyze website usage and improve our products, services, and user experience
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">🔒 Security</h4>
                        <p className="text-sm text-slate-700">
                          To protect against fraud, unauthorized transactions, and other illegal activities
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">⚖️ Legal Compliance</h4>
                        <p className="text-sm text-slate-700">
                          To comply with legal obligations and enforce our terms and policies
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Security */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Data Security</h2>
                </div>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Our Security Measures Include:</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>SSL/TLS encryption for data transmission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Secure payment processing through PCI-DSS compliant providers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Regular security audits and updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Restricted access to personal information on a need-to-know basis</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <p className="text-sm text-slate-800">
                        <AlertCircle className="inline h-5 w-5 text-yellow-600 mr-2" />
                        <strong>Important:</strong> While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Payment Security</h2>
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-8">
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                      <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        Credit Card Protection
                      </h3>
                      <p className="text-slate-700 mb-4">
                        We do NOT store your credit card information on our servers. All payment transactions are processed securely through reputable third-party payment processors that comply with the highest industry standards.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <span>Payment processors are PCI-DSS Level 1 certified</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <span>Transactions are encrypted using bank-level security</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <span>We never have access to your full credit card numbers</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Cookies & Tracking</h2>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">What Are Cookies?</h3>
                      <p className="text-slate-700 leading-relaxed">
                        Cookies are small text files placed on your device that help us provide and improve our services. They allow us to remember your preferences, understand how you use our site, and enhance your shopping experience.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Types of Cookies We Use:</h3>
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-1">Essential Cookies</h4>
                          <p className="text-sm text-slate-700">
                            Required for basic website functionality, including shopping cart and checkout
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-1">Performance Cookies</h4>
                          <p className="text-sm text-slate-700">
                            Help us understand how visitors interact with our website to improve performance
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-1">Functional Cookies</h4>
                          <p className="text-sm text-slate-700">
                            Remember your preferences and provide enhanced, personalized features
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-slate-800">
                        <strong>Managing Cookies:</strong> You can control or delete cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Third-Party Services</h2>
                <Card>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      We may use trusted third-party service providers to help us operate our business and serve you better. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
                    </p>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Our Third-Party Partners Include:</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Payment processors (Stripe, PayPal, etc.)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Shipping and logistics providers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Email service providers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span>Analytics services (Google Analytics)</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Your Rights */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Your Privacy Rights</h2>
                </div>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 mb-6">
                      You have the following rights regarding your personal information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">🔍 Access</h4>
                        <p className="text-sm text-slate-700">
                          Request a copy of the personal information we hold about you
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">✏️ Correction</h4>
                        <p className="text-sm text-slate-700">
                          Request correction of inaccurate or incomplete information
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">🗑️ Deletion</h4>
                        <p className="text-sm text-slate-700">
                          Request deletion of your personal information (with certain exceptions)
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">🚫 Opt-Out</h4>
                        <p className="text-sm text-slate-700">
                          Unsubscribe from marketing communications at any time
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">📦 Portability</h4>
                        <p className="text-sm text-slate-700">
                          Request a copy of your data in a portable format
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-slate-900 mb-2">⛔ Restriction</h4>
                        <p className="text-sm text-slate-700">
                          Request restriction of processing of your personal information
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">
                        To exercise any of these rights, please contact us at <a href="mailto:privacy@bsignstore.com" className="text-primary font-semibold hover:underline">privacy@bsignstore.com</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Data Retention</h2>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policies and applicable laws.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Children's Privacy</h2>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 leading-relaxed">
                      Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Links to Other Websites */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Links to Other Websites</h2>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <p className="text-sm text-slate-800">
                        <AlertCircle className="inline h-5 w-5 text-amber-600 mr-2" />
                        We encourage you to review the privacy policies of any third-party websites you visit.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Changes to Privacy Policy */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Changes to This Policy</h2>
                <Card>
                  <CardContent className="p-8">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      We may update this privacy policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      We will notify you of any material changes by posting the new policy on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Section */}
              <div>
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions About Privacy?</h2>
                    <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                      If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please don't hesitate to contact us.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-slate-900 mb-2">Privacy Department</p>
                        <a 
                          href="mailto:privacy@bsignstore.com"
                          className="text-primary hover:underline font-semibold"
                        >
                          privacy@bsignstore.com
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-slate-900 mb-2">General Inquiries</p>
                        <a 
                          href="mailto:info@bsignstore.com"
                          className="text-primary hover:underline font-semibold"
                        >
                          info@bsignstore.com
                        </a>
                      </div>
                      <p className="text-sm text-slate-600 mt-4">
                        We will respond to your inquiry within 30 days
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

export default PrivacyPolicy;
