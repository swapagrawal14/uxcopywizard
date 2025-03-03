
import React from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { ToneType } from '@/types';
import { getToneOptions } from '@/utils/copyUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onChange: (tone: ToneType) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onChange }) => {
  const toneOptions = getToneOptions();

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Tone of Voice</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Select the tone for your copy. This will influence the style and personality of the generated text.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-xs text-muted-foreground">
          {toneOptions.find(t => t.value === selectedTone)?.description}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {toneOptions.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onChange(tone.value)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              flex items-center justify-between
              ${selectedTone === tone.value 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }
            `}
          >
            {tone.label}
            {selectedTone === tone.value && (
              <Check className="h-4 w-4 ml-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
