import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link, 
  Heading1, 
  Heading2,
  Save,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  autoSave?: boolean;
  onSave?: (value: string) => void;
}

const DescriptionEditor = ({
  value,
  onChange,
  maxLength = 5000,
  placeholder = "Enter product description...",
  autoSave = false,
  onSave
}: DescriptionEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (!editorRef.current) return;
    
    const content = editorRef.current.innerHTML;
    const textContent = editorRef.current.textContent || '';
    
    if (textContent.length > maxLength) {
      toast.error(`Description exceeds ${maxLength} characters`);
      return;
    }
    
    onChange(content);
    setIsDirty(true);
    
    if (autoSave) {
      // Debounce autosave
      const timeoutId = setTimeout(() => {
        handleSave();
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(value);
      setIsDirty(false);
      toast.success("Description saved");
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const text = selection.toString() || 'Heading';
    
    range.deleteContents();
    const heading = document.createElement(`h${level}`);
    heading.textContent = text;
    heading.className = level === 1 ? 'text-xl font-bold mb-2' : 'text-lg font-semibold mb-2';
    range.insertNode(heading);
    
    // Move cursor after heading
    range.setStartAfter(heading);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const formatButtons = [
    { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
  ];

  const renderPreview = () => {
    // Simple HTML to React conversion for preview
    return (
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  };

  const textLength = editorRef.current?.textContent?.length || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Product Description</h3>
        <div className="flex items-center space-x-2">
          {isDirty && (
            <Badge variant="secondary" className="text-xs">
              Unsaved changes
            </Badge>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          {onSave && (
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!isDirty}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>
      </div>

      {!isPreview ? (
        <div className="border rounded-lg">
          {/* Toolbar */}
          <div className="border-b bg-muted/30 p-2 flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {formatButtons.map((button, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => execCommand(button.command)}
                  title={button.title}
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-xs"
                onClick={() => insertHeading(1)}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-xs"
                onClick={() => insertHeading(2)}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={insertLink}
              title="Insert Link"
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[200px] p-4 focus:outline-none"
            style={{ whiteSpace: 'pre-wrap' }}
            onInput={handleInput}
            onKeyDown={(e) => {
              if (e.ctrlKey || e.metaKey) {
                if (e.key === 'b') {
                  e.preventDefault();
                  execCommand('bold');
                } else if (e.key === 'i') {
                  e.preventDefault();
                  execCommand('italic');
                }
              }
            }}
            dangerouslySetInnerHTML={{ __html: value }}
            data-placeholder={placeholder}
          />

          {/* Character Count */}
          <div className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between">
            <span>
              {textLength}/{maxLength} characters
            </span>
            <span className="text-xs text-muted-foreground">
              Use Ctrl+B for bold, Ctrl+I for italic
            </span>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 min-h-[200px] bg-muted/10">
          <h4 className="font-medium mb-3">Preview</h4>
          {value ? renderPreview() : (
            <p className="text-muted-foreground italic">No description content</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionEditor;