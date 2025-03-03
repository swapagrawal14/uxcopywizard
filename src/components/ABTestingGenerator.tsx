
import React, { useState } from 'react';
import { SplitSquareVertical, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { CopyResult, ToneType } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { generateCopyForContext } from '@/utils/copyUtils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ABTestingGeneratorProps {
  currentResult: CopyResult;
  onNewResultGenerated: (result: CopyResult) => void;
}

const ABTestingGenerator: React.FC<ABTestingGeneratorProps> = ({ 
  currentResult, 
  onNewResultGenerated 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [testName, setTestName] = useState('A/B Test');
  const [variationCount, setVariationCount] = useState(1);
  const [toneBias, setToneBias] = useState(50);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const tones: ToneType[] = ['friendly', 'professional', 'playful', 'formal', 'casual', 'concise', 'enthusiastic', 'technical'];
      // Pick a random tone that's different from current for A/B testing
      const filteredTones = tones.filter(t => t !== currentResult.tone);
      const randomTone = filteredTones[Math.floor(Math.random() * filteredTones.length)];
      
      // Slightly modify the context to generate different copy
      let testContext = currentResult.context;
      if (toneBias < 40) {
        testContext = `${testContext} (more persuasive)`;
      } else if (toneBias > 60) {
        testContext = `${testContext} (more informative)`;
      }
      
      const newResult = await generateCopyForContext(testContext, randomTone);
      
      // Add test name to differentiate from original
      newResult.context = `${testName} - ${newResult.context}`;
      
      onNewResultGenerated(newResult);
      
      toast({
        title: "A/B Test Generated",
        description: `Created a new variation using ${randomTone} tone`,
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your A/B test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <SplitSquareVertical className="h-4 w-4" />
          <span>Create A/B Test</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate A/B Test Variation</DialogTitle>
          <DialogDescription>
            Create an alternative version of your copy to test different approaches.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="test-name" className="text-sm font-medium col-span-1">
              Test Name
            </label>
            <Input
              id="test-name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="tone-bias" className="text-sm font-medium">
                Copy Style
              </label>
              <span className="text-xs text-muted-foreground">
                {toneBias < 40 ? 'More Persuasive' : toneBias > 60 ? 'More Informative' : 'Balanced'}
              </span>
            </div>
            <Slider
              id="tone-bias"
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => setToneBias(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Persuasive</span>
              <span>Balanced</span>
              <span>Informative</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating} 
            className="w-full flex items-center gap-1.5"
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                <span>Generate Test Variation</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ABTestingGenerator;
