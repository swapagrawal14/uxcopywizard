
import React from 'react';
import Header from '@/components/Header';
import CopyGenerator from '@/components/CopyGenerator';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
              AI-Powered UX Copywriter
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate clear, engaging, and conversion-friendly UX copy for your interfaces.
              Adapt to different tones and contexts with AI assistance.
            </p>
          </div>
          
          <CopyGenerator />
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} UX Copywriter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
