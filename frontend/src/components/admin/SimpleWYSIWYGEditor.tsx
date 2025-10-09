import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, Eye, EyeOff, RotateCcw, Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, List, ListOrdered,
  Link as LinkIcon, Image as ImageIcon, Type
} from 'lucide-react';
import { toast } from 'sonner';

interface SimpleWYSIWYGEditorProps {
  sectionId: string;
  sectionName: string;
  initialContent?: string;
  initialFontSize?: string;
  initialFontFamily?: string;
  onSave?: (data: EditorData) => Promise<void>;
}

interface EditorData {
  content: string;
  fontSize: string;
  fontFamily: string;
  plainText: string;
}

const SimpleWYSIWYGEditor = ({
  sectionId,
  sectionName,
  initialContent = '',
  initialFontSize = '16px',
  initialFontFamily = 'Inter',
  onSave
}: SimpleWYSIWYGEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [fontFamily, setFontFamily] = useState(initialFontFamily);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Font families available
  const fontFamilies = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Roboto', label: 'Roboto' },
  ];

  // Font sizes available
  const fontSizes = [
    { value: '12px', label: '12px' },
    { value: '14px', label: '14px' },
    { value: '16px', label: '16px (Default)' },
    { value: '18px', label: '18px' },
    { value: '20px', label: '20px' },
    { value: '24px', label: '24px' },
    { value: '28px', label: '28px' },
    { value: '32px', label: '32px' },
    { value: '36px', label: '36px' },
    { value: '48px', label: '48px' },
  ];

  // Track changes
  useEffect(() => {
    const hasContentChanged = content !== initialContent;
    const hasFontChanged = fontSize !== initialFontSize || fontFamily !== initialFontFamily;
    setHasChanges(hasContentChanged || hasFontChanged);
  }, [content, fontSize, fontFamily, initialContent, initialFontSize, initialFontFamily]);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !isPreview) {
      editorRef.current.innerHTML = content;
    }
  }, [isPreview]);

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Execute command
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleContentChange();
    editorRef.current?.focus();
  };

  // Get plain text from HTML
  const getPlainText = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const editorData: EditorData = {
        content,
        fontSize,
        fontFamily,
        plainText: getPlainText(content)
      };

      // Save to localStorage as backup
      localStorage.setItem(`wysiwyg_${sectionId}`, JSON.stringify(editorData));

      // Call the provided save function (saves to database)
      if (onSave) {
        await onSave(editorData);
      }

      toast.success('Content saved successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to initial values
  const handleReset = () => {
    setContent(initialContent);
    setFontSize(initialFontSize);
    setFontFamily(initialFontFamily);
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
    setHasChanges(false);
    toast.info('Content reset to original');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{sectionName} Editor</CardTitle>
            <CardDescription>
              Edit text, fonts, and sizes for this section
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            {hasChanges && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="settings">Typography Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            {!isPreview && (
              <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('bold')}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('italic')}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('underline')}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('justifyLeft')}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('justifyCenter')}
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('justifyRight')}
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <select
                  className="px-2 py-1 text-sm border rounded bg-background"
                  onChange={(e) => execCommand('formatBlock', e.target.value)}
                  defaultValue=""
                >
                  <option value="">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                  <option value="h5">Heading 5</option>
                  <option value="h6">Heading 6</option>
                </select>
              </div>
            )}

            {isPreview ? (
              <div 
                className="min-h-64 p-6 border rounded-lg bg-background"
                style={{
                  fontSize,
                  fontFamily,
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                className="min-h-64 p-6 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  fontSize,
                  fontFamily,
                }}
                suppressContentEditableWarning
              />
            )}

            {hasChanges && (
              <div className="text-sm text-muted-foreground">
                You have unsaved changes
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                <div 
                  className="p-4 border rounded-lg bg-muted/30"
                  style={{
                    fontSize,
                    fontFamily,
                  }}
                >
                  <p>This is how your text will look</p>
                  <p className="font-bold">Bold text example</p>
                  <p className="italic">Italic text example</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SimpleWYSIWYGEditor;
