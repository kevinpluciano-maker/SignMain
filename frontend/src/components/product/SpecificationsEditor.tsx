import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save,
  Upload,
  Download 
} from "lucide-react";
import { toast } from "sonner";

interface Specification {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[]; // For select type
  required?: boolean;
}

interface SpecificationsEditorProps {
  specifications: Specification[];
  onChange: (specs: Specification[]) => void;
  allowedKeys?: string[];
  onSave?: (specs: Specification[]) => void;
}

const SpecificationsEditor = ({
  specifications,
  onChange,
  allowedKeys,
  onSave
}: SpecificationsEditorProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const [draggedSpec, setDraggedSpec] = useState<string | null>(null);
  const [editingSpec, setEditingSpec] = useState<string | null>(null);

  const defaultSpecs: Specification[] = [
    { id: 'new-1', key: '', value: '', type: 'text' }
  ];

  const currentSpecs = specifications.length > 0 ? specifications : defaultSpecs;

  const addSpecification = () => {
    const newSpec: Specification = {
      id: `spec_${Date.now()}`,
      key: '',
      value: '',
      type: 'text'
    };
    
    const updated = [...specifications, newSpec];
    onChange(updated);
    setIsDirty(true);
    setEditingSpec(newSpec.id);
  };

  const updateSpecification = (id: string, updates: Partial<Specification>) => {
    const updated = specifications.map(spec =>
      spec.id === id ? { ...spec, ...updates } : spec
    );
    
    // Validate no empty keys
    const hasEmptyKeys = updated.some(spec => spec.key.trim() === '' && spec.value.trim() !== '');
    if (hasEmptyKeys) {
      toast.error("Specification key cannot be empty");
      return;
    }

    // Validate allowed keys
    if (allowedKeys) {
      const invalidKeys = updated.filter(spec => 
        spec.key.trim() !== '' && !allowedKeys.includes(spec.key.trim())
      );
      if (invalidKeys.length > 0) {
        toast.error(`Invalid keys: ${invalidKeys.map(s => s.key).join(', ')}`);
        return;
      }
    }

    onChange(updated);
    setIsDirty(true);
  };

  const deleteSpecification = (id: string) => {
    const updated = specifications.filter(spec => spec.id !== id);
    onChange(updated);
    setIsDirty(true);
    toast.success("Specification deleted");
  };

  const handleSave = () => {
    // Remove empty specifications
    const validSpecs = specifications.filter(spec => 
      spec.key.trim() !== '' || spec.value.trim() !== ''
    );
    
    onChange(validSpecs);
    setIsDirty(false);
    
    if (onSave) {
      onSave(validSpecs);
    }
    
    toast.success("Specifications saved");
  };

  const handleDragStart = (e: React.DragEvent, specId: string) => {
    setDraggedSpec(specId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropReorder = (e: React.DragEvent, targetSpecId: string) => {
    e.preventDefault();
    
    if (!draggedSpec || draggedSpec === targetSpecId) return;

    const draggedIndex = specifications.findIndex(spec => spec.id === draggedSpec);
    const targetIndex = specifications.findIndex(spec => spec.id === targetSpecId);

    const reordered = [...specifications];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, removed);

    onChange(reordered);
    setIsDirty(true);
    setDraggedSpec(null);
  };

  const exportToCSV = () => {
    const csvContent = "key,value,type\n" + 
      specifications
        .filter(spec => spec.key.trim() && spec.value.trim())
        .map(spec => `"${spec.key}","${spec.value}","${spec.type}"`)
        .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'specifications.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n').slice(1); // Skip header
        
        const imported: Specification[] = lines
          .filter(line => line.trim())
          .map((line, index) => {
            const [key, value, type] = line.split(',').map(s => s.replace(/"/g, '').trim());
            return {
              id: `imported_${Date.now()}_${index}`,
              key: key || '',
              value: value || '',
              type: (type as Specification['type']) || 'text'
            };
          });

        onChange([...specifications, ...imported]);
        setIsDirty(true);
        toast.success(`Imported ${imported.length} specifications`);
      } catch (error) {
        toast.error("Failed to import CSV");
      }
    };
    reader.readAsText(file);
  };

  const renderSpecValue = (spec: Specification) => {
    switch (spec.type) {
      case 'boolean':
        return (
          <Select
            value={spec.value}
            onValueChange={(value) => updateSpecification(spec.id, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        );
        
      case 'select':
        return (
          <Select
            value={spec.value}
            onValueChange={(value) => updateSpecification(spec.id, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {spec.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'number':
        return (
          <Input
            type="number"
            value={spec.value}
            onChange={(e) => updateSpecification(spec.id, { value: e.target.value })}
            placeholder="Enter number"
          />
        );
        
      default:
        return (
          <Input
            value={spec.value}
            onChange={(e) => updateSpecification(spec.id, { value: e.target.value })}
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Specifications</span>
              {isDirty && (
                <Badge variant="secondary" className="text-xs">
                  Unsaved changes
                </Badge>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".csv"
              onChange={importFromCSV}
              className="hidden"
              id="csv-import"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => document.getElementById('csv-import')?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportToCSV}
              disabled={specifications.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
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
      </CardHeader>
      
      <CardContent className="space-y-4">
        {allowedKeys && (
          <div className="text-sm text-muted-foreground">
            <strong>Allowed keys:</strong> {allowedKeys.join(', ')}
          </div>
        )}

        <div className="space-y-3">
          {currentSpecs.map((spec, index) => (
            <div
              key={spec.id}
              className="group flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30"
              draggable
              onDragStart={(e) => handleDragStart(e, spec.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropReorder(e, spec.id)}
            >
              <div className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  {allowedKeys ? (
                    <Select
                      value={spec.key}
                      onValueChange={(value) => updateSpecification(spec.id, { key: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select key..." />
                      </SelectTrigger>
                      <SelectContent>
                        {allowedKeys.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={spec.key}
                      onChange={(e) => updateSpecification(spec.id, { key: e.target.value })}
                      placeholder="Property name"
                    />
                  )}
                </div>
                
                <div>
                  {renderSpecValue(spec)}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select
                    value={spec.type}
                    onValueChange={(value: Specification['type']) => 
                      updateSpecification(spec.id, { type: value })
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Yes/No</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => deleteSpecification(spec.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addSpecification}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Specification
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpecificationsEditor;