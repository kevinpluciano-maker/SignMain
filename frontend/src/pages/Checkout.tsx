import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const { items, totalItems, subtotal, tax, shipping, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    // Customer Info
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Shipping Address
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Billing Address
    sameAsShipping: true,
    billingAddress: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'US',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    newsletter: false,
    terms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    try {
      // In a real app, this would integrate with payment processor
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order ID
      const newOrderId = 'BSG-' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      
    } catch (error) {
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <SEO
          title="Checkout | AB Signs"
          description="Complete your order for professional door signs and signage"
          canonical="/checkout"
          type="website"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <ImprovedNavigation />
          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-6">🛒</div>
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Add items to your cart before proceeding to checkout.
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          <ImprovedFooter />
        </div>
      </>
    );
  }

  // Order complete page
  if (orderComplete) {
    return (
      <>
        <SEO
          title="Order Complete | AB Signs"
          description="Your order has been successfully placed"
          canonical="/checkout"
          type="website"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <ImprovedNavigation />
          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Order Complete!</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Thank you for your order. We've received your payment and will begin processing your custom signage.
              </p>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <div className="font-semibold">Order Number</div>
                      <div className="text-lg font-mono">{orderId}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Total Paid</div>
                      <div className="text-lg">${totalPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div>{formData.email}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Estimated Delivery</div>
                      <div>5-7 business days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A confirmation email has been sent to <strong>{formData.email}</strong> with your order details and tracking information.
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Link to="/products">
                    <Button>Continue Shopping</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <ImprovedFooter />
        </div>
      </>
    );
  }

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <>
      <SEO
        title="Checkout | AB Signs"
        description="Complete your order for professional door signs and signage"
        canonical="/checkout"
        type="website"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/cart" className="hover:text-primary">Cart</Link>
            <span>→</span>
            <span className="text-foreground">Checkout</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address2">Apartment, suite, etc.</Label>
                      <Input
                        id="address2"
                        value={formData.address2}
                        onChange={(e) => handleInputChange('address2', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        required
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          required
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Options */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for updates and exclusive offers
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> *
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                              {item.selectedSize && ` • Size: ${item.selectedSize}`}
                              {item.selectedColor && ` • Color: ${item.selectedColor}`}
                              {item.customizations?.roomNumber && ` • ${item.category === "door-number-signs" ? "Door Number" : "Custom Number"}: ${item.customizations.roomNumber}`}
                            </div>
                          </div>
                          <div className="font-medium">
                            ${(item.itemPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          Complete Order
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Lock className="h-4 w-4" />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                      <div>Your payment information is safe and secure</div>
                    </div>

                    <Link to="/cart" className="block">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
        
        <ImprovedFooter />
      </div>
    </>
  );
};

export default Checkout;