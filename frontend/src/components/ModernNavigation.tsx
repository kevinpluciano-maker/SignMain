import React, { useState, useEffect, useRef } from "react";
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
  const isDiNocPage = location.pathname === '/di-noc';

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
    // Check if category is Di-Noc
    if (categoryTitle.toLowerCase() === 'di-noc') {
      navigate('/di-noc', { replace: false });
    } else {
      const slug = categoryTitle.toLowerCase().replace(/\s+/g, '-');
      navigate(`/collections/${slug}`, { replace: false });
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    // Instant scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleItemClick = (item: string) => {
    // Check if item is from Di-Noc category
    if (item.toLowerCase().includes('di-noc') || 
        item.toLowerCase().includes('wood grain') || 
        item.toLowerCase().includes('metallic') || 
        item.toLowerCase().includes('stone') || 
        item.toLowerCase().includes('marble') ||
        item.toLowerCase().includes('abstract patterns') ||
        item.toLowerCase().includes('solid colors') ||
        item.toLowerCase().includes('custom di-noc')) {
      navigate('/di-noc', { replace: false });
    } 
    // Handle Restroom Signs dropdown items
    else if (item === 'All Gender Restroom Signs') {
      navigate('/products/acrylic-all-gender-sign', { replace: false });
    } else if (item === "Men's Restroom") {
      navigate('/products/men-restroom-sign', { replace: false });
    } else if (item === "Women's Restroom") {
      navigate('/products/women-restroom-sign', { replace: false });
    }
    // Handle Prohibitory Signs dropdown items
    else if (item === 'No Guns Allowed') {
      navigate('/products/no-guns-allowed-stainless-steel-sign', { replace: false });
    } else if (item === 'No Loitering') {
      navigate('/products/no-loitering-stainless-steel-sign', { replace: false });
    } else if (item === 'No Food Allowed') {
      navigate('/products/no-food-allowed-stainless-steel-sign', { replace: false });
    } else if (item === 'Pull Door') {
      navigate('/products/pull-door-stainless-steel-sign', { replace: false });
    }
    // Handle Info Signs dropdown items - route to product pages
    else if (item === 'Exam Room') {
      navigate('/products/acrylic-exam-room-sign', { replace: false });
    } else if (item === 'Reception Sign') {
      navigate('/products/reception-ada-sign', { replace: false });
    } else if (item === 'Meeting Room ADA Sign') {
      navigate('/products/meeting-room-ada-sign', { replace: false });
    } else if (item === 'Roof Access') {
      navigate('/products/roof-access-stainless-steel-sign', { replace: false });
    } 
    else {
      const slug = item.toLowerCase().replace(/\s+/g, '-');
      navigate(`/collections/${slug}`, { replace: false });
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    // Instant scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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
      title: "Restroom Signs",
      items: [
        "All Gender Restroom Signs",
        "Men's Restroom",
        "Women's Restroom"
      ]
    },
    {
      title: "Prohibitory Signs",
      items: [
        "No Guns Allowed",
        "No Loitering",
        "No Food Allowed",
        "Pull Door"
      ]
    },
    {
      title: "Info Signs",
      items: [
        "Exam Room",
        "Reception Sign",
        "Meeting Room ADA Sign",
        "Roof Access"
      ]
    }
  ];

  const additionalItems = [
    'ADA Signs',
    'Room Signs',
    'Desk Signs'
  ];

  // Reduced size luxury styling for home page and Di-Noc page - moved down for better visibility
  const isTransparentPage = isHomePage || isDiNocPage;
  
  const navClasses = isTransparentPage
    ? "absolute top-0 left-0 right-0 z-40 text-white mt-32 md:mt-36 lg:mt-40"
    : "bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm sticky top-0 z-[60]";

  const luxuryNavBackground = isTransparentPage ? {
    background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(30,41,59,0.88) 50%, rgba(0,0,0,0.82) 100%)',
    backdropFilter: 'blur(16px) saturate(160%)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 6px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
  } : {};

  const premiumTextStyle = isTransparentPage ? {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '0.6px',
    textTransform: 'uppercase' as const,
    textShadow: '0 1px 6px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.08)',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility'
  } : {};

  const buttonClasses = isTransparentPage
    ? "h-11 px-4 font-semibold text-white hover:text-white transition-all duration-300 rounded-lg relative overflow-hidden group"
    : "h-12 px-4 font-medium text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg";

  const luxuryButtonStyle = isTransparentPage ? {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const
  } : {};

  const dropdownClasses = isTransparentPage
    ? "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl shadow-xl overflow-hidden transition-all duration-300 z-[100] border"
    : "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-[100]";

  const luxuryDropdownStyle = isTransparentPage ? {
    background: 'linear-gradient(145deg, rgba(0,0,0,0.98) 0%, rgba(15,23,42,0.98) 50%, rgba(0,0,0,0.98) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
  } : {};

  const dropdownItemClasses = isTransparentPage
    ? "w-full justify-start h-auto p-3 font-medium text-sm text-white hover:text-white rounded-lg transition-all duration-200 border-0 relative overflow-hidden group"
    : "w-full justify-start h-auto p-3 font-normal text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 rounded-lg transition-all duration-150 border-0";

  const luxuryItemStyle = isTransparentPage ? {
    background: 'rgba(255,255,255,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    letterSpacing: '0.3px'
  } : {};

  return (
    <nav ref={navRef} className={navClasses} style={luxuryNavBackground}>
      <div className="container mx-auto px-4">
        {/* Desktop Navigation - Reduced Size */}
        <div className="hidden lg:flex items-center justify-center h-14 py-2">
          <div className="flex items-center space-x-1">
            {/* Home Button */}
            <Button
              variant="ghost"
              className={buttonClasses}
              onClick={() => {
                navigate('/', { replace: false });
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
              }}
              style={{...luxuryButtonStyle, ...premiumTextStyle}}
              onMouseEnter={(e) => {
                if (isHomePage) {
                  e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (isHomePage) {
                  e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              Home
              {isHomePage && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
              )}
            </Button>
            
            {navItems.map((category, categoryIndex) => (
              <React.Fragment key={category.title}>
                <div
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
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isHomePage) {
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {category.title}
                    <ChevronDown className={cn(
                      "ml-1.5 h-3.5 w-3.5 transition-transform duration-300",
                      activeDropdown === category.title && "rotate-180"
                    )} />
                    {isHomePage && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    )}
                  </Button>

                  <div 
                    className={cn(
                      dropdownClasses,
                      activeDropdown === category.title 
                        ? "opacity-100 visible translate-y-0 scale-100" 
                        : "opacity-0 invisible translate-y-1 scale-98 pointer-events-none"
                    )}
                    style={luxuryDropdownStyle}
                    onMouseEnter={() => handleMouseEnter(category.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4">
                      <div className="grid gap-1">
                        {category.items.map((item, index) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className={dropdownItemClasses}
                            onClick={() => handleItemClick(item)}
                            style={{
                              ...luxuryItemStyle,
                              animationDelay: `${index * 40}ms`,
                              fontFamily: '"Inter", system-ui, sans-serif',
                              letterSpacing: '0.2px'
                            }}
                            onMouseEnter={(e) => {
                              if (isTransparentPage) {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.15))';
                                e.currentTarget.style.transform = 'translateX(4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (isTransparentPage) {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }}
                          >
                            {item}
                            {isHomePage && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/30 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Insert Di-Noc after Prohibitory Signs (index 1) */}
                {categoryIndex === 1 && (
                  <Button
                    variant="ghost"
                    className={buttonClasses}
                    onClick={() => navigate('/di-noc')}
                    style={{...luxuryButtonStyle, ...premiumTextStyle}}
                    onMouseEnter={(e) => {
                      if (isHomePage) {
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isHomePage) {
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    Di-Noc
                    {isHomePage && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    )}
                  </Button>
                )}
              </>
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
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isHomePage) {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {item}
                {isHomePage && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation - HIDDEN: Categories moved to hamburger menu in Header */}
        <div className="lg:hidden hidden">
          <div className="flex items-center justify-between h-12 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isHomePage ? "flex items-center space-x-2 text-white font-semibold px-3 py-2 rounded-lg" : "flex items-center space-x-2 text-foreground hover:bg-accent/50"}
              style={isHomePage ? {
                ...luxuryButtonStyle,
                ...premiumTextStyle,
                fontSize: '12px'
              } : {}}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="font-semibold">Categories</span>
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div 
              className={isHomePage ? "absolute left-0 right-0 top-full shadow-xl z-[90] max-h-[70vh] overflow-y-auto rounded-b-xl" : "absolute left-0 right-0 top-full bg-background/98 backdrop-blur-md border-b border-border/40 shadow-lg z-[90] max-h-[80vh] overflow-y-auto"}
              style={isHomePage ? {
                background: 'linear-gradient(145deg, rgba(0,0,0,0.92) 0%, rgba(15,23,42,0.92) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)'
              } : {}}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  {navItems.map((category) => (
                    <div key={category.title} className={`pb-3 last:pb-0 ${isHomePage ? 'border-b border-white/8' : 'border-b border-border/20'}`}>
                      <h3 
                        className={`font-semibold text-sm mb-3 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`} 
                        style={isHomePage ? {
                          fontFamily: '"Inter", system-ui, sans-serif',
                          letterSpacing: '0.6px',
                          textTransform: 'uppercase',
                          fontSize: '11px'
                        } : {}}
                      >
                        {category.title}
                      </h3>
                      <div className="grid gap-1">
                        {category.items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className={isHomePage ? "w-full justify-start h-auto p-2.5 font-medium text-sm text-white hover:text-white rounded-md transition-all duration-300" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                            onClick={() => handleItemClick(item)}
                            style={isHomePage ? {
                              letterSpacing: '0.2px',
                              fontFamily: '"Inter", system-ui, sans-serif'
                            } : {}}
                            onMouseEnter={(e) => {
                              if (isHomePage) {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                                e.currentTarget.style.transform = 'translateX(2px)';
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
                  
                  <div className={`pt-3 ${isHomePage ? 'border-t border-white/8' : 'border-t border-border/20'}`}>
                    <h3 
                      className={`font-semibold text-sm mb-3 px-2 ${isHomePage ? 'text-white' : 'text-foreground/90'}`}
                      style={isHomePage ? {
                        fontFamily: '"Inter", system-ui, sans-serif',
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase',
                        fontSize: '11px'
                      } : {}}
                    >
                      Premium Solutions
                    </h3>
                    <div className="grid gap-1">
                      {additionalItems.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className={isHomePage ? "w-full justify-start h-auto p-2.5 font-medium text-sm text-white hover:text-white rounded-md transition-all duration-300" : "w-full justify-start h-auto p-2 font-normal text-sm text-foreground/70 hover:text-foreground hover:bg-accent/40 rounded-md"}
                          onClick={() => handleCategoryClick(item)}
                          style={isHomePage ? {
                            letterSpacing: '0.2px',
                            fontFamily: '"Inter", system-ui, sans-serif'
                          } : {}}
                          onMouseEnter={(e) => {
                            if (isHomePage) {
                              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))';
                              e.currentTarget.style.transform = 'translateX(2px)';
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