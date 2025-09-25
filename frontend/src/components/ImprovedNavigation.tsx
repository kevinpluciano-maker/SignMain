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

const ImprovedNavigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle: string) => {
    const slug = categoryTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/collections/${slug}`);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  const handleItemClick = (item: string) => {
    const slug = item.toLowerCase().replace(/\s+/g, '-');
    navigate(`/collections/${slug}`);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  const navItems = [
    {
      title: "Door Number Signs",
      items: [
        "Modern Door Numbers",
        "Wood & Stainless Steel Door Numbers"
      ]
    },
    {
      title: "Restroom Signs", 
      items: [
        "All-Gender Restroom Signs",
        "Staff ADA Signs",
        "Acrylic All-Gender Signs",
        "Stainless Steel All-Gender Signs"
      ]
    },
    {
      title: "Info Signs",
      items: [
        "Exam Room Signs",
        "Meeting Room ADA Signs",
        "Reception Signs"
      ]
    },
    {
      title: "Prohibitory Signs",
      items: [
        "No Bicycles Signs",
        "No Guns Allowed Signs"
      ]
    }
  ];

  return (
    <nav className="bg-background border-b shadow-sm hidden md:block relative z-50">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex space-x-0 w-full justify-center">
            {navItems.map((category) => (
              <NavigationMenuItem key={category.title} className="relative">
                <NavigationMenuTrigger className="h-16 px-6 hover:bg-muted/50 data-[state=open]:bg-muted text-base font-medium bg-transparent border-0 focus:ring-0">
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 mt-0 bg-card border border-border text-card-foreground shadow-xl z-[200] min-w-[400px]">
                  <div className="grid gap-1 p-4 w-[400px]">
                    {category.items.map((item) => (
                      <NavigationMenuLink key={item} asChild>
                        <Button
                          variant="ghost"
                          className="justify-start h-auto p-3 font-normal hover:bg-muted text-left whitespace-normal w-full text-sm"
                          onClick={() => handleItemClick(item)}
                        >
                          {item}
                        </Button>
                      </NavigationMenuLink>
                    ))}
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