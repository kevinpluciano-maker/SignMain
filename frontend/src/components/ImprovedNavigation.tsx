import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImprovedNavigation = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Static navigation items - Only main categories, no dropdown items
  const navItems = [
    {
      title: "Door Number Signs",
      category: 'door-number-signs',
      items: [] // No dropdown items
    },
    {
      title: "Restroom Signs",
      category: 'restroom-signs',
      items: [] // No dropdown items
    },
    {
      title: "Prohibitory Signs",
      category: 'prohibitory-signs',
      items: [] // No dropdown items
    },
    {
      title: "Info Signs",
      category: 'info-signs',
      items: [] // No dropdown items
    }
  ];

  const handleCategoryClick = (categoryTitle: string, categoryKey: string) => {
    navigate(`/collections/${categoryKey}`);
    window.scrollTo(0, 0);
    setOpenDropdown(null);
  };

  const handleItemClick = (item: string, categoryKey: string) => {
    // Convert item name to product slug
    const slug = item.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
    
    navigate(`/products/${slug}`);
    window.scrollTo(0, 0);
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="flex space-x-0">
            {navItems.map((category) => (
              <div
                key={category.title}
                className="relative"
                onMouseEnter={() => setOpenDropdown(category.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Button
                  variant="ghost"
                  className="h-16 px-6 hover:bg-muted/50 text-base font-medium bg-transparent border-0 focus:ring-0 flex items-center gap-1"
                  onClick={() => handleCategoryClick(category.title, category.category)}
                >
                  {category.title}
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {/* Dropdown Content */}
                {openDropdown === category.title && (
                  <div className="absolute top-full left-0 mt-0 bg-card border border-border text-card-foreground shadow-xl z-[200] min-w-[400px]">
                    <div className="grid gap-1 p-4 w-[400px]">
                      {category.items.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="justify-start h-auto p-3 font-normal hover:bg-cyan-50 hover:text-cyan-700 text-left whitespace-normal w-full text-sm"
                          onClick={() => handleItemClick(item, category.category)}
                        >
                          {item}
                        </Button>
                      ))}
                      
                      {/* View All Category Link */}
                      <Button
                        variant="outline"
                        className="justify-center h-auto p-3 font-medium hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-600 text-center w-full text-sm mt-2 border-2"
                        onClick={() => handleCategoryClick(category.title, category.category)}
                      >
                        View All {category.title}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ImprovedNavigation;