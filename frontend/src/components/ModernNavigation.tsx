import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ModernNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

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
    }
  ];

  const additionalItems = [
    'Custom Door Plates',
    'ADA Signs',
    'Room Signs',
    'Desk Signs'
  ];

  // Sharp, readable styling for home page
  const navClasses = isHomePage 
    ? "bg-black/50 absolute top-0 left-0 right-0 z-40 text-white mt-20 md:mt-24 lg:mt-28"
    : "bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm sticky top-0 z-[60]";

  const buttonClasses = isHomePage
    ? "h-12 px-4 font-bold text-base text-white hover:text-white hover:bg-white/30 transition-all duration-200 rounded-lg"
    : "h-12 px-4 font-medium text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg";

  const dropdownClasses = isHomePage
    ? "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-black/95 border border-white/40 rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100]"
    : "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100]";

  const dropdownItemClasses = isHomePage
    ? "w-full justify-start h-auto p-3 font-semibold text-base text-white hover:text-white hover:bg-white/30 rounded-lg transition-all duration-150 border-0"
    : "w-full justify-start h-auto p-3 font-normal text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 rounded-lg transition-all duration-150 border-0";

  return (
    <nav ref={navRef} className={navClasses} style={isHomePage ? {textShadow: '2px 2px 4px rgba(0,0,0,0.8)'} : {}}>
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
                  className={buttonClasses}
                  onClick={() => handleCategoryClick(category.title)}
                  style={isHomePage ? {textShadow: '2px 2px 4px rgba(0,0,0,0.8)'} : {}}
                >
                  {category.title}
                  <ChevronDown className={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    activeDropdown === category.title && "rotate-180"
                  )} />
                </Button>

                <div 
                  className={cn(
                    dropdownClasses,
                    activeDropdown === category.title 
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  )}
                  onMouseEnter={() => handleMouseEnter(category.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-3">
                    <div className="grid gap-1">
                      {category.items.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className={dropdownItemClasses}
                          onClick={() => handleItemClick(item)}
                          style={isHomePage ? {textShadow: '1px 1px 2px rgba(0,0,0,0.8)'} : {}}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {additionalItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={buttonClasses}
                onClick={() => handleCategoryClick(item)}
                style={isHomePage ? {textShadow: '2px 2px 4px rgba(0,0,0,0.8)'} : {}}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation - Optimized */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-12">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isHomePage ? "flex items-center space-x-2 text-white hover:bg-white/30 font-bold" : "flex items-center space-x-2 text-foreground hover:bg-accent/50"}
              style={isHomePage ? {textShadow: '2px 2px 4px rgba(0,0,0,0.8)'} : {}}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="font-bold">Categories</span>
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className={isHomePage ? "absolute left-0 right-0 top-full bg-black/95 border-b border-white/40 shadow-lg z-[90] max-h-[80vh] overflow-y-auto" : "absolute left-0 right-0 top-full bg-background/98 backdrop-blur-md border-b border-border/40 shadow-lg z-[90] max-h-[80vh] overflow-y-auto"}>
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-3">
                  {navItems.map((category) => (
                    <div key={category.title} className={`border-b pb-3 last:border-b-0 ${isHomePage ? 'border-white/40' : 'border-border/20'}`}>
                      <h3 className={`font-bold text-sm mb-2 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`} style={isHomePage ? {textShadow: '1px 1px 2px rgba(0,0,0,0.8)'} : {}}>
                        {category.title}
                      </h3>
                      <div className="grid gap-1">
                        {category.items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className={isHomePage ? "w-full justify-start h-auto p-2 font-semibold text-sm text-white hover:text-white hover:bg-white/30 rounded-md" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                            onClick={() => handleItemClick(item)}
                            style={isHomePage ? {textShadow: '1px 1px 2px rgba(0,0,0,0.8)'} : {}}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className={`pt-2 border-t ${isHomePage ? 'border-white/40' : 'border-border/20'}`}>
                    <h3 className={`font-bold text-sm mb-2 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`} style={isHomePage ? {textShadow: '1px 1px 2px rgba(0,0,0,0.8)'} : {}}>
                      Additional Categories
                    </h3>
                    <div className="grid gap-1">
                      {additionalItems.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className={isHomePage ? "w-full justify-start h-auto p-2 font-semibold text-sm text-white hover:text-white hover:bg-white/30 rounded-md" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                          onClick={() => handleCategoryClick(item)}
                          style={isHomePage ? {textShadow: '1px 1px 2px rgba(0,0,0,0.8)'} : {}}
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