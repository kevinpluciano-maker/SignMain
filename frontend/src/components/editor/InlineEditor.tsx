import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEditor } from '@/contexts/EditorContext';
import { Check, X, Edit3 } from 'lucide-react';

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  className?: string;
  editClassName?: string;
  multiline?: boolean;
  maxLength?: number;
  required?: boolean;
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  value,
  onSave,
  placeholder = "Click to edit",
  className = "",
  editClassName = "",
  multiline = false,
  maxLength = 500,
  required = false
}) => {
  const { isEditing, saveChanges } = useEditor();
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isLocalEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isLocalEditing]);

  const handleClick = () => {
    if (isEditing) {
      setIsLocalEditing(true);
    }
  };

  const handleSave = async () => {
    if (required && !localValue.trim()) {
      alert('This field is required');
      return;
    }

    setIsSaving(true);
    
    try {
      if (localValue !== value) {
        onSave(localValue);
        setHasChanges(true);
        
        // Auto-save changes with visual feedback
        await saveChanges();
        
        // Show success notification
        showNotification('✅ Saved successfully!', 'success');
        console.log('✅ Inline edit saved and published');
      }
    } catch (error) {
      console.error('❌ Error saving inline edit:', error);
      showNotification('❌ Save failed', 'error');
    } finally {
      setIsSaving(false);
      setIsLocalEditing(false);
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsLocalEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
      `;
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 10);
      
      // Animate out and remove
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 2500);
    }
  };

  if (!isEditing) {
    return (
      <span className={cn(
        className, 
        hasChanges && "bg-green-100 border border-green-300 rounded px-1 relative",
        hasChanges && "after:content-['✓'] after:absolute after:-top-1 after:-right-1 after:bg-green-500 after:text-white after:text-xs after:rounded-full after:w-4 after:h-4 after:flex after:items-center after:justify-center"
      )}>
        {value || placeholder}
      </span>
    );
  }

  if (isLocalEditing) {
    const Component = multiline ? 'textarea' : 'input';
    
    return (
      <div className="relative inline-block group">
        <Component
          ref={inputRef as any}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={isSaving}
          className={cn(
            "border-2 border-blue-500 rounded-md px-3 py-2 bg-white text-black min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-600 transition-all",
            multiline && "min-h-[80px] resize-vertical",
            isSaving && "opacity-50 cursor-not-allowed",
            editClassName
          )}
          style={{
            width: multiline ? '320px' : `${Math.max(localValue.length * 9 + 60, 140)}px`
          }}
        />
        
        {/* Action Buttons */}
        <div className="absolute top-full left-0 mt-2 flex gap-2 z-50 bg-white rounded-lg shadow-lg border p-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-all",
              isSaving && "opacity-50 cursor-not-allowed"
            )}
          >
            <Check className="h-3 w-3" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-all"
          >
            <X className="h-3 w-3" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        className,
        "cursor-pointer hover:bg-blue-50 hover:border hover:border-blue-300 rounded-md px-2 py-1 transition-all relative group",
        hasChanges && "bg-green-50 border border-green-300",
        "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dashed before:border-blue-400 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      )}
      title="Click to edit this text"
    >
      {value || placeholder}
      <Edit3 className="inline ml-1 h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </span>
  );
};

export default InlineEditor;