import { useState } from "react";
import { Search, ShoppingCart, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import signassistLogo from "@/assets/signassist-logo.png";
import { useEditor } from "@/contexts/EditorContext";
import { useCart } from "@/contexts/CartContext";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import UnifiedMobileNavigation from "@/components/UnifiedMobileNavigation";

interface HeaderProps {
  showFilters?: boolean;
}

const Header = ({ showFilters = false }: HeaderProps) => {
  const { totalItems } = useCart();
  const { headerData, updateHeaderData } = useEditor();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const navigationItems = [
    {
      label: "Products",
      hasSubMenu: true,
      subItems: [
        { label: "Door Numbers Signs", path: "/collections/door-numbers" },
        { label: "Door Signs", path: "/collections/door-signs" },
        { label: "Restroom Signs", path: "/collections/restroom-signs" },
        { label: "Information Signs", path: "/collections/info-signs" },
        { label: "House Numbers", path: "/collections/house-numbers" },
        { label: "World Clock Signs", path: "/collections/world-clock" }
      ]
    },
    { label: "Catalog", path: "/products" },
    {
      label: "Designs",
      hasSubMenu: true,
      subItems: [
        { label: "Custom Designs", path: "/collections/custom" },
        { label: "Templates", path: "/collections/templates" }
      ]
    },
    { label: "Best sellers", path: "/collections/best-sellers" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Installation Guide", path: "/installation-guide" }
  ];

  // Dynamic styling based on page
  const headerClasses = isHomePage 
    ? "bg-transparent backdrop-blur-sm absolute top-0 left-0 right-0 z-50 text-white"
    : "bg-background border-b sticky top-0 z-50";

  const topBarClasses = isHomePage
    ? "bg-black/20 backdrop-blur-sm py-2 hidden md:block"
    : "bg-muted/50 py-2 hidden md:block";

  const textClasses = isHomePage ? "text-white" : "text-foreground";
  const mutedTextClasses = isHomePage ? "text-white/90" : "text-muted-foreground";

  return (
    <header className={headerClasses}>
      {/* Top Bar - Hidden on mobile */}
      <div className={topBarClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-sm">
            <span className={mutedTextClasses}>
              {headerData.topBarText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button - Uses UnifiedMobileNavigation with conditional filters */}
          <UnifiedMobileNavigation cartItems={totalItems} showFilters={showFilters} />

          {/* Logo Section */}
          <div className="flex-1 flex justify-center md:justify-start md:flex-none">
            <a href="/" className="group">
              <ImageEditor
                src={headerData.logo || signassistLogo}
                alt="Company Logo"
                onSave={(newSrc) => updateHeaderData({ logo: newSrc })}
                className={`h-10 md:h-14 lg:h-16 w-auto transition-transform group-hover:scale-105 ${isHomePage ? 'brightness-0 invert' : ''}`}
                placeholder="Click to change logo"
              />
            </a>
          </div>

          {/* Desktop Contact Info - Better organized */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <div className={`flex items-center space-x-3 text-sm px-4 py-2 rounded-lg ${isHomePage ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted/30'}`}>
              <div className={`p-1.5 rounded-full ${isHomePage ? 'bg-white/20' : 'bg-primary/10'}`}>
                <Phone className={`h-3.5 w-3.5 ${isHomePage ? 'text-white' : 'text-primary'}`} />
              </div>
              <span className={`font-medium ${textClasses}`}>
                {headerData.phone}
              </span>
            </div>
            <div className={`flex items-center space-x-3 text-sm px-4 py-2 rounded-lg ${isHomePage ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted/30'}`}>
              <div className={`p-1.5 rounded-full ${isHomePage ? 'bg-white/20' : 'bg-primary/10'}`}>
                <Mail className={`h-3.5 w-3.5 ${isHomePage ? 'text-white' : 'text-primary'}`} />
              </div>
              <span className={`font-medium ${textClasses}`}>
                {headerData.email}
              </span>
            </div>
          </div>

          {/* Right Section - Better organized */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Currency Switcher - Desktop */}
            <div className="hidden md:block">
              <CurrencySwitcher isHomePage={isHomePage} />
            </div>
            
            {/* Desktop Hours - Better styling */}
            <div className={`hidden lg:block text-right px-3 py-2 rounded-lg ${isHomePage ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted/20'}`}>
              <div className={`text-xs font-medium ${textClasses}`}>
                <span>{headerData.businessHours}</span>
              </div>
              <div className={`text-xs mt-0.5 ${mutedTextClasses}`}>
                <InlineEditor
                  value={headerData.quickLinks}
                  onSave={(value) => updateHeaderData({ quickLinks: value })}
                  placeholder="Quick links"
                />
              </div>
            </div>
            
            {/* Action Buttons - Better styling */}
            <div className="flex items-center space-x-2">
              {/* Search - Hidden on mobile, shown in menu */}
              <Button variant="ghost" size="sm" className={`hidden md:flex ${isHomePage ? 'hover:bg-white/20 text-white' : 'hover:bg-primary/10'}`}>
                <Search className="h-4 w-4" />
              </Button>

              {/* Account - Hidden on mobile */}
              <Button variant="ghost" size="sm" className={`hidden md:flex ${isHomePage ? 'hover:bg-white/20 text-white' : 'hover:bg-primary/10'}`}>
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">Account</span>
              </Button>

              {/* Cart - Always visible with better styling */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={`relative ${isHomePage ? 'hover:bg-white/20 text-white' : 'hover:bg-primary/10'}`}
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline text-sm">Cart</span>
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;