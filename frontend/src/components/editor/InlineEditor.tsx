import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit3 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  editClassName?: string;
  maxLength?: number;
  required?: boolean;
}

const InlineEditor = ({ 
  value, 
  onSave, 
  placeholder, 
  multiline = false,
  className,
  editClassName,
  maxLength,
  required = false
}: InlineEditorProps) => {
  const { isEditing } = useEditor();
  const [isEditingField, setIsEditingField] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditingField && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditingField, multiline]);

  const handleEdit = () => {
    if (!isEditing) return;
    setIsEditingField(true);
  };

  const handleSave = () => {
    if (required && !editValue.trim()) {
      toast.error("This field is required");
      return;
    }
    
    if (maxLength && editValue.length > maxLength) {
      toast.error(`Maximum ${maxLength} characters allowed`);
      return;
    }

    onSave(editValue);
    setIsEditingField(false);
    toast.success("Changes saved");
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditingField(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  if (isEditingField) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn("min-h-[100px]", editClassName)}
            maxLength={maxLength}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={editClassName}
            maxLength={maxLength}
          />
        )}
        
        {maxLength && (
          <div className="text-xs text-muted-foreground text-right">
            {editValue.length}/{maxLength}
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSave}>
            <Check className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleEdit}
      className={cn(
        "group relative cursor-pointer hover:bg-muted/20 rounded p-1 -m-1 transition-colors",
        className
      )}
    >
      <span>{value || placeholder}</span>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-primary text-primary-foreground rounded p-1">
          <Edit3 className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default InlineEditor;