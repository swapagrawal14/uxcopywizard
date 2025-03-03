
import React from 'react';
import { PenLine } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 flex items-center justify-between border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-10 animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <PenLine className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-medium tracking-tight">UX Copywriter</h1>
          <p className="text-sm text-muted-foreground">AI-powered microcopy assistant</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
        >
          Docs
        </a>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-xs font-medium">AI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
