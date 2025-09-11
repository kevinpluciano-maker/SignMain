import { useState, useEffect } from "react";
import { X, Gift, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ExitIntentPopupProps {
  isEnabled?: boolean;
  discountPercent?: number;
  discountCode?: string;
}

export const ExitIntentPopup = ({ 
  isEnabled = true, 
  discountPercent = 10,
  discountCode = "SAVE10" 
}: ExitIntentPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const { toast } = useToast();

  useEffect(() => {
    if (!isEnabled || hasShown) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Also show after 30 seconds if user hasn't interacted much
    const fallbackTimeout = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(fallbackTimeout);
    };
  }, [isEnabled, hasShown]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsOpen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to get the discount code.",
        variant: "destructive",
      });
      return;
    }

    // Simulate email subscription
    toast({
      title: "Discount code sent!",
      description: `Check your email for the ${discountPercent}% discount code: ${discountCode}`,
    });

    // Copy discount code to clipboard
    navigator.clipboard.writeText(discountCode);
    
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isEnabled) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-8 w-8"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center space-y-6 pt-4">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto">
              <Gift className="h-10 w-10 text-white" />
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                Wait! Don't Miss Out!
              </h3>
              <p className="text-lg text-muted-foreground">
                Get <span className="font-bold text-primary">{discountPercent}% OFF</span> your first order
              </p>
            </div>

            {/* Countdown */}
            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Limited Time Offer</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground">
                This offer expires soon!
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-center border-primary/20 focus:border-primary"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Get instant access to your discount code
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Get My {discountPercent}% Discount
              </Button>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4 border-t">
              <div className="text-center">
                <div className="font-semibold text-foreground">Free Shipping</div>
                <div>On orders over $50</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Quality Guarantee</div>
                <div>30-day returns</div>
              </div>
            </div>

            {/* Discount code display */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-sm text-muted-foreground mb-1">Your Discount Code:</div>
              <div className="font-mono font-bold text-lg tracking-wider bg-background rounded px-3 py-2 border-2 border-dashed border-primary/20">
                {discountCode}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                * Code will be automatically applied at checkout
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};