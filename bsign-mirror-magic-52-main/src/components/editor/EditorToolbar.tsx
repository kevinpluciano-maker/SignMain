import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, Save, X, RotateCcw } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { toast } from "sonner";

const EditorToolbar = () => {
  const { 
    isEditing, 
    isPreviewing, 
    setIsEditing, 
    setIsPreviewing, 
    publishChanges, 
    discardChanges 
  } = useEditor();

  const handleEditMode = () => {
    setIsEditing(true);
    setIsPreviewing(false);
    toast.info("Edit mode activated. Drag sections to reorder and click products to edit.");
  };

  const handlePreviewMode = () => {
    setIsPreviewing(true);
    setIsEditing(false);
    toast.info("Preview mode activated. See how your changes will look.");
  };

  const handlePublish = () => {
    publishChanges();
    toast.success("Changes published successfully!");
  };

  const handleDiscard = () => {
    discardChanges();
    toast.info("Changes discarded.");
  };

  const handleExitMode = () => {
    setIsEditing(false);
    setIsPreviewing(false);
  };

  if (!isEditing && !isPreviewing) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={handleEditMode} size="sm" className="shadow-lg">
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Page
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-background border rounded-lg shadow-lg p-3 space-y-2">
      <div className="flex items-center space-x-2 mb-2">
        <Badge variant={isEditing ? "default" : "secondary"}>
          {isEditing ? "Editing" : "Previewing"}
        </Badge>
      </div>
      
      <div className="flex space-x-2">
        {isEditing && (
          <Button 
            onClick={handlePreviewMode} 
            variant="outline" 
            size="sm"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        )}
        
        {isPreviewing && (
          <Button 
            onClick={handleEditMode} 
            variant="outline" 
            size="sm"
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
        
        <Button 
          onClick={handlePublish} 
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-1" />
          Publish
        </Button>
        
        <Button 
          onClick={handleDiscard} 
          variant="outline" 
          size="sm"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Discard
        </Button>
        
        <Button 
          onClick={handleExitMode} 
          variant="ghost" 
          size="sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;