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
  };

  const handleItemClick = (item: string) => {
    const slug = item.toLowerCase().replace(/\s+/g, '-');
    navigate(`/collections/${slug}`);
  };

  const navItems = [
    {
      title: "Door Number Signs",
      items: [
        "Office Door Numbers",
        "House Number Signs", 
        "Hotel Door Numbers",
        "Room Door Numbers",
        "Apartment Door Numbers",
        "Interior Door Numbers",
        "Elegant Door Numbers",
        "Round Door Numbers"
      ]
    },
    {
      title: "Door Signs",
      items: [
        "Interior Door Signs",
        "Room Door Signs",
        "Hotel Door Signs", 
        "School Door Signs",
        "Office Door Signs",
        "Medical Office Door Signs",
        "Receptionist Signs",
        "Bespoke House Signs"
      ]
    },
    {
      title: "Restroom Signs",
      items: [
        "Women Restroom Signs",
        "Men Restroom Signs",
        "Unisex Restroom Signs", 
        "Wheelchair Restroom Signs",
        "All-Gender Restroom Signs",
        "Clean Restroom Signs",
        "Shower Signs",
        "Washroom Signs"
      ]
    },
    {
      title: "Info Signs",
      items: [
        "Fire Information Signs",
        "Stairs Information Signs",
        "Dining Room Signs",
        "Cleaning Room Signs",
        "Cafeteria Signs",
        "Lobby Signs",
        "Elevator Signs",
        "Wi-Fi Signs"
      ]
    },
    {
      title: "Prohibitory Signs",
      items: [
        "No Smoking Signs",
        "Staff Only Signs",
        "Do Not Enter Signs",
        "Employees Only Signs",
        "No Food Or Drink Signs",
        "Quiet Please Signs",
        "No Soliciting Signs",
        "Keep Door Closed Signs"
      ]
    },
    {
      title: "Directional Signs",
      items: [
        "Directional Exit Signs",
        "Church Directional Signs",
        "Office Directional Signs",
        "Restroom Directional Signs",
        "Hospital Directional Signs",
        "Interior Directional Signs",
        "Hotel Directional Signs"
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
            
            {/* Additional Menu Items */}
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base font-medium"
                onClick={() => handleCategoryClick('Custom Door Plates')}
              >
                Custom Door Plates
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base font-medium"
                onClick={() => handleCategoryClick('ADA Signs')}
              >
                ADA Signs
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base font-medium"
                onClick={() => handleCategoryClick('Room Signs')}
              >
                Room Signs
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base font-medium"
                onClick={() => handleCategoryClick('Desk Signs')}
              >
                Desk Signs
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default ImprovedNavigation;