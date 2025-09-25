import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getAllProducts, getCategoryProducts, getCategoryTitle } from "@/data/productsData";
import { useEffect } from "react";

const ImprovedNavigation = () => {
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState<Array<{title: string, items: string[], category: string}>>([]);

  useEffect(() => {
    // Generate navigation items dynamically from product data
    const generateNavItems = () => {
      const categories = [
        { key: 'door-number-signs', title: 'Door Number Signs' },
        { key: 'restroom-signs', title: 'Restroom Signs' },
        { key: 'info-signs', title: 'Info Signs' },
        { key: 'prohibitory-signs', title: 'Prohibitory Signs' }
      ];

      const dynamicNavItems = categories.map(cat => {
        const products = getCategoryProducts(cat.key);
        // Get unique product names for the dropdown, limited to 6 items
        const items = products.slice(0, 6).map(product => product.name);
        
        return {
          title: cat.title,
          category: cat.key,
          items: items.length > 0 ? items : [`View All ${cat.title}`] // Fallback if no products
        };
      });

      setNavItems(dynamicNavItems);
    };

    generateNavItems();
  }, []);

  const handleCategoryClick = (categoryTitle: string, categoryKey: string) => {
    navigate(`/collections/${categoryKey}`);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  const handleItemClick = (item: string, categoryKey: string) => {
    // If it's a "View All" item, navigate to category
    if (item.startsWith('View All')) {
      navigate(`/collections/${categoryKey}`);
    } else {
      // Navigate to specific product or create a search query
      const slug = item.toLowerCase().replace(/\s+/g, '-');
      navigate(`/products/${slug}`);
    }
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-background border-b shadow-sm hidden md:block relative z-50">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex space-x-0 w-full justify-center">
            {navItems.map((category) => (
              <NavigationMenuItem key={category.title} className="relative">
                <NavigationMenuTrigger 
                  className="h-16 px-6 hover:bg-muted/50 data-[state=open]:bg-muted text-base font-medium bg-transparent border-0 focus:ring-0"
                  onClick={() => handleCategoryClick(category.title, category.category)}
                >
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 mt-0 bg-card border border-border text-card-foreground shadow-xl z-[200] min-w-[400px]">
                  <div className="grid gap-1 p-4 w-[400px]">
                    {category.items.map((item) => (
                      <NavigationMenuLink key={item} asChild>
                        <Button
                          variant="ghost"
                          className="justify-start h-auto p-3 font-normal hover:bg-muted text-left whitespace-normal w-full text-sm"
                          onClick={() => handleItemClick(item, category.category)}
                        >
                          {item}
                        </Button>
                      </NavigationMenuLink>
                    ))}
                    {/* View All Category Link */}
                    <NavigationMenuLink asChild>
                      <Button
                        variant="outline"
                        className="justify-center h-auto p-3 font-medium hover:bg-primary hover:text-primary-foreground text-center w-full text-sm mt-2"
                        onClick={() => handleCategoryClick(category.title, category.category)}
                      >
                        View All {category.title}
                      </Button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default ImprovedNavigation;