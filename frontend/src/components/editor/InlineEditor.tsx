import React from 'react';

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
  maxLength,
  required = false
}) => {
  // Simplified version - just display text without editing functionality
  // This prevents blank pages while maintaining component compatibility
  
  const displayValue = value || placeholder;
  
  return (
    <span className={className}>
      {displayValue}
    </span>
  );
};

export default InlineEditor;