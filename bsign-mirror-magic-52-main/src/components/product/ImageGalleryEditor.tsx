import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  X, 
  Star, 
  GripVertical, 
  Image as ImageIcon,
  Edit3 
} from "lucide-react";
import { toast } from "sonner";

interface ProductImage {
  id: string;
  url: string;
  file?: File;
  isPrimary: boolean;
  alt: string;
  caption: string;
  variantId?: string;
}

interface ImageGalleryEditorProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedFormats?: string[];
}

const ImageGalleryEditor = ({
  images,
  onChange,
  maxImages = 10,
  maxFileSize = 10,
  acceptedFormats = ['.jpg', '.jpeg', '.png', '.webp']
}: ImageGalleryEditorProps) => {
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxFileSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      toast.error(`File format must be one of: ${acceptedFormats.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleFileUpload = (files: FileList) => {
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validFiles = Array.from(files).filter(validateFile);
    
    const newImages: ProductImage[] = validFiles.map((file, index) => ({
      id: `temp_${Date.now()}_${index}`,
      url: URL.createObjectURL(file),
      file,
      isPrimary: images.length === 0 && index === 0,
      alt: '',
      caption: ''
    }));

    onChange([...images, ...newImages]);
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} image(s) uploaded`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const deleteImage = (imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    
    // If we deleted the primary image, make the first remaining image primary
    if (images.find(img => img.id === imageId)?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
    
    onChange(updatedImages);
    toast.success("Image deleted");
  };

  const setPrimaryImage = (imageId: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }));
    onChange(updatedImages);
    toast.success("Primary image updated");
  };

  const updateImageMeta = (imageId: string, updates: Partial<Pick<ProductImage, 'alt' | 'caption'>>) => {
    const updatedImages = images.map(img =>
      img.id === imageId ? { ...img, ...updates } : img
    );
    onChange(updatedImages);
  };

  const handleDragStart = (e: React.DragEvent, imageId: string) => {
    setDraggedImage(imageId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropReorder = (e: React.DragEvent, targetImageId: string) => {
    e.preventDefault();
    
    if (!draggedImage || draggedImage === targetImageId) return;

    const draggedIndex = images.findIndex(img => img.id === draggedImage);
    const targetIndex = images.findIndex(img => img.id === targetImageId);

    const reorderedImages = [...images];
    const [removed] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(targetIndex, 0, removed);

    onChange(reorderedImages);
    setDraggedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Upload product images</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop images here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formats: {acceptedFormats.join(', ')} • Max {maxFileSize}MB each • Up to {maxImages} images
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= maxImages}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFormats.join(',')}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Product Images ({images.length}/{maxImages})</h3>
            <p className="text-sm text-muted-foreground">
              Drag to reorder • Click star to set primary
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card
                key={image.id}
                className="group relative"
                draggable
                onDragStart={(e) => handleDragStart(e, image.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropReorder(e, image.id)}
              >
                <CardContent className="p-3">
                  <div className="relative aspect-square mb-3">
                    <img
                      src={image.url}
                      alt={image.alt || 'Product image'}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    
                    {/* Primary Badge */}
                    {image.isPrimary && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        Primary
                      </Badge>
                    )}
                    
                    {/* Controls */}
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => setPrimaryImage(image.id)}
                        title="Set as primary"
                      >
                        <Star className={`h-4 w-4 ${image.isPrimary ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => deleteImage(image.id)}
                        title="Delete image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Drag Handle */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 rounded p-1">
                        <GripVertical className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Meta Editor */}
                  {editingImage === image.id ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs font-medium">Alt Text</Label>
                        <Input
                          value={image.alt}
                          onChange={(e) => updateImageMeta(image.id, { alt: e.target.value })}
                          placeholder="Describe the image"
                          className="h-8 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Caption</Label>
                        <Textarea
                          value={image.caption}
                          onChange={(e) => updateImageMeta(image.id, { caption: e.target.value })}
                          placeholder="Optional caption"
                          className="min-h-[60px] text-xs resize-none"
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setEditingImage(null)}
                        className="w-full"
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground truncate">
                            {image.alt || 'No alt text'}
                          </p>
                          {image.caption && (
                            <p className="text-xs text-muted-foreground/75 truncate">
                              {image.caption}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 ml-2"
                          onClick={() => setEditingImage(image.id)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryEditor;