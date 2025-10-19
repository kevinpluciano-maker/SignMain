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
    {
      label: "Products",
      hasSubMenu: true,
      subItems: [
        { label: "Door Numbers Signs", path: "/collections/door-numbers" },
        { label: "Di-Noc", path: "/di-noc" },
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
      <SheetContent side="left" className="w-[85vw] max-w-sm bg-white dark:bg-slate-950 p-0 overflow-y-auto">
        <SheetHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 sticky top-0 z-10 shadow-md">
          <SheetTitle className="text-left text-lg font-bold text-white flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Menu
          </SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-3 mb-2 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-lg">
            <TabsTrigger value="menu" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Navigation</TabsTrigger>
            {showFilters && <TabsTrigger value="filters" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Filters</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="menu" className="p-4 space-y-4">
            {/* Currency Switcher with improved styling */}
            <div className="bg-white rounded-xl p-4 border-2 border-cyan-100 shadow-sm">
              <h4 className="text-xs font-bold text-cyan-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Currency
              </h4>
              <CurrencySwitcher />
            </div>

            {/* Product Categories Section - Simplified for mobile */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-600 px-3 py-2 uppercase tracking-wide">
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

            {/* Quick Actions - Simplified */}
            <div className="px-4 space-y-3">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Quick Actions
              </h4>
              
              {/* Door Number Signs - Removed nested items */}
              <Button
                variant="outline"
                className="w-full justify-start text-sm hover:bg-slate-100 transition-colors py-2.5"
                onClick={() => navigate("/collections/door-numbers")}
              >
                Door Number Signs
              </Button>

              {/* Restroom Signs - Removed nested items */}
              <Button
                variant="outline"
                className="w-full justify-start text-sm hover:bg-slate-100 transition-colors py-2.5"
                onClick={() => navigate("/collections/restroom-signs")}
              >
                Restroom Signs
              </Button>
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
          </TabsContent>
            <div className="mt-auto pt-4 border-t border-border">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Get In Touch</h4>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <InlineEditor
                    value={headerData.phone}
                    onSave={(value) => updateHeaderData({ phone: value })}
                    placeholder="Phone number"
                    className="text-sm font-semibold"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <InlineEditor
                    value={headerData.email}
                    onSave={(value) => updateHeaderData({ email: value })}
                    placeholder="Email address"
                    className="text-sm font-semibold"
                  />
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
                  <InlineEditor
                    value={headerData.businessHours}
                    onSave={(value) => updateHeaderData({ businessHours: value })}
                    placeholder="Business hours"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {showFilters && (
            <TabsContent value="filters" className="p-4 space-y-6">
              {/* Sort */}
              <div>
                <h3 className="font-medium mb-3">Sort</h3>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Best selling</option>
                  <option>Price: Low to high</option>
                  <option>Price: High to low</option>
                  <option>Newest</option>
                  <option>Rating</option>
                </select>
              </div>

              <Separator />

              {/* Product Type */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-medium text-left"
                  onClick={() => toggleSection("product-type")}
                >
                  PRODUCT TYPE
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.includes("product-type") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                
                {expandedSections.includes("product-type") && (
                  <div className="mt-3 space-y-3">
                    {productTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox id={type.id} />
                        <label
                          htmlFor={type.id}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground flex-1"
                        >
                          {type.label}
                        </label>
                        <span className="text-xs text-muted-foreground">({type.count})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Price */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-medium text-left"
                  onClick={() => toggleSection("price")}
                >
                  PRICE
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.includes("price") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                
                {expandedSections.includes("price") && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* ADA Possibility */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-medium text-left"
                  onClick={() => toggleSection("ada")}
                >
                  ADA POSSIBILITY
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.includes("ada") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                
                {expandedSections.includes("ada") && (
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ada-compliant" />
                      <label
                        htmlFor="ada-compliant"
                        className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                      >
                        With ADA Possibility
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default UnifiedMobileNavigation;