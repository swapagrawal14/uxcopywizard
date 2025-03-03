
import React, { useState } from 'react';
import { Copy, Check, BookmarkPlus, BookmarkCheck, RefreshCw } from 'lucide-react';
import { CopyResult } from '@/types';
import { formatTimestamp } from '@/utils/copyUtils';
import { toast } from '@/components/ui/use-toast';

interface ResultCardProps {
  result: CopyResult;
  isSaved: boolean;
  onSave: () => void;
  onRegenerate?: () => void;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  isSaved, 
  onSave, 
  onRegenerate, 
  className = "" 
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  return (
    <div className={`rounded-lg border border-border bg-card p-5 shadow-subtle ${className} animate-slide-up`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
              {result.tone.charAt(0).toUpperCase() + result.tone.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(result.timestamp)}
            </span>
          </div>
          <h3 className="font-medium mt-1 text-sm sm:text-base">{result.context}</h3>
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              className="p-1.5 rounded-md hover:bg-secondary transition-colors"
              aria-label="Regenerate copy"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <button 
            onClick={onSave} 
            className={`p-1.5 rounded-md transition-colors ${isSaved ? 'text-primary' : 'hover:bg-secondary'}`}
            aria-label={isSaved ? "Saved" : "Save copy"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <BookmarkPlus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Microcopy section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Microcopy Variations</h4>
            <button 
              onClick={() => copyToClipboard(result.copy.microcopy.join('\n\n'), 'microcopy')}
              className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm"
            >
              {copiedSection === 'microcopy' ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy all
                </>
              )}
            </button>
          </div>
          <div className="space-y-2">
            {result.copy.microcopy.map((text, i) => (
              <div key={i} className="relative group">
                <div className="p-3 rounded-md bg-secondary/50 text-sm">
                  {text}
                </div>
                <button
                  onClick={() => copyToClipboard(text, `microcopy-${i}`)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-background"
                >
                  {copiedSection === `microcopy-${i}` ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Button text section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Button Text Options</h4>
            <button 
              onClick={() => copyToClipboard(result.copy.buttonText.join(', '), 'buttons')}
              className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm"
            >
              {copiedSection === 'buttons' ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy all
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.copy.buttonText.map((text, i) => (
              <div key={i} className="relative group">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm"
                  disabled
                >
                  {text}
                </button>
                <button
                  onClick={() => copyToClipboard(text, `button-${i}`)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-background border border-border"
                >
                  {copiedSection === `button-${i}` ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Error messages section */}
        {result.copy.errorMessages && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Error Messages</h4>
              <button 
                onClick={() => copyToClipboard(result.copy.errorMessages!.join('\n\n'), 'errors')}
                className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm"
              >
                {copiedSection === 'errors' ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy all
                  </>
                )}
              </button>
            </div>
            <div className="space-y-2">
              {result.copy.errorMessages.map((text, i) => (
                <div key={i} className="relative group">
                  <div className="p-3 rounded-md bg-destructive/10 text-sm border-l-2 border-destructive">
                    {text}
                  </div>
                  <button
                    onClick={() => copyToClipboard(text, `error-${i}`)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-background"
                  >
                    {copiedSection === `error-${i}` ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
