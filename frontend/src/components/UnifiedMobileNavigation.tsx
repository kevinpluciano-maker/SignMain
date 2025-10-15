import { useState } from "react";
import { Search, ShoppingCart, Menu, Phone, Mail, User, ChevronRight, Filter } from "lucide-react";
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
      <SheetContent side="left" className="w-80 bg-gradient-to-br from-white to-cyan-50 p-0 overflow-y-auto">
        <SheetHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 sticky top-0 z-10 shadow-lg">
          <SheetTitle className="text-left text-xl font-bold text-white flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Menu
          </SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 bg-white shadow-sm">
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

            {/* Product Categories Section with improved styling */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-700 px-2 uppercase tracking-wider flex items-center gap-2">
                <Filter className="h-4 w-4 text-cyan-600" />
                Categories
              </h4>
              
              {/* Door Number Signs */}
              <div className="bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto font-semibold text-left hover:bg-cyan-50 transition-colors"
                  onClick={() => {
                    setExpandedItems(prev =>
                      prev.includes("Door Number Signs")
                        ? prev.filter(i => i !== "Door Number Signs")
                        : [...prev, "Door Number Signs"]
                    );
                  }}
                >
                  <span className="text-gray-800">Door Number Signs</span>
                  <ChevronRight 
                    className={`h-5 w-5 text-cyan-600 transition-transform ${
                      expandedItems.includes("Door Number Signs") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                {expandedItems.includes("Door Number Signs") && (
                  <div className="bg-cyan-50/50 px-4 pb-3 space-y-1">
                    {["Office Door Numbers", "House Number Signs", "Hotel Door Numbers", "Room Door Numbers", "Apartment Door Numbers", "Interior Door Numbers", "Elegant Door Numbers", "Round Door Numbers"].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start p-3 h-auto text-sm text-gray-600 hover:text-cyan-600 hover:bg-white rounded-lg transition-colors"
                        onClick={() => {
                          const slug = item.toLowerCase().replace(/\s+/g, '-');
                          navigate(`/collections/${slug}`);
                        }}
                      >
                        <span className="truncate">{item}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Di-Noc - Simple link without dropdown */}
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto font-medium text-left"
                onClick={() => {
                  navigate('/di-noc');
                }}
              >
                Di-Noc
              </Button>

              {/* Restroom Signs */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto font-medium text-left"
                  onClick={() => {
                    setExpandedItems(prev =>
                      prev.includes("Restroom Signs")
                        ? prev.filter(i => i !== "Restroom Signs")
                        : [...prev, "Restroom Signs"]
                    );
                  }}
                >
                  Restroom Signs
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedItems.includes("Restroom Signs") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                {expandedItems.includes("Restroom Signs") && (
                  <div className="ml-4 mt-2 space-y-1">
                    {["Women Restroom Signs", "Men Restroom Signs", "Unisex Restroom Signs", "Wheelchair Restroom Signs", "All-Gender Restroom Signs", "Clean Restroom Signs", "Shower Signs", "Washroom Signs"].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const slug = item.toLowerCase().replace(/\s+/g, '-');
                          navigate(`/collections/${slug}`);
                        }}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Signs */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto font-medium text-left"
                  onClick={() => {
                    setExpandedItems(prev =>
                      prev.includes("Info Signs")
                        ? prev.filter(i => i !== "Info Signs")
                        : [...prev, "Info Signs"]
                    );
                  }}
                >
                  Info Signs
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedItems.includes("Info Signs") ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
                {expandedItems.includes("Info Signs") && (
                  <div className="ml-4 mt-2 space-y-1">
                    {["Exam Room Signs", "Meeting Room ADA Signs", "Reception Signs"].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const slug = item.toLowerCase().replace(/\s+/g, '-');
                          navigate(`/collections/${slug}`);
                        }}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Category Items */}
              {["Custom Door Plates", "ADA Signs", "Room Signs", "Desk Signs"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto font-medium text-left"
                  onClick={() => {
                    const slug = item.toLowerCase().replace(/\s+/g, '-');
                    navigate(`/collections/${slug}`);
                  }}
                >
                  {item}
                </Button>
              ))}
              </div>

              <Separator />

              {/* Navigation Items */}
              <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.hasSubMenu ? (
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-3 h-auto font-medium text-left"
                        onClick={() => {
                          setExpandedItems(prev =>
                            prev.includes(item.label)
                              ? prev.filter(i => i !== item.label)
                              : [...prev, item.label]
                          );
                        }}
                      >
                        {item.label}
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.label) ? 'rotate-90' : ''
                          }`} 
                        />
                      </Button>
                      {expandedItems.includes(item.label) && item.subItems && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Button
                              key={subItem.label}
                              variant="ghost"
                              className="w-full justify-start p-2 h-auto text-sm text-muted-foreground hover:text-foreground"
                              onClick={() => navigate(subItem.path)}
                            >
                              {subItem.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-3 h-auto font-medium text-left"
                      onClick={() => navigate(item.path!)}
                    >
                      {item.label}
                    </Button>
                  )}
                </div>
              ))}
              </div>
            </div>
            
            {/* Bottom Section - Contact Info */}
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