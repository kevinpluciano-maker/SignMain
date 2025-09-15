import React, { useState } from 'react';
import { Edit3, Eye, Save, Upload, Settings, Wand2, Lock } from 'lucide-react';
import AdminMode from '@/components/AdminMode';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';

const EditorToolbar: React.FC = () => {
  const { 
    isEditing, 
    isPreviewing, 
    toggleEditing, 
    togglePreviewing, 
    saveChanges, 
    publishChanges 
  } = useEditor();

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showAdminMode, setShowAdminMode] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveChanges();
      console.log('✅ Changes saved successfully');
    } catch (error) {
      console.error('❌ Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishChanges();
      console.log('🚀 Changes published successfully');
    } catch (error) {
      console.error('❌ Publish failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2">
      {/* Edit Toggle */}
      <Button
        variant={isEditing ? "default" : "outline"}
        size="sm"
        onClick={toggleEditing}
        className={cn(
          "flex items-center gap-2 font-medium transition-all",
          isEditing && "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        <Edit3 className="h-4 w-4" />
        {isEditing ? 'Exit Edit' : 'Edit Page'}
      </Button>

      {/* Preview Toggle */}
      <Button
        variant={isPreviewing ? "default" : "outline"}
        size="sm"
        onClick={togglePreviewing}
        className={cn(
          "flex items-center gap-2 font-medium transition-all",
          isPreviewing && "bg-green-600 hover:bg-green-700 text-white"
        )}
      >
        <Eye className="h-4 w-4" />
        {isPreviewing ? 'Exit Preview' : 'Preview'}
      </Button>

      {/* Save Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSave}
        disabled={isSaving || (!isEditing && !isPreviewing)}
        className="flex items-center gap-2 font-medium hover:bg-yellow-50 hover:border-yellow-300 transition-all"
      >
        <Save className={cn("h-4 w-4", isSaving && "animate-spin")} />
        {isSaving ? 'Saving...' : 'Save'}
      </Button>

      {/* Publish Button */}
      <Button
        variant="default"
        size="sm"
        onClick={handlePublish}
        disabled={isPublishing}
        className="flex items-center gap-2 font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all"
      >
        <Upload className={cn("h-4 w-4", isPublishing && "animate-spin")} />
        {isPublishing ? 'Publishing...' : 'Publish'}
      </Button>

      {/* Admin Mode */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAdminMode(true)}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 transition-all font-medium"
      >
        <Wand2 className="h-4 w-4" />
        <span className="hidden md:inline">Admin</span>
      </Button>

      {/* Settings */}
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Status Indicator */}
      <div className="ml-2 pl-2 border-l border-gray-200">
        <div className={cn(
          "w-2 h-2 rounded-full transition-all",
          isEditing ? "bg-blue-500 animate-pulse" : 
          isPreviewing ? "bg-green-500" : "bg-gray-400"
        )} />
      </div>
      
      {/* Admin Mode Modal */}
      <AdminMode 
        isOpen={showAdminMode} 
        onClose={() => setShowAdminMode(false)} 
      />
    </div>
  );
};

export default EditorToolbar;