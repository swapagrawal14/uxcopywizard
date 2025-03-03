
import React, { useState } from 'react';
import { Download, Copy, FileJson, FileText, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyResult } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

interface ExportOptionsProps {
  result: CopyResult;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ result }) => {
  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ux-copy-${result.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Exported as JSON",
      description: "Your copy has been exported as a JSON file.",
    });
  };

  const exportAsText = () => {
    let content = `# UX Copy for: ${result.context}\n`;
    content += `Tone: ${result.tone}\n\n`;
    
    content += "## Microcopy\n";
    result.copy.microcopy.forEach((text, i) => {
      content += `${i + 1}. ${text}\n`;
    });
    
    content += "\n## Button Text\n";
    result.copy.buttonText.forEach((text, i) => {
      content += `${i + 1}. ${text}\n`;
    });
    
    if (result.copy.errorMessages) {
      content += "\n## Error Messages\n";
      result.copy.errorMessages.forEach((text, i) => {
        content += `${i + 1}. ${text}\n`;
      });
    }
    
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ux-copy-${result.id}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Exported as Text",
      description: "Your copy has been exported as a text file.",
    });
  };

  const copyFigmaFormat = () => {
    let content = `// UX Copy for: ${result.context}\n`;
    content += `// Tone: ${result.tone}\n\n`;
    
    content += "// Microcopy\n";
    result.copy.microcopy.forEach((text, i) => {
      content += `const microcopy${i + 1} = "${text.replace(/"/g, '\\"')}";\n`;
    });
    
    content += "\n// Button Text\n";
    result.copy.buttonText.forEach((text, i) => {
      content += `const button${i + 1} = "${text.replace(/"/g, '\\"')}";\n`;
    });
    
    if (result.copy.errorMessages) {
      content += "\n// Error Messages\n";
      result.copy.errorMessages.forEach((text, i) => {
        content += `const error${i + 1} = "${text.replace(/"/g, '\\"')}";\n`;
      });
    }
    
    navigator.clipboard.writeText(content);
    
    toast({
      title: "Copied for Figma",
      description: "Your copy has been formatted for Figma and copied to clipboard.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAsJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          <span>Export as JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsText}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Export as Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyFigmaFormat}>
          <Figma className="h-4 w-4 mr-2" />
          <span>Copy for Figma</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
