import { useState, useEffect } from "react";
import { Phone, Mail, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileFloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Action Menu */}
      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        {isExpanded && (
          <div className="flex flex-col gap-3 mb-3">
            {/* Call Button */}
            <a
              href="tel:+13238430781"
              className="flex items-center gap-3 bg-white rounded-full shadow-lg p-4 pr-6 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Call Us</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:acrylicbraillesigns@gmail.com"
              className="flex items-center gap-3 bg-white rounded-full shadow-lg p-4 pr-6 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Email</span>
            </a>

            {/* Quote Button */}
            <a
              href="/contact"
              className="flex items-center gap-3 bg-white rounded-full shadow-lg p-4 pr-6 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Get Quote</span>
            </a>
          </div>
        )}

        {/* Main Toggle Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all ${
            isExpanded 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
          }`}
        >
          {isExpanded ? (
            <X className="h-7 w-7" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </Button>
      </div>

      {/* Desktop Quick Contact Bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 z-40 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Need Help? Get Your Free Quote Today!</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+13238430781"
              className="flex items-center gap-2 hover:text-cyan-100 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(323) 843-0781</span>
            </a>
            <a href="/contact">
              <Button variant="secondary" size="sm">
                Request Quote
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFloatingCTA;
