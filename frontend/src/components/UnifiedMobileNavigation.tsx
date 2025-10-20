import { useState } from "react";
import { Search, ShoppingCart, Menu, Phone, Mail, User, ChevronRight, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useLocation } from "react-router-dom";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";
import CurrencySwitcher from "@/components/CurrencySwitcher";

interface UnifiedMobileNavigationProps {
  cartItems?: number;
  showFilters?: boolean;
}

const UnifiedMobileNavigation = ({ cartItems = 3, showFilters = false }: UnifiedMobileNavigationProps) => {
  const { headerData, updateHeaderData } = useEditor();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(["product-type"]);
  const [priceRange, setPriceRange] = useState([6, 152]);
  
  const isHomePage = location.pathname === '/';

  const navigationItems = [
    { label: "Home", path: "/" },
    {
      label: "Restroom Signs",
      hasSubMenu: true,
      subItems: [
        { label: "All Gender Restroom Signs", path: "/products/acrylic-all-gender-sign" },
        { label: "Men's Restroom", path: "/products/men-restroom-sign" },
        { label: "Women's Restroom", path: "/products/women-restroom-sign" }
      ]
    },
    {
      label: "Prohibitory Signs",
      hasSubMenu: true,
      subItems: [
        { label: "No Guns Allowed", path: "/products/no-guns-allowed-stainless-steel-sign" },
        { label: "No Loitering", path: "/products/no-loitering-stainless-steel-sign" },
        { label: "No Food Allowed", path: "/products/no-food-allowed-stainless-steel-sign" },
        { label: "Pull Door", path: "/products/pull-door-stainless-steel-sign" }
      ]
    },
    { label: "Di-Noc", path: "/di-noc" },
    {
      label: "Info Signs",
      path: "/collections/info-signs",
      hasSubMenu: true,
      subItems: [
        { label: "Exam Room", path: "/products/acrylic-exam-room-sign" },
        { label: "Reception Sign", path: "/products/reception-ada-sign" },
        { label: "Meeting Room ADA Sign", path: "/products/meeting-room-ada-sign" },
        { label: "Roof Access", path: "/products/roof-access-stainless-steel-sign" }
      ]
    },
    { label: "Room Signs", path: "/collections/room-signs" },
    { label: "Desk Signs", path: "/collections/desk-signs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const productTypes = [
    { id: "door-numbers", label: "Door Numbers Signs", count: 245 },
    { id: "di-noc", label: "Di-Noc Finishes", count: 189 },
    { id: "restroom-signs", label: "Restroom Signs", count: 156 },
    { id: "info-signs", label: "Information Signs", count: 134 },
    { id: "house-numbers", label: "House Numbers", count: 98 },
    { id: "world-clock", label: "World Clock Signs", count: 23 }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`md:hidden p-2 ${isHomePage ? 'bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20' : ''}`}
          style={isHomePage ? {
            minWidth: '44px',
            minHeight: '44px'
          } : {}}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-sm bg-white dark:bg-slate-950 p-0 overflow-y-auto overflow-x-hidden">
        <SheetHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 sticky top-0 z-10 shadow-md">
          <SheetTitle className="text-left text-lg font-bold text-white flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Menu
          </SheetTitle>
        </SheetHeader>
        
        {/* Simplified navigation without tabs */}
        <div className="p-4 space-y-4">
          {/* Currency Switcher with improved styling */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Currency
            </h4>
            <CurrencySwitcher />
          </div>

          <Separator className="my-4" />

          {/* Product Categories Section - Simplified for mobile */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 px-3 py-2 uppercase tracking-wide">
              Categories
            </h4>
              
              {/* Simple category list without nesting */}
              {navigationItems.map((item) => (
                <div key={item.label} className="px-2">
                  {!item.hasSubMenu ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2.5 h-auto text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                      onClick={() => item.path && navigate(item.path)}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-3 py-2.5 h-auto text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => {
                          setExpandedItems(prev =>
                            prev.includes(item.label)
                              ? prev.filter(i => i !== item.label)
                              : [...prev, item.label]
                          );
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.label) ? 'rotate-90' : ''
                          }`} 
                        />
                      </Button>
                      {expandedItems.includes(item.label) && item.subItems && (
                        <div className="ml-3 space-y-0.5 border-l-2 border-slate-200 pl-3">
                          {item.subItems.map((subItem) => (
                            <Button
                              key={subItem.label}
                              variant="ghost"
                              className="w-full justify-start px-3 py-2 h-auto text-sm text-slate-600 hover:text-primary hover:bg-slate-50 rounded transition-colors"
                              onClick={() => navigate(subItem.path)}
                            >
                              {subItem.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Contact Information */}
            <div className="px-4 space-y-3 pb-6">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Contact Us
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <InlineEditor
                    value={headerData.phone}
                    onSave={(value) => updateHeaderData({ phone: value })}
                    placeholder="Phone number"
                  />
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <InlineEditor
                    value={headerData.email}
                    onSave={(value) => updateHeaderData({ email: value })}
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UnifiedMobileNavigation;