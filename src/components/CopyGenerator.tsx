
import React, { useState } from 'react';
import { Sparkles, FileText, HistoryIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ToneSelector from './ToneSelector';
import ResultCard from './ResultCard';
import SavedCopyList from './SavedCopyList';
import BrandGuidelinesUpload from './BrandGuidelinesUpload';
import { CopyResult, ToneType } from '@/types';
import { generateCopyForContext, saveCopyResult, getSavedCopies } from '@/utils/copyUtils';
import { toast } from '@/components/ui/use-toast';

const CopyGenerator: React.FC = () => {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<ToneType>('friendly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CopyResult | null>(null);
  const [savedCopies, setSavedCopies] = useState<CopyResult[]>(getSavedCopies());
  const [activeTab, setActiveTab] = useState('generate');
  const [isSaved, setIsSaved] = useState(false);
  const [brandGuidelines, setBrandGuidelines] = useState('');
  const [abTestResults, setAbTestResults] = useState<CopyResult[]>([]);

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the UI component you need copy for.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setIsSaved(false);
    
    try {
      // Include brand guidelines in generation if provided
      const contextWithGuidelines = brandGuidelines 
        ? `${context.trim()} - Guidelines: ${brandGuidelines.substring(0, 300)}` 
        : context.trim();
        
      const generatedResult = await generateCopyForContext(contextWithGuidelines, tone);
      
      // Add brand guidelines to result for future reference
      if (brandGuidelines) {
        generatedResult.brandGuidelines = brandGuidelines;
      }
      
      setResult(generatedResult);
      setActiveTab('result');
      setAbTestResults([]);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your copy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (result) {
      saveCopyResult(result);
      setSavedCopies(getSavedCopies());
      setIsSaved(true);
      
      toast({
        title: "Saved successfully",
        description: "Your copy has been saved to your history.",
      });
    }
  };

  const handleSelectSaved = (copy: CopyResult) => {
    setResult(copy);
    setContext(copy.context);
    setTone(copy.tone);
    setBrandGuidelines(copy.brandGuidelines || '');
    setIsSaved(true);
    setActiveTab('result');
    setAbTestResults([]);
  };

  const handleNewAbTestResult = (abTestResult: CopyResult) => {
    setAbTestResults([...abTestResults, abTestResult]);
  };

  const refreshSavedCopies = () => {
    setSavedCopies(getSavedCopies());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="generate" className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Generate</span>
          </TabsTrigger>
          <TabsTrigger value="result" className="flex items-center gap-1.5" disabled={!result}>
            <FileText className="h-4 w-4" />
            <span>Result</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-1.5">
            <HistoryIcon className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Describe your UI component</h2>
              <span className="text-xs text-muted-foreground">
                {context.length}/250 characters
              </span>
            </div>
            <Textarea
              placeholder="Example: Signup form for a design tool, Newsletter subscription form, etc."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              maxLength={250}
              className="resize-none h-24"
            />
          </div>

          <BrandGuidelinesUpload 
            value={brandGuidelines}
            onChange={setBrandGuidelines}
          />

          <ToneSelector selectedTone={tone} onChange={setTone} />

          <div className="flex items-center gap-2">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !context.trim()} 
              className="ml-auto flex items-center gap-1.5"
            >
              {isGenerating ? "Generating..." : "Generate UX Copy"}
              {!isGenerating && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="result" className="space-y-6 animate-fade-in">
          {result && (
            <>
              <ResultCard 
                result={result} 
                isSaved={isSaved} 
                onSave={handleSave} 
                onRegenerate={handleGenerate}
                onNewResultGenerated={handleNewAbTestResult}
              />
              
              {abTestResults.map((abTestResult, index) => (
                <ResultCard 
                  key={`abtest-${index}-${abTestResult.id}`}
                  result={abTestResult} 
                  isSaved={false} 
                  onSave={() => {
                    saveCopyResult(abTestResult);
                    setSavedCopies(getSavedCopies());
                    toast({
                      title: "A/B Test Saved",
                      description: "Your test variation has been saved to your history.",
                    });
                  }}
                  className="border-l-4 border-primary"
                />
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6 animate-fade-in">
          <h2 className="text-lg font-medium">Saved Copy</h2>
          <SavedCopyList 
            savedCopies={savedCopies} 
            onSelect={handleSelectSaved} 
            onUpdate={refreshSavedCopies} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CopyGenerator;
