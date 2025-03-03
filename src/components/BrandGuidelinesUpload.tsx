
import React, { useState } from 'react';
import { FileUp, X, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface BrandGuidelinesUploadProps {
  value: string;
  onChange: (guidelines: string) => void;
}

const BrandGuidelinesUpload: React.FC<BrandGuidelinesUploadProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBrandGuidelines, setHasBrandGuidelines] = useState(!!value);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const content = event.target.result.toString();
        onChange(content);
        setHasBrandGuidelines(true);
      }
    };
    reader.readAsText(file);
  };

  const clearGuidelines = () => {
    onChange('');
    setHasBrandGuidelines(false);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md p-3 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <FileUp className="h-4 w-4 mr-2" />
              <span>Brand Guidelines</span>
              {hasBrandGuidelines && <Check className="h-3 w-3 ml-1 text-green-500" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        {hasBrandGuidelines && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearGuidelines}
            className="h-6 w-6 p-0 rounded-full"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Clear guidelines</span>
          </Button>
        )}
      </div>
      <CollapsibleContent className="mt-3 space-y-3">
        <p className="text-xs text-muted-foreground">
          Upload your brand guidelines or paste text directly. 
          The AI will adapt the generated copy to follow your brand's voice and style.
        </p>
        <div className="grid gap-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="border border-dashed border-muted-foreground/50 rounded-md p-4 text-center hover:bg-secondary/50 transition-colors">
              <FileUp className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-sm">Upload a text file (.txt)</span>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>
          <div className="text-xs text-center text-muted-foreground">or paste directly</div>
          <Textarea
            placeholder="Enter your brand guidelines here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BrandGuidelinesUpload;
