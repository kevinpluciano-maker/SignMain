import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Save, 
  Eye, 
  EyeOff, 
  Zap, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Edit3,
  Wand2,
  Package,
  ShoppingBag
} from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { getAllProducts, Product } from '@/data/productsData';
import ProductEditorModal from '@/components/ProductEditorModal';

interface AdminModeProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditableField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'phone';
  category: 'header' | 'footer' | 'content' | 'seo';
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
}

const AdminMode: React.FC<AdminModeProps> = ({ isOpen, onClose }) => {
  const { headerData, footerData, updateHeaderData, updateFooterData, saveChanges, publishChanges } = useEditor();
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [changesCount, setChangesCount] = useState(0);
  
  // Product editing state
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  
  // Initialize products
  useEffect(() => {
    const products = getAllProducts();
    setAllProducts(products);
  }, []);
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    // Header fields
    phone: headerData.phone,
    email: headerData.email,
    businessHours: headerData.businessHours,
    topBarText: headerData.topBarText,
    
    // Footer fields
    companyName: footerData.companyName,
    companyDescription: footerData.companyDescription,
    
    // New SEO fields
    metaTitle: 'Premium ADA Compliant Braille Signs | Acrylic Braille Signs Canada & USA',
    metaDescription: 'Professional ADA compliant acrylic braille signage for offices, healthcare, and commercial spaces. Premium quality door numbers, restroom signs, and custom signage. Serving Canada & USA.',
    
    // Content fields
    heroTitle: 'Professional Door Signs & Signage Solutions',
    heroSubtitle: 'Quality guaranteed with worldwide shipping',
    
    // Contact info
    address: '123 Business Ave, Suite 100, City, ST 12345',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const editableFields: EditableField[] = [
    // Header fields
    { id: 'phone', label: 'Phone Number', value: formData.phone, type: 'phone', category: 'header', placeholder: '+1 (323) 843-0781' },
    { id: 'email', label: 'Email Address', value: formData.email, type: 'email', category: 'header', placeholder: 'info@signassist.com' },
    { id: 'businessHours', label: 'Business Hours', value: formData.businessHours, type: 'text', category: 'header', placeholder: '7:00 AM - 4:00 PM CST' },
    { id: 'topBarText', label: 'Top Bar Message', value: formData.topBarText, type: 'text', category: 'header', maxLength: 200 },
    
    // Footer fields
    { id: 'companyName', label: 'Company Name', value: formData.companyName, type: 'text', category: 'footer', required: true },
    { id: 'companyDescription', label: 'Company Description', value: formData.companyDescription, type: 'textarea', category: 'footer', maxLength: 300 },
    { id: 'address', label: 'Business Address', value: formData.address, type: 'textarea', category: 'footer', maxLength: 200 },
    
    // SEO fields
    { id: 'metaTitle', label: 'Meta Title', value: formData.metaTitle, type: 'text', category: 'seo', maxLength: 60, required: true },
    { id: 'metaDescription', label: 'Meta Description', value: formData.metaDescription, type: 'textarea', category: 'seo', maxLength: 160, required: true },
    
    // Content fields
    { id: 'heroTitle', label: 'Hero Title', value: formData.heroTitle, type: 'text', category: 'content', maxLength: 100 },
    { id: 'heroSubtitle', label: 'Hero Subtitle', value: formData.heroSubtitle, type: 'text', category: 'content', maxLength: 200 },
  ];

  // Auto-save functionality
  useEffect(() => {
    if (isAutoSave && changesCount > 0) {
      const saveTimer = setTimeout(() => {
        handleAutoSave();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(saveTimer);
    }
  }, [formData, isAutoSave, changesCount]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    setChangesCount(prev => prev + 1);
    setSaveStatus('idle');
  };

  const handleAutoSave = async () => {
    if (changesCount === 0) return;
    
    setSaveStatus('saving');
    try {
      // Update contexts
      updateHeaderData({
        phone: formData.phone,
        email: formData.email,
        businessHours: formData.businessHours,
        topBarText: formData.topBarText
      });
      
      updateFooterData({
        companyName: formData.companyName,
        companyDescription: formData.companyDescription
      });
      
      // Save to storage (credit-free)
      await saveChanges();
      
      setLastSaved(new Date());
      setSaveStatus('saved');
      setChangesCount(0);
      
      // Auto-publish after successful save
      if (isAutoSave) {
        await publishChanges();
      }
      
    } catch (error) {
      setSaveStatus('error');
      console.error('Auto-save failed:', error);
    }
  };

  const handleManualSave = async () => {
    await handleAutoSave();
  };

  const handlePublish = async () => {
    setSaveStatus('saving');
    try {
      await saveChanges();
      await publishChanges();
      setSaveStatus('saved');
      setLastSaved(new Date());
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const renderField = (field: EditableField) => {
    const commonProps = {
      id: field.id,
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleFieldChange(field.id, e.target.value),
      placeholder: field.placeholder,
      maxLength: field.maxLength,
      required: field.required
    };

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="flex items-center gap-2">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
          {field.maxLength && (
            <Badge variant="outline" className="text-xs">
              {field.value.length}/{field.maxLength}
            </Badge>
          )}
        </Label>
        {field.type === 'textarea' ? (
          <Textarea {...commonProps} rows={3} />
        ) : (
          <Input {...commonProps} type={field.type} />
        )}
      </div>
    );
  };

  const getFieldsByCategory = (category: EditableField['category']) => {
    return editableFields.filter(field => field.category === category);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Wand2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Admin Mode</CardTitle>
                <p className="text-white/80 text-sm">Credit-free content editing with auto-save</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Auto-save toggle */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Auto-save</span>
                <Switch
                  checked={isAutoSave}
                  onCheckedChange={setIsAutoSave}
                />
              </div>
              
              {/* Save status */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                {saveStatus === 'saving' && <Clock className="h-4 w-4 animate-spin" />}
                {saveStatus === 'saved' && <CheckCircle className="h-4 w-4 text-green-400" />}
                {saveStatus === 'error' && <AlertCircle className="h-4 w-4 text-red-400" />}
                <span className="text-sm">
                  {saveStatus === 'saving' && 'Saving...'}
                  {saveStatus === 'saved' && 'Saved'}
                  {saveStatus === 'error' && 'Error'}
                  {saveStatus === 'idle' && (changesCount > 0 ? `${changesCount} changes` : 'Up to date')}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <CardContent className="p-6">
            <Tabs defaultValue="header" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="footer">Footer</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              
              <TabsContent value="header" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFieldsByCategory('header').map(renderField)}
                </div>
              </TabsContent>
              
              <TabsContent value="footer" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {getFieldsByCategory('footer').map(renderField)}
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {getFieldsByCategory('content').map(renderField)}
                </div>
              </TabsContent>
              
              <TabsContent value="products" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Product Management</h3>
                    <Badge variant="outline">{allProducts.length} products</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {allProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{product.price}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsProductEditorOpen(true);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {getFieldsByCategory('seo').map(renderField)}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">SEO Preview</h4>
                    <div className="text-sm">
                      <div className="text-blue-600 hover:underline cursor-pointer">
                        {formData.metaTitle}
                      </div>
                      <div className="text-green-700">
                        acrylicbraillesigns.com › Professional ADA Braille Signs
                      </div>
                      <div className="text-gray-600 mt-1">
                        {formData.metaDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Last saved info */}
            {lastSaved && (
              <div className="mt-6 text-sm text-muted-foreground text-center">
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </div>
        
        {/* Action buttons */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              💡 Changes are automatically saved and published without consuming credits
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleManualSave} disabled={saveStatus === 'saving'}>
                <Save className="h-4 w-4 mr-2" />
                Save Now
              </Button>
              <Button onClick={handlePublish} disabled={saveStatus === 'saving'}>
                <Eye className="h-4 w-4 mr-2" />
                Publish Changes
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Product Editor Modal */}
      <ProductEditorModal
        isOpen={isProductEditorOpen}
        onClose={() => {
          setIsProductEditorOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={(updatedProduct) => {
          // Update the product in the local state
          setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
          console.log('Product saved:', updatedProduct);
          // In a real application, you would also save to the backend here
        }}
      />
    </div>
  );
};

export default AdminMode;