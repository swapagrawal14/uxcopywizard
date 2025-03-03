
import React, { useState } from 'react';
import { Copy, Check, BookmarkPlus, BookmarkCheck, RefreshCw } from 'lucide-react';
import { CopyResult } from '@/types';
import { formatTimestamp } from '@/utils/copyUtils';
import { toast } from '@/components/ui/use-toast';
import EditableText from './EditableText';
import ExportOptions from './ExportOptions';
import ABTestingGenerator from './ABTestingGenerator';

interface ResultCardProps {
  result: CopyResult;
  isSaved: boolean;
  onSave: () => void;
  onRegenerate?: () => void;
  onNewResultGenerated?: (result: CopyResult) => void;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  isSaved, 
  onSave, 
  onRegenerate, 
  onNewResultGenerated,
  className = "" 
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [localResult, setLocalResult] = useState<CopyResult>(result);

  // Update localResult when result prop changes
  React.useEffect(() => {
    setLocalResult(result);
  }, [result]);

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

  const handleUpdateMicrocopy = (text: string, index: number) => {
    const updatedMicrocopy = [...localResult.copy.microcopy];
    updatedMicrocopy[index] = text;
    
    setLocalResult({
      ...localResult,
      copy: {
        ...localResult.copy,
        microcopy: updatedMicrocopy,
      }
    });
  };

  const handleUpdateButton = (text: string, index: number) => {
    const updatedButtons = [...localResult.copy.buttonText];
    updatedButtons[index] = text;
    
    setLocalResult({
      ...localResult,
      copy: {
        ...localResult.copy,
        buttonText: updatedButtons,
      }
    });
  };

  const handleUpdateError = (text: string, index: number) => {
    if (!localResult.copy.errorMessages) return;
    
    const updatedErrors = [...localResult.copy.errorMessages];
    updatedErrors[index] = text;
    
    setLocalResult({
      ...localResult,
      copy: {
        ...localResult.copy,
        errorMessages: updatedErrors,
      }
    });
  };

  return (
    <div className={`rounded-lg border border-border bg-card p-5 shadow-subtle ${className} animate-slide-up`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
              {localResult.tone.charAt(0).toUpperCase() + localResult.tone.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(localResult.timestamp)}
            </span>
          </div>
          <h3 className="font-medium mt-1 text-sm sm:text-base">{localResult.context}</h3>
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
              onClick={() => copyToClipboard(localResult.copy.microcopy.join('\n\n'), 'microcopy')}
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
            {localResult.copy.microcopy.map((text, i) => (
              <EditableText
                key={i}
                text={text}
                onSave={(newText) => handleUpdateMicrocopy(newText, i)}
                className="relative group"
                textClassName="p-3 rounded-md bg-secondary/50 text-sm"
              />
            ))}
          </div>
        </div>

        {/* Button text section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Button Text Options</h4>
            <button 
              onClick={() => copyToClipboard(localResult.copy.buttonText.join(', '), 'buttons')}
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
            {localResult.copy.buttonText.map((text, i) => (
              <div key={i} className="relative group">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm"
                  disabled
                >
                  {text}
                </button>
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-card rounded-md shadow-md p-2 flex gap-1 border border-border">
                    <button
                      onClick={() => copyToClipboard(text, `button-${i}`)}
                      className="p-1 rounded-full hover:bg-secondary"
                    >
                      {copiedSection === `button-${i}` ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error messages section */}
        {localResult.copy.errorMessages && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Error Messages</h4>
              <button 
                onClick={() => copyToClipboard(localResult.copy.errorMessages!.join('\n\n'), 'errors')}
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
              {localResult.copy.errorMessages.map((text, i) => (
                <EditableText
                  key={i}
                  text={text}
                  onSave={(newText) => handleUpdateError(newText, i)}
                  className="relative group"
                  textClassName="p-3 rounded-md bg-destructive/10 text-sm border-l-2 border-destructive"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <ExportOptions result={localResult} />
        {onNewResultGenerated && (
          <ABTestingGenerator 
            currentResult={localResult} 
            onNewResultGenerated={onNewResultGenerated} 
          />
        )}
      </div>
    </div>
  );
};

export default ResultCard;
