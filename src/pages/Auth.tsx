
import React from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'sign-in';

  // Redirect to home if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              {mode === 'sign-up' ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === 'sign-up' 
                ? 'Sign up to save your UX copy and access it from anywhere' 
                : 'Sign in to access your saved UX copy'}
            </p>
          </div>
          
          <div className="mt-8">
            {mode === 'sign-up' ? (
              <SignUp 
                routing="path" 
                path="/auth" 
                signInUrl="/auth?mode=sign-in"
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      'bg-primary hover:bg-primary/90 text-primary-foreground',
                    card: 'bg-background border border-border shadow-subtle',
                    headerTitle: 'text-foreground',
                    headerSubtitle: 'text-muted-foreground',
                    formFieldLabel: 'text-foreground',
                    formFieldInput: 'bg-background border-input',
                    dividerText: 'text-muted-foreground',
                    footerActionText: 'text-muted-foreground',
                    footerActionLink: 'text-primary hover:text-primary/90',
                  }
                }}
              />
            ) : (
              <SignIn 
                routing="path" 
                path="/auth" 
                signUpUrl="/auth?mode=sign-up"
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      'bg-primary hover:bg-primary/90 text-primary-foreground',
                    card: 'bg-background border border-border shadow-subtle',
                    headerTitle: 'text-foreground',
                    headerSubtitle: 'text-muted-foreground',
                    formFieldLabel: 'text-foreground',
                    formFieldInput: 'bg-background border-input',
                    dividerText: 'text-muted-foreground',
                    footerActionText: 'text-muted-foreground',
                    footerActionLink: 'text-primary hover:text-primary/90',
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
