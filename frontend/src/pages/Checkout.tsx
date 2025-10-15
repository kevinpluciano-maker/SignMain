import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Lock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    // Order notes
    orderNotes: '',
    
    // Options
    newsletter: false,
    terms: false
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    // Shipping address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    // Terms validation
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessing(true);

    // Process order without payment
    try {
      // Generate order ID
      const newOrderId = 'ABS-' + Date.now().toString().slice(-8);
      
      // Prepare order data
      const orderData = {
        order_id: newOrderId,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          address: formData.address + (formData.address2 ? `, ${formData.address2}` : ''),
          city: formData.city,
          state: formData.state,
          zip: formData.zipCode,
          country: formData.country
        },
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          specifications: item.selectedOptions || {}
        })),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: totalPrice.toFixed(2),
        notes: formData.orderNotes || 'No additional notes provided'
      };

      // Send order notification to backend
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/orders/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderId(newOrderId);
        clearCart();
        setOrderComplete(true);
      } else {
        throw new Error('Failed to process order');
      }
      
    } catch (error) {
      alert('Order processing failed. Please try again or contact us directly at acrylicbraillesigns@gmail.com');
      console.error('Order error:', error);
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

                {/* Order Notice - Payment Not Required */}
                <Card className="border-2 border-green-500 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      Order Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-green-900 font-semibold">
                        ✓ No payment required at this time
                      </p>
                      <p className="text-sm text-green-800">
                        Your order will be processed and you'll receive an email with payment instructions and order details within 24 hours.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-gray-600">
                          <strong>Next Steps:</strong> Complete your order information, review your items, and click "Place Order" to submit your request. We'll contact you via email with payment options and production timeline.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Notes (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="orderNotes">Special Instructions or Requirements</Label>
                      <Textarea
                        id="orderNotes"
                        value={formData.orderNotes}
                        onChange={(e) => handleInputChange('orderNotes', e.target.value)}
                        placeholder="Enter any special instructions, custom text for signs, mounting preferences, or questions about your order..."
                        rows={4}
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Include details like custom text, mounting preferences, timeline concerns, or any questions
                      </p>
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
                      <div>Your information is safe and secure</div>
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