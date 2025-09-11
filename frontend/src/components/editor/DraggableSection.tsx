import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditor } from "@/contexts/EditorContext";
import { Button } from "@/components/ui/button";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const DraggableSection = ({ id, children, className }: DraggableSectionProps) => {
  const { isEditing, sections, toggleSectionVisibility } = useEditor();
  
  const section = sections.find(s => s.id === id);
  const isVisible = section?.visible ?? true;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isEditing) {
    return isVisible ? (
      <div className={className}>
        {children}
      </div>
    ) : null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        className,
        isDragging && "opacity-50 z-50",
        !isVisible && "opacity-30 pointer-events-none"
      )}
    >
      {/* Edit Overlay */}
      <div className="absolute inset-0 border-2 border-dashed border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Section Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 z-10">
        <Button
          onClick={() => toggleSectionVisibility(id)}
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0"
        >
          {isVisible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
      >
        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
          <GripVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Section Label */}
      <div className="absolute top-2 left-12 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded capitalize">
          {section?.type || id}
        </div>
      </div>

      {children}
    </div>
  );
};

export default DraggableSection;