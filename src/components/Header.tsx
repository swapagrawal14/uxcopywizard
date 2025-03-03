
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="border-b border-border bg-white">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-medium">UX Copywriter</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Link to="/saved" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                My History
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-9 w-9',
                  }
                }}
              />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Get Started
                </Button>
              </SignInButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
