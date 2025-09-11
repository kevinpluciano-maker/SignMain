import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, RotateCcw } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageEditorProps {
  src: string;
  alt: string;
  onSave: (newSrc: string) => void;
  className?: string;
  placeholder?: string;
}

const ImageEditor = ({ 
  src, 
  alt, 
  onSave, 
  className,
  placeholder = "Click to change image"
}: ImageEditorProps) => {
  const { isEditing } = useEditor();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a URL for the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onSave(e.target.result as string);
          toast.success("Image updated successfully");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Reset to original image - you could store original src in context
    toast.info("Reset functionality would restore original image");
  };

  if (!isEditing) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div 
      className={cn(
        "relative group cursor-pointer",
        isHovering && "ring-2 ring-primary ring-offset-2"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <img src={src} alt={alt} className={className} />
      
      {/* Overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
        isUploading && "opacity-100"
      )}>
        {isUploading ? (
          <div className="text-white text-sm font-medium">Uploading...</div>
        ) : (
          <div className="text-white text-center">
            <Upload className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm font-medium">{placeholder}</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <Button
          size="sm" 
          variant="secondary"
          className="h-6 w-6 p-0"
          onClick={handleReset}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageEditor;