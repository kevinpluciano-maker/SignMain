import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImprovedNavigation = () => {
  const navigate = useNavigate();

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
  };

  return (
    <nav className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="flex space-x-0">
            {navItems.map((category) => (
              <Button
                key={category.title}
                variant="ghost"
                className="h-16 px-6 hover:bg-cyan-50 hover:text-foreground text-base font-medium bg-transparent border-0 focus:ring-0 text-foreground"
                onClick={() => handleCategoryClick(category.title, category.category)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ImprovedNavigation;