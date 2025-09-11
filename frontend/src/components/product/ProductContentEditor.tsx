import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Eye, 
  Upload, 
  FileText, 
  List, 
  ArrowLeft,
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import ImageGalleryEditor from "./ImageGalleryEditor";
import DescriptionEditor from "./DescriptionEditor";
import SpecificationsEditor from "./SpecificationsEditor";

interface ProductImage {
  id: string;
  url: string;
  file?: File;
  isPrimary: boolean;
  alt: string;
  caption: string;
  variantId?: string;
}

interface Specification {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  required?: boolean;
}

interface ProductContentData {
  images: ProductImage[];
  description: string;
  specifications: Specification[];
}

interface ProductContentEditorProps {
  initialData?: ProductContentData;
  productId?: string;
  productName?: string;
  onSave?: (data: ProductContentData) => void;
  onCancel?: () => void;
  onPreview?: (data: ProductContentData) => void;
}

const ProductContentEditor = ({
  initialData,
  productId,
  productName = "Product",
  onSave,
  onCancel,
  onPreview
}: ProductContentEditorProps) => {
  const [contentData, setContentData] = useState<ProductContentData>({
    images: initialData?.images || [],
    description: initialData?.description || '',
    specifications: initialData?.specifications || []
  });

  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("images");
  const [isPreview, setIsPreview] = useState(false);

  const updateImages = (images: ProductImage[]) => {
    setContentData(prev => ({ ...prev, images }));
    setIsDirty(true);
  };

  const updateDescription = (description: string) => {
    setContentData(prev => ({ ...prev, description }));
    setIsDirty(true);
  };

  const updateSpecifications = (specifications: Specification[]) => {
    setContentData(prev => ({ ...prev, specifications }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    // Validate required data
    if (contentData.images.length === 0) {
      toast.error("At least one product image is required");
      setActiveTab("images");
      return;
    }

    if (!contentData.description.trim()) {
      toast.error("Product description is required");
      setActiveTab("description");
      return;
    }

    // Validate specifications
    const invalidSpecs = contentData.specifications.filter(spec => 
      spec.key.trim() === '' && spec.value.trim() !== ''
    );
    
    if (invalidSpecs.length > 0) {
      toast.error("Some specifications have empty keys");
      setActiveTab("specifications");
      return;
    }

    try {
      if (onSave) {
        await onSave(contentData);
      }
      setIsDirty(false);
      toast.success("Product content saved successfully");
    } catch (error) {
      toast.error("Failed to save product content");
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(contentData);
    }
    setIsPreview(!isPreview);
  };

  const getValidationIssues = () => {
    const issues = [];
    
    if (contentData.images.length === 0) {
      issues.push("No product images uploaded");
    }
    
    if (!contentData.description.trim()) {
      issues.push("Description is empty");
    }
    
    const invalidSpecs = contentData.specifications.filter(spec => 
      spec.key.trim() === '' && spec.value.trim() !== ''
    );
    
    if (invalidSpecs.length > 0) {
      issues.push(`${invalidSpecs.length} specification(s) have empty keys`);
    }

    return issues;
  };

  const validationIssues = getValidationIssues();

  if (isPreview) {
    return (
      <div className="min-h-screen bg-background">
        {/* Preview Header */}
        <div className="border-b bg-muted/30 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setIsPreview(false)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{productName}</h1>
                <p className="text-sm text-muted-foreground">Content Preview</p>
              </div>
            </div>
            <Badge variant="secondary">Preview Mode</Badge>
          </div>
        </div>

        {/* Preview Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {contentData.images.length > 0 ? (
                <>
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted/30">
                    <img
                      src={contentData.images.find(img => img.isPrimary)?.url || contentData.images[0].url}
                      alt={contentData.images.find(img => img.isPrimary)?.alt || 'Product image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {contentData.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg bg-muted/30">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">No images</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{productName}</h1>
                
                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Description</h3>
                  {contentData.description ? (
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: contentData.description }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic">No description</p>
                  )}
                </div>

                {/* Specifications */}
                {contentData.specifications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Specifications</h3>
                    <div className="space-y-2">
                      {contentData.specifications
                        .filter(spec => spec.key.trim() && spec.value.trim())
                        .map((spec) => (
                        <div key={spec.id} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{spec.key}:</span>
                          <span className="text-muted-foreground">
                            {spec.type === 'boolean' ? (spec.value === 'true' ? 'Yes' : 'No') : spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Header */}
      <div className="border-b bg-muted/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-lg font-semibold">Edit Product Content</h1>
              <p className="text-sm text-muted-foreground">{productName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {validationIssues.length > 0 && (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{validationIssues.length} issue(s)</span>
              </div>
            )}
            
            {isDirty && (
              <Badge variant="secondary" className="text-xs">
                Unsaved changes
              </Badge>
            )}
            
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            
            <Button onClick={handleSave} disabled={validationIssues.length > 0}>
              <Save className="h-4 w-4 mr-2" />
              Save & Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Validation Issues */}
        {validationIssues.length > 0 && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive mb-2">Please fix these issues:</h4>
                  <ul className="space-y-1 text-sm">
                    {validationIssues.map((issue, index) => (
                      <li key={index} className="text-muted-foreground">• {issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Images ({contentData.images.length})</span>
            </TabsTrigger>
            <TabsTrigger value="description" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Description</span>
            </TabsTrigger>
            <TabsTrigger value="specifications" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>Specifications ({contentData.specifications.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-0">
            <ImageGalleryEditor
              images={contentData.images}
              onChange={updateImages}
            />
          </TabsContent>

          <TabsContent value="description" className="space-y-0">
            <Card>
              <CardContent className="p-6">
                <DescriptionEditor
                  value={contentData.description}
                  onChange={updateDescription}
                  onSave={updateDescription}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-0">
            <SpecificationsEditor
              specifications={contentData.specifications}
              onChange={updateSpecifications}
              onSave={updateSpecifications}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductContentEditor;