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
              <Button
                key={category.title}
                variant="ghost"
                className="h-16 px-6 hover:bg-muted/50 text-base font-medium bg-transparent border-0 focus:ring-0"
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