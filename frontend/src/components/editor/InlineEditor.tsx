import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEditor } from '@/contexts/EditorContext';

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

    if (localValue !== value) {
      onSave(localValue);
      setHasChanges(true);
      
      // Auto-save changes
      try {
        await saveChanges();
        console.log('✅ Inline edit saved and published');
      } catch (error) {
        console.error('❌ Error saving inline edit:', error);
      }
    }
    
    setIsLocalEditing(false);
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

  const handleBlur = () => {
    // Small delay to allow for clicking save button
    setTimeout(() => {
      if (isLocalEditing) {
        handleSave();
      }
    }, 150);
  };

  if (!isEditing) {
    return (
      <span className={cn(className, hasChanges && "bg-green-100 border border-green-300 rounded px-1")}>
        {value || placeholder}
      </span>
    );
  }

  if (isLocalEditing) {
    const Component = multiline ? 'textarea' : 'input';
    
    return (
      <div className="relative inline-block">
        <Component
          ref={inputRef as any}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          className={cn(
            "border border-blue-500 rounded px-2 py-1 bg-white text-black min-w-[100px]",
            multiline && "min-h-[60px] resize-vertical",
            editClassName
          )}
          style={{
            width: multiline ? '300px' : `${Math.max(localValue.length * 8 + 40, 120)}px`
          }}
        />
        <div className="absolute top-full left-0 mt-1 flex gap-1 z-50">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors"
          >
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
        "cursor-pointer hover:bg-blue-100 hover:border hover:border-blue-300 rounded px-1 transition-colors",
        hasChanges && "bg-green-100 border border-green-300"
      )}
      title="Click to edit"
    >
      {value || placeholder}
    </span>
  );
};

export default InlineEditor;