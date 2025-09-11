import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ruler, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomSizeRequestProps {
  productName: string;
}

const CustomSizeRequest = ({ productName }: CustomSizeRequestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    units: "inches",
    quantity: "",
    email: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to a backend API
    console.log("Custom size request:", { productName, ...formData });
    
    toast({
      title: "Quote Request Submitted",
      description: "We'll send you a custom quote within 24 hours.",
    });
    
    setIsOpen(false);
    setFormData({
      width: "",
      height: "",
      units: "inches",
      quantity: "",
      email: "",
      notes: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Ruler className="h-4 w-4 mr-2" />
          Request Custom Size Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Custom Size Quote</DialogTitle>
          <DialogDescription>
            Get a personalized quote for {productName} in your custom dimensions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                placeholder="e.g., 15"
                value={formData.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder="e.g., 8"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="units">Units</Label>
            <select
              id="units"
              className="w-full p-2 border border-border rounded-md bg-background"
              value={formData.units}
              onChange={(e) => handleInputChange("units", e.target.value)}
            >
              <option value="inches">Inches</option>
              <option value="mm">Millimeters</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="e.g., 5"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or questions..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Request Quote
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomSizeRequest;