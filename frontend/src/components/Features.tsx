import { Shield, Truck, Award, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InlineEditor from "@/components/editor/InlineEditor";
import { useEditor } from "@/contexts/EditorContext";

const Features = () => {
  const { isEditing, isPreviewing } = useEditor();

  const handleTitleSave = (newTitle: string) => {
    console.log('Features title updated:', newTitle);
  };

  const handleDescriptionSave = (newDescription: string) => {
    console.log('Features description updated:', newDescription);
  };
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All our signs are made with premium materials and come with a lifetime quality guarantee."
    },
    {
      icon: Truck,
      title: "Canada & USA Service", 
      description: "Fast and reliable shipping to Canada & USA. Ready for bulk orders with expedited processing."
    },
    {
      icon: Award,
      title: "Professional Grade",
      description: "Architectural-grade signage suitable for offices, hotels, hospitals, and commercial spaces."
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Our team is available 7:00 AM - 4:00 PM EST to help with custom orders and installations."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <InlineEditor
              value="Why Choose AB Signs?"
              onSave={handleTitleSave}
              placeholder="Enter section title"
              className="inline-block"
              maxLength={100}
              required
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <InlineEditor
              value="Trusted by thousands of businesses in Canada & USA for professional signage solutions"
              onSave={handleDescriptionSave}
              placeholder="Enter section description"
              className="text-muted-foreground inline-block"
              maxLength={200}
              required
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;