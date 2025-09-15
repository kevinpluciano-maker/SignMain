import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Edit3,
  Package
} from 'lucide-react';
import { Product } from '@/data/productsData';

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const ProductEditorModal: React.FC<ProductEditorModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Product | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  const handleFieldChange = (field: keyof Product, value: any) => {
    if (!formData) return;
    
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData) return false;
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Product price is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Product category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!formData || !validateForm()) return;
    
    setSaveStatus('saving');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the save callback
      onSave(formData);
      
      setSaveStatus('saved');
      
      // Auto-close after successful save
      setTimeout(() => {
        onClose();
        setSaveStatus('idle');
      }, 1000);
      
    } catch (error) {
      setSaveStatus('error');
      console.error('Save failed:', error);
    }
  };

  const handleArrayFieldAdd = (field: 'materials' | 'designs' | 'badges' | 'colorOptions' | 'shapeOptions' | 'brailleOptions') => {
    if (!formData) return;
    
    const currentArray = formData[field] as string[] || [];
    const newItem = `New ${field.slice(0, -1)}`;
    
    handleFieldChange(field, [...currentArray, newItem]);
  };

  const handleArrayFieldRemove = (field: 'materials' | 'designs' | 'badges' | 'colorOptions' | 'shapeOptions' | 'brailleOptions', index: number) => {
    if (!formData) return;
    
    const currentArray = formData[field] as string[] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    
    handleFieldChange(field, newArray);
  };

  const handleArrayFieldUpdate = (field: 'materials' | 'designs' | 'badges' | 'colorOptions' | 'shapeOptions' | 'brailleOptions', index: number, value: string) => {
    if (!formData) return;
    
    const currentArray = formData[field] as string[] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    
    handleFieldChange(field, newArray);
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Edit Product</CardTitle>
                <p className="text-white/80 text-sm">Update product information and sync with storefront</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Save status */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                {saveStatus === 'saving' && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                {saveStatus === 'saved' && <CheckCircle className="h-4 w-4 text-green-400" />}
                {saveStatus === 'error' && <AlertCircle className="h-4 w-4 text-red-400" />}
                <span className="text-sm">
                  {saveStatus === 'saving' && 'Saving...'}
                  {saveStatus === 'saved' && 'Saved'}
                  {saveStatus === 'error' && 'Error'}
                  {saveStatus === 'idle' && 'Ready'}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="p-6 space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Enter product name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleFieldChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restroom-signs">Restroom Signs</SelectItem>
                    <SelectItem value="door-number-signs">Door Number Signs</SelectItem>
                    <SelectItem value="info-signs">Info Signs</SelectItem>
                    <SelectItem value="custom-signs">Custom Signs</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              {/* Materials */}
              <div className="space-y-2">
                <Label>Materials</Label>
                <div className="space-y-2">
                  {formData.materials?.map((material, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={material}
                        onChange={(e) => handleArrayFieldUpdate('materials', index, e.target.value)}
                        placeholder="Material name"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleArrayFieldRemove('materials', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayFieldAdd('materials')}
                  >
                    Add Material
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="p-6 space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  placeholder="e.g., from $58.00"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>

              {/* Original Price */}
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (for discounts)</Label>
                <Input
                  id="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={(e) => handleFieldChange('originalPrice', e.target.value)}
                  placeholder="e.g., $78.00"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleFieldChange('rating', Number(e.target.value))}
                />
              </div>

              {/* Reviews */}
              <div className="space-y-2">
                <Label htmlFor="reviews">Number of Reviews</Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) => handleFieldChange('reviews', Number(e.target.value))}
                />
              </div>
            </TabsContent>

            <TabsContent value="options" className="p-6 space-y-6">
              {/* Shape Options - Special for All Gender Stainless Steel Sign */}
              {formData.id === 'all-gender-stainless-steel-sign' && (
                <div className="space-y-2">
                  <Label>Shape Options</Label>
                  <div className="space-y-2">
                    {formData.shapeOptions?.map((shape, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={shape}
                          onChange={(e) => handleArrayFieldUpdate('shapeOptions', index, e.target.value)}
                          placeholder="Shape option"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleArrayFieldRemove('shapeOptions', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayFieldAdd('shapeOptions')}
                    >
                      Add Shape Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Braille Options - Special for All Gender Stainless Steel Sign */}
              {formData.id === 'all-gender-stainless-steel-sign' && (
                <div className="space-y-2">
                  <Label>Braille Options</Label>
                  <div className="space-y-2">
                    {formData.brailleOptions?.map((braille, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={braille}
                          onChange={(e) => handleArrayFieldUpdate('brailleOptions', index, e.target.value)}
                          placeholder="Braille option"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleArrayFieldRemove('brailleOptions', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayFieldAdd('brailleOptions')}
                    >
                      Add Braille Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Color Options */}
              <div className="space-y-2">
                <Label>Color Options</Label>
                <div className="space-y-2">
                  {formData.colorOptions?.map((color, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={color}
                        onChange={(e) => handleArrayFieldUpdate('colorOptions', index, e.target.value)}
                        placeholder="Color option"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleArrayFieldRemove('colorOptions', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayFieldAdd('colorOptions')}
                  >
                    Add Color Option
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="p-6 space-y-6">
              {/* Main Image */}
              <div className="space-y-2">
                <Label htmlFor="image">Main Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleFieldChange('image', e.target.value)}
                  placeholder="Enter image URL"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="border-t p-6 bg-muted/20">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductEditorModal;