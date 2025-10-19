import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";

const Footer = () => {
  const { footerData, updateFooterData } = useEditor();
  
  const footerSections = [
    {
      title: "Product Categories",
      links: [
        "Door Number Signs",
        "Door Signs", 
        "Restroom Signs",
        "Information Signs",
        "Prohibitory Signs",
        "Directional Signs",
        "Custom Signs",
        "ADA Signs"
      ]
    },
    {
      title: "Popular Signs",
      links: [
        "Office Door Numbers",
        "Hotel Door Numbers",
        "Conference Room Signs",
        "Restroom Directional Signs",
        "No Smoking Signs",
        "Staff Only Signs",
        "Emergency Exit Signs",
        "Elevator Signs"
      ]
    },
    {
      title: "Customer Service",
      links: [
        "Contact Us",
        "Shipping Information",
        "Returns & Exchanges",
        "Size Guide",
        "Custom Orders",
        "Bulk Orders",
        "Installation Guide",
        "FAQs"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Story",
        "Quality Guarantee",
        "Testimonials",
        "Blog",
        "Careers",
        "Press Kit",
        "Privacy Policy"
      ]
    }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold mb-2">
            <InlineEditor
              value={footerData.newsletter.title}
              onSave={(value) => updateFooterData({ newsletter: { ...footerData.newsletter, title: value } })}
              placeholder="Newsletter title"
            />
          </h3>
          <p className="text-muted-foreground mb-4">
            <InlineEditor
              value={footerData.newsletter.description}
              onSave={(value) => updateFooterData({ newsletter: { ...footerData.newsletter, description: value } })}
              placeholder="Newsletter description"
            />
          </p>
          <div className="flex max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Footer Content - Improved mobile layout with logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Company Info with Logo */}
          <div className="lg:col-span-1 text-center sm:text-left">
            {/* Logo */}
            <div className="mb-4 flex justify-center sm:justify-start">
              <img
                src={headerData.logo || "/lovable-uploads/logo.png"}
                alt="AB Signs"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <h3 className="font-semibold text-base mb-3">
              <InlineEditor
                value={footerData.companyName}
                onSave={(value) => updateFooterData({ companyName: value })}
                placeholder="Company name"
              />
            </h3>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              <InlineEditor
                value={footerData.companyDescription}
                onSave={(value) => updateFooterData({ companyDescription: value })}
                placeholder="Company description"
                multiline
              />
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <InlineEditor
                  value={footerData.phone}
                  onSave={(value) => updateFooterData({ phone: value })}
                  placeholder="Phone number"
                />
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <InlineEditor
                  value={footerData.email}
                  onSave={(value) => updateFooterData({ email: value })}
                  placeholder="Email address"
                />
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <InlineEditor
                  value={footerData.businessHours}
                  onSave={(value) => updateFooterData({ businessHours: value })}
                  placeholder="Business hours"
                />
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center sm:text-left">
              <h4 className="font-medium mb-4 text-base">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-muted-foreground hover:text-primary sm:justify-start justify-center w-full sm:w-auto"
                    >
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer - Better mobile spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <InlineEditor
              value={footerData.copyright}
              onSave={(value) => updateFooterData({ copyright: value })}
              placeholder="Copyright text"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">
              Terms of Service
            </Button>
            <Button variant="link" className="text-sm text-muted-foreground p-0">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-sm text-muted-foreground p-0">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;