import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import CurrencySwitcher from "@/components/CurrencySwitcher";

const ImprovedSidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["price"]);
  const [priceRange, setPriceRange] = useState([6, 152]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-full md:w-80 bg-background border-r-0 md:border-r p-4 md:p-6 space-y-6">
      {/* Mobile Currency Switcher */}
      <div className="md:hidden">
        <h3 className="font-medium mb-3">Currency</h3>
        <CurrencySwitcher />
        <Separator className="mt-4" />
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-medium mb-3">Sort</h3>
        <select className="w-full p-2 border rounded-md bg-background text-sm">
          <option>Best selling</option>
          <option>Price: Low to high</option>
          <option>Price: High to low</option>
          <option>Newest</option>
          <option>Rating</option>
        </select>
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
          {expandedSections.includes("price") ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
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
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>$6</span>
              <span>-</span>
              <span>$152</span>
            </div>
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
          ADA POSSIBILITY (BRAILLE FONT)
          {expandedSections.includes("ada") ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
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
    </div>
  );
};

export default ImprovedSidebar;