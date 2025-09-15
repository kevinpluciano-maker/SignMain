import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@/contexts/EditorContext";
import { useNavigate } from "react-router-dom";

const ImprovedFooter = () => {
  const { footerData, updateFooterData } = useEditor();
  const navigate = useNavigate();
  
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Installation Guide", path: "/installation-guide" },
    { label: "All Products", path: "/products" }
  ];

  const productCategories = [
    { label: "Door Signs", path: "/collections/door-signs" },
    { label: "Room Signs", path: "/collections/room-signs" },
    { label: "Office Signs", path: "/collections/office-signs" },
    { label: "Custom Signs", path: "/collections/custom-signs" }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section Removed as per requirements */}

        {/* Main Footer Content - Simplified & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {footerData.companyName}
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              {footerData.companyDescription}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{footerData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{footerData.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                >
                  Shipping Info
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                >
                  Returns & FAQs
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start"
                >
                  Size Guide
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-muted-foreground mb-4 md:mb-0">
            © 2024 {footerData.companyName}. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ImprovedFooter;