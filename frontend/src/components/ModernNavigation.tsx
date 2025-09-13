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

  const isHomePage = location.pathname === '/';

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

  // Luxurious futuristic styling for home page - moved down for better visibility
  const navClasses = isHomePage 
    ? "absolute top-0 left-0 right-0 z-40 text-white mt-32 md:mt-36 lg:mt-40"
    : "bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm sticky top-0 z-[60]";

  const luxuryNavBackground = isHomePage ? {
    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(30,41,59,0.9) 50%, rgba(0,0,0,0.85) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
  } : {};

  const premiumTextStyle = isHomePage ? {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontWeight: '700',
    fontSize: '15px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase' as const,
    textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility'
  } : {};

  const buttonClasses = isHomePage
    ? "h-14 px-6 font-bold text-white hover:text-white transition-all duration-300 rounded-xl relative overflow-hidden group"
    : "h-12 px-4 font-medium text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg";

  const luxuryButtonStyle = isHomePage ? {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    border: '1px solid rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const
  } : {};

  const dropdownClasses = isHomePage
    ? "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-[100] border"
    : "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100]";

  const luxuryDropdownStyle = isHomePage ? {
    background: 'linear-gradient(145deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.95) 50%, rgba(0,0,0,0.95) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
  } : {};

  const dropdownItemClasses = isHomePage
    ? "w-full justify-start h-auto p-4 font-semibold text-sm text-white hover:text-white rounded-xl transition-all duration-200 border-0 relative overflow-hidden group"
    : "w-full justify-start h-auto p-3 font-normal text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 rounded-lg transition-all duration-150 border-0";

  const luxuryItemStyle = isHomePage ? {
    background: 'transparent',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '12px',
    letterSpacing: '0.5px'
  } : {};

  return (
    <nav ref={navRef} className={navClasses} style={luxuryNavBackground}>
      <div className="container mx-auto px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center h-20 py-4">
          <div className="flex items-center space-x-2">
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
                  style={{...luxuryButtonStyle, ...premiumTextStyle}}
                  onMouseEnter={(e) => {
                    if (isHomePage) {
                      e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isHomePage) {
                      e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {category.title}
                  <ChevronDown className={cn(
                    "ml-2 h-4 w-4 transition-transform duration-300",
                    activeDropdown === category.title && "rotate-180"
                  )} />
                  {isHomePage && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </Button>

                <div 
                  className={cn(
                    dropdownClasses,
                    activeDropdown === category.title 
                      ? "opacity-100 visible translate-y-0 scale-100" 
                      : "opacity-0 invisible translate-y-2 scale-95 pointer-events-none"
                  )}
                  style={luxuryDropdownStyle}
                  onMouseEnter={() => handleMouseEnter(category.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-6">
                    <div className="grid gap-2">
                      {category.items.map((item, index) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className={dropdownItemClasses}
                          onClick={() => handleItemClick(item)}
                          style={{
                            ...luxuryItemStyle,
                            animationDelay: `${index * 50}ms`,
                            fontFamily: '"Inter", system-ui, sans-serif',
                            letterSpacing: '0.3px'
                          }}
                          onMouseEnter={(e) => {
                            if (isHomePage) {
                              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))';
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isHomePage) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }
                          }}
                        >
                          {item}
                          {isHomePage && (
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                          )}
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
                style={{...luxuryButtonStyle, ...premiumTextStyle}}
                onMouseEnter={(e) => {
                  if (isHomePage) {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isHomePage) {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {item}
                {isHomePage && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isHomePage ? "flex items-center space-x-3 text-white font-bold px-4 py-3 rounded-xl" : "flex items-center space-x-2 text-foreground hover:bg-accent/50"}
              style={isHomePage ? {
                ...luxuryButtonStyle,
                ...premiumTextStyle,
                fontSize: '14px'
              } : {}}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="font-bold">Categories</span>
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div 
              className={isHomePage ? "absolute left-0 right-0 top-full shadow-2xl z-[90] max-h-[80vh] overflow-y-auto rounded-b-2xl" : "absolute left-0 right-0 top-full bg-background/98 backdrop-blur-md border-b border-border/40 shadow-lg z-[90] max-h-[80vh] overflow-y-auto"}
              style={isHomePage ? {
                background: 'linear-gradient(145deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)'
              } : {}}
            >
              <div className="container mx-auto px-6 py-6">
                <div className="space-y-6">
                  {navItems.map((category) => (
                    <div key={category.title} className={`pb-4 last:pb-0 ${isHomePage ? 'border-b border-white/10' : 'border-b border-border/20'}`}>
                      <h3 
                        className={`font-bold text-base mb-4 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`} 
                        style={isHomePage ? {
                          fontFamily: '"Inter", system-ui, sans-serif',
                          letterSpacing: '0.8px',
                          textTransform: 'uppercase',
                          fontSize: '13px'
                        } : {}}
                      >
                        {category.title}
                      </h3>
                      <div className="grid gap-2">
                        {category.items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className={isHomePage ? "w-full justify-start h-auto p-3 font-semibold text-sm text-white hover:text-white rounded-lg transition-all duration-300" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                            onClick={() => handleItemClick(item)}
                            style={isHomePage ? {
                              letterSpacing: '0.3px',
                              fontFamily: '"Inter", system-ui, sans-serif'
                            } : {}}
                            onMouseEnter={(e) => {
                              if (isHomePage) {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                                e.currentTarget.style.transform = 'translateX(4px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (isHomePage) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }
                            }}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className={`pt-4 ${isHomePage ? 'border-t border-white/10' : 'border-t border-border/20'}`}>
                    <h3 
                      className={`font-bold text-base mb-4 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`}
                      style={isHomePage ? {
                        fontFamily: '"Inter", system-ui, sans-serif',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        fontSize: '13px'
                      } : {}}
                    >
                      Premium Solutions
                    </h3>
                    <div className="grid gap-2">
                      {additionalItems.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className={isHomePage ? "w-full justify-start h-auto p-3 font-semibold text-sm text-white hover:text-white rounded-lg transition-all duration-300" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                          onClick={() => handleCategoryClick(item)}
                          style={isHomePage ? {
                            letterSpacing: '0.3px',
                            fontFamily: '"Inter", system-ui, sans-serif'
                          } : {}}
                          onMouseEnter={(e) => {
                            if (isHomePage) {
                              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isHomePage) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }
                          }}
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