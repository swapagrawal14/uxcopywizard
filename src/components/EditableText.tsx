
import React, { useState, useEffect } from 'react';
import { Check, X, Pencil } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EditableTextProps {
  text: string;
  onSave: (text: string) => void;
  className?: string;
  textClassName?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  text, 
  onSave, 
  className = "", 
  textClassName = "" 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleSave = () => {
    onSave(editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`relative ${className}`}>
        <Textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="min-h-[100px] pr-16"
          autoFocus
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-6 w-6 p-0 rounded-full bg-destructive/10 hover:bg-destructive/20"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Cancel</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-6 w-6 p-0 rounded-full bg-primary/10 hover:bg-primary/20"
          >
            <Check className="h-3 w-3" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div className={textClassName}>
        {text}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-background"
      >
        <Pencil className="h-3 w-3" />
        <span className="sr-only">Edit</span>
      </button>
    </div>
  );
};

export default EditableText;
