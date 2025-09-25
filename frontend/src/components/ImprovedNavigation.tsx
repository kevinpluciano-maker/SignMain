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

  // Static navigation items that actually work
  const navItems = [
    {
      title: "Door Number Signs",
      category: 'door-number-signs',
      items: [
        "Door Number: Wood & Stainless Steel",
        "Modern Door Numbers",
        "Custom Door Numbers"
      ]
    },
    {
      title: "Restroom Signs",
      category: 'restroom-signs',
      items: [
        "All-Gender Restroom Signs",
        "Staff ADA Signs", 
        "Men's Restroom Signs",
        "Women's Restroom Signs"
      ]
    },
    {
      title: "Info Signs",
      category: 'info-signs',
      items: [
        "Exam Room Signs",
        "Meeting Room ADA Signs",
        "Reception Signs",
        "Roof Access Signs"
      ]
    },
    {
      title: "Prohibitory Signs",
      category: 'prohibitory-signs',
      items: [
        "No Guns Allowed Signs",
        "No Loitering Signs",
        "No Food Allowed Signs",
        "Pull Door Signs"
      ]
    },
    {
      title: "Di-Noc",
      category: 'di-noc',
      items: [
        "Wood Grain Film",
        "Stone Texture Film", 
        "Brushed Metal Film"
      ]
    }
  ];

  const handleCategoryClick = (categoryTitle: string, categoryKey: string) => {
    navigate(`/collections/${categoryKey}`);
    window.scrollTo(0, 0);
  };

  const handleItemClick = (item: string, categoryKey: string) => {
    // Convert item name to product slug
    const slug = item.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
    
    navigate(`/products/${slug}`);
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