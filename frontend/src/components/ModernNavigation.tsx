import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ModernNavigation = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCategoryClick = (categoryTitle: string) => {
    const slug = categoryTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/collections/${slug}`);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleItemClick = (item: string) => {
    const slug = item.toLowerCase().replace(/\s+/g, '-');
    navigate(`/collections/${slug}`);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = (categoryTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(categoryTitle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navItems = [
    {
      title: "Door Number Signs",
      items: [
        "Office Door Numbers",
        "House Number Signs", 
        "Hotel Door Numbers",
        "Room Door Numbers",
        "Apartment Door Numbers",
        "Interior Door Numbers",
        "Elegant Door Numbers",
        "Round Door Numbers"
      ]
    },
    {
      title: "Door Signs",
      items: [
        "Interior Door Signs",
        "Room Door Signs",
        "Hotel Door Signs", 
        "School Door Signs",
        "Office Door Signs",
        "Medical Office Door Signs",
        "Receptionist Signs",
        "Bespoke House Signs"
      ]
    },
    {
      title: "Restroom Signs",
      items: [
        "Women Restroom Signs",
        "Men Restroom Signs",
        "Unisex Restroom Signs", 
        "Wheelchair Restroom Signs",
        "All-Gender Restroom Signs",
        "Clean Restroom Signs",
        "Shower Signs",
        "Washroom Signs"
      ]
    },
    {
      title: "Info Signs",
      items: [
        "Fire Information Signs",
        "Stairs Information Signs",
        "Dining Room Signs",
        "Cleaning Room Signs",
        "Cafeteria Signs",
        "Lobby Signs",
        "Elevator Signs",
        "Wi-Fi Signs"
      ]
    },
    {
      title: "Prohibitory Signs",
      items: [
        "No Smoking Signs",
        "Staff Only Signs",
        "Do Not Enter Signs",
        "Employees Only Signs",
        "No Food Or Drink Signs",
        "Quiet Please Signs",
        "No Soliciting Signs",
        "Keep Door Closed Signs"
      ]
    },
    {
      title: "Directional Signs",
      items: [
        "Directional Exit Signs",
        "Church Directional Signs",
        "Office Directional Signs",
        "Restroom Directional Signs",
        "Hospital Directional Signs",
        "Interior Directional Signs",
        "Hotel Directional Signs"
      ]
    }
  ];

  const additionalItems = [
    'Custom Door Plates',
    'ADA Signs',
    'Room Signs',
    'Desk Signs'
  ];

  return (
    <nav ref={navRef} className="bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm sticky top-0 z-[60]">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center h-16">
          <div className="flex items-center space-x-1">
            {navItems.map((category) => (
              <div
                key={category.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(category.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  className="h-12 px-4 font-medium text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  {category.title}
                  <ChevronDown className={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    activeDropdown === category.title && "rotate-180"
                  )} />
                </Button>

                {/* Enhanced Dropdown with better positioning and styling */}
                <div 
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100]",
                    activeDropdown === category.title 
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  )}
                  onMouseEnter={() => handleMouseEnter(category.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-3 bg-muted/10">
                    <div className="grid gap-1">
                      {category.items.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 font-normal text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 rounded-lg transition-all duration-150 border-0"
                          onClick={() => handleItemClick(item)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Additional Menu Items */}
            {additionalItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="h-12 px-4 font-medium text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg"
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-12">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center space-x-2 text-foreground hover:bg-accent/50"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="font-medium">Categories</span>
            </Button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute left-0 right-0 top-full bg-background/98 backdrop-blur-md border-b border-border/40 shadow-lg z-[90] max-h-[80vh] overflow-y-auto">
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-3">
                  {navItems.map((category) => (
                    <div key={category.title} className="border-b border-border/20 pb-3 last:border-b-0">
                      <h3 className="font-semibold text-sm text-foreground/90 mb-2 px-2">
                        {category.title}
                      </h3>
                      <div className="grid gap-1">
                        {category.items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className="w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"
                            onClick={() => handleItemClick(item)}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-border/20">
                    <h3 className="font-semibold text-sm text-foreground/90 mb-2 px-2">
                      Additional Categories
                    </h3>
                    <div className="grid gap-1">
                      {additionalItems.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"
                          onClick={() => handleCategoryClick(item)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ModernNavigation;