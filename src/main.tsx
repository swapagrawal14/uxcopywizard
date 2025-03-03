
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Use both possible environment variable formats
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                        import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
                        "pk_test_aHVtYmxlLXBlbmd1aW4tNzYuY2xlcmsuYWNjb3VudHMuZGV2JA"; // Add fallback with the provided key

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
