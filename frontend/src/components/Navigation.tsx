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

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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
        "Door Number: Wood & Stainless Steel",
        "Modern Door Numbers",
        "Custom Door Numbers"
      ]
    },
    {
      title: "Restroom Signs",
      items: [
        "All-Gender Restroom Signs",
        "Staff ADA Signs",
        "Men's Restroom Signs",
        "Women's Restroom Signs"
      ]
    },
    {
      title: "Prohibitory Signs",
      items: [
        "No Guns Allowed Signs",
        "No Loitering Signs",
        "No Food Allowed Signs",
        "Pull Door Signs"
      ]
    },
    {
      title: "Info Signs",
      items: [
        "Exam Room Signs",
        "Meeting Room ADA Signs",
        "Reception Signs",
        "Roof Access Signs"
      ]
    }
  ];

  return (
    <nav className="bg-background border-b shadow-sm hidden md:block relative z-50">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex space-x-0">
            {navItems.map((category) => (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger className="h-16 px-6 hover:bg-muted/50 data-[state=open]:bg-muted text-base">
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground border shadow-lg">
                  <div className="grid w-[400px] gap-1 p-4">
                    {category.items.map((item) => (
                      <NavigationMenuLink key={item} asChild>
                        <Button
                          variant="ghost"
                          className="justify-start h-auto p-3 font-normal hover:bg-muted text-left whitespace-normal"
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
                className="h-16 px-6 hover:bg-muted/50 text-base"
                onClick={() => handleCategoryClick('Custom Door Plates')}
              >
                Custom Door Plates
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base"
                onClick={() => handleCategoryClick('ADA Signs')}
              >
                ADA Signs
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base"
                onClick={() => handleCategoryClick('Room Signs')}
              >
                Room Signs
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="h-16 px-6 hover:bg-muted/50 text-base"
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

export default Navigation;