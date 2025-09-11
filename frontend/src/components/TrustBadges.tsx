import { Shield, Lock, Truck, RotateCcw, CreditCard, Award, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TrustBadgesProps {
  variant?: "compact" | "full" | "minimal";
  showTestimonials?: boolean;
}

export const TrustBadges = ({ variant = "full", showTestimonials = false }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "SSL encrypted transactions",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "2-3 day delivery available",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "text-orange-600 bg-orange-50"
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Premium materials only",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "PayPal, Stripe protected",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      icon: CheckCircle,
      title: "Verified Business",
      description: "Trusted by 10,000+ customers",
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  const testimonials = [
    {
      text: "Excellent quality signs! Fast delivery and perfect installation.",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "Professional service and beautiful custom door signs.",
      author: "James K.",
      rating: 5
    },
    {
      text: "Highly recommend! Great customer service and quality products.",
      author: "Maria L.",
      rating: 5
    }
  ];

  if (variant === "minimal") {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {badges.slice(0, 3).map((badge, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <badge.icon className="h-3 w-3" />
            {badge.title}
          </Badge>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 p-3 rounded-lg border bg-card">
            <div className={`p-2 rounded-full ${badge.color}`}>
              <badge.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-sm">{badge.title}</div>
              <div className="text-xs text-muted-foreground">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Full variant
  return (
    <div className="space-y-8">
      {/* Trust Badges Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${badge.color}`}>
                  <badge.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
                <p className="text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Security Badges */}
      <div className="text-center space-y-4">
        <h3 className="font-semibold text-lg">Secure Payment Methods</h3>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Verified by Visa</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
            <CreditCard className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Mastercard SecureCode</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
            <CheckCircle className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium">PayPal Protected</span>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      {showTestimonials && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-center">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-medium text-sm">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Certification Badges */}
      <div className="bg-muted/30 rounded-2xl p-6 text-center">
        <h3 className="font-semibold text-lg mb-4">Certifications & Guarantees</h3>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-sm font-medium">Quality Certified</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium">Industry Standard</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-sm font-medium">Lifetime Warranty</div>
          </div>
        </div>
      </div>
    </div>
  );
};