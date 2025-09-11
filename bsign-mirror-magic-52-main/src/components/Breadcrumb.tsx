import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Breadcrumb = () => {
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
          Bsign store
        </Button>
        <ChevronRight className="h-4 w-4" />
        <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
          Collections
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">New</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;