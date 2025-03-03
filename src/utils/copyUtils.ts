
import { CopyResult, ToneType } from "@/types";

// Generate a unique ID for saved copies
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Mock AI response generator - in a real app, this would be replaced with an actual API call
export const generateCopyForContext = (context: string, tone: ToneType): Promise<CopyResult> => {
  // This is just a simulation of an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const result: CopyResult = {
        id: generateId(),
        context,
        tone,
        timestamp: Date.now(),
        copy: {
          microcopy: generateMicrocopy(context, tone),
          buttonText: generateButtonText(context, tone),
          errorMessages: generateErrorMessages(context),
        }
      };
      
      resolve(result);
    }, 1200); // Simulate API delay
  });
};

// Local storage functions
export const saveCopyResult = (result: CopyResult): void => {
  const savedCopies = getSavedCopies();
  const updatedCopies = [result, ...savedCopies].slice(0, 50); // Keep only the last 50 items
  localStorage.setItem('savedCopies', JSON.stringify(updatedCopies));
};

export const getSavedCopies = (): CopyResult[] => {
  const saved = localStorage.getItem('savedCopies');
  return saved ? JSON.parse(saved) : [];
};

export const deleteSavedCopy = (id: string): void => {
  const savedCopies = getSavedCopies();
  const filteredCopies = savedCopies.filter(copy => copy.id !== id);
  localStorage.setItem('savedCopies', JSON.stringify(filteredCopies));
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Generate tone-specific copy (these would be replaced with actual AI responses)
const generateMicrocopy = (context: string, tone: ToneType): string[] => {
  // This is just placeholder content that simulates different tones
  const contextLower = context.toLowerCase();
  
  if (contextLower.includes('signup') || contextLower.includes('sign up')) {
    switch(tone) {
      case 'friendly':
        return [
          "Join our community today!",
          "We're excited to have you join us",
          "Create your account and get started"
        ];
      case 'professional':
        return [
          "Complete registration to access your account",
          "Register for full platform access",
          "Create your professional profile"
        ];
      case 'playful':
        return [
          "Jump in and join the fun!",
          "Let's get this party started!",
          "Your adventure begins with signup"
        ];
      case 'formal':
        return [
          "Proceed with account registration",
          "Initiate your membership application",
          "Establish your credentials"
        ];
      case 'casual':
        return [
          "Get started in a few clicks",
          "Quick signup, big possibilities",
          "Join us — it only takes a minute"
        ];
      case 'concise':
        return [
          "Create account",
          "Sign up now",
          "Register here"
        ];
      case 'enthusiastic':
        return [
          "Can't wait for you to join us!",
          "You're going to love being a member!",
          "Get ready for an amazing experience!"
        ];
      case 'technical':
        return [
          "Initialize user credentials",
          "Configure account parameters",
          "Establish secure authentication"
        ];
      default:
        return [
          "Sign up for an account",
          "Create your profile",
          "Register to get started"
        ];
    }
  } else if (contextLower.includes('checkout') || contextLower.includes('payment')) {
    // Different copy for checkout forms
    switch(tone) {
      case 'friendly':
        return [
          "Let's complete your purchase",
          "Almost done with your order!",
          "Just a few details to finalize"
        ];
      case 'professional':
        return [
          "Complete your transaction",
          "Finalize purchase details",
          "Secure checkout process"
        ];
      default:
        return [
          "Complete your order",
          "Finalize payment details",
          "Proceed to payment"
        ];
    }
  } else {
    // Generic responses
    switch(tone) {
      case 'friendly':
        return [
          "We're here to help you",
          "Let's get started together",
          "Simple steps to get you going"
        ];
      case 'professional':
        return [
          "Complete the following information",
          "Please provide the requested details",
          "Enter your information below"
        ];
      default:
        return [
          "Enter your details",
          "Complete the form",
          "Fill in the information"
        ];
    }
  }
};

const generateButtonText = (context: string, tone: ToneType): string[] => {
  const contextLower = context.toLowerCase();
  
  if (contextLower.includes('signup') || contextLower.includes('sign up')) {
    switch(tone) {
      case 'friendly':
        return ["Join Now", "Sign Me Up", "Get Started"];
      case 'professional':
        return ["Complete Registration", "Create Account", "Proceed"];
      case 'playful':
        return ["Let's Go!", "Jump In", "I'm In!"];
      case 'formal':
        return ["Submit Application", "Register Account", "Proceed"];
      case 'casual':
        return ["Count Me In", "I'm Ready", "Let's Do This"];
      case 'concise':
        return ["Sign Up", "Join", "Start"];
      case 'enthusiastic':
        return ["Yes, Sign Me Up!", "Can't Wait!", "Let's Begin!"];
      case 'technical':
        return ["Initialize Account", "Submit Credentials", "Process Registration"];
      default:
        return ["Sign Up", "Create Account", "Register"];
    }
  } else if (contextLower.includes('checkout') || contextLower.includes('payment')) {
    switch(tone) {
      case 'friendly':
        return ["Complete Order", "Finish Up", "Place Order"];
      case 'professional':
        return ["Process Payment", "Confirm Purchase", "Complete Transaction"];
      default:
        return ["Pay Now", "Checkout", "Complete Order"];
    }
  } else {
    switch(tone) {
      case 'friendly':
        return ["Continue", "Go Ahead", "Next Step"];
      case 'professional':
        return ["Submit", "Proceed", "Continue"];
      default:
        return ["Submit", "Continue", "Next"];
    }
  }
};

const generateErrorMessages = (context: string): string[] => {
  const contextLower = context.toLowerCase();
  
  if (contextLower.includes('signup') || contextLower.includes('sign up')) {
    return [
      "Please enter a valid email address",
      "Password must be at least 8 characters long",
      "This email is already registered",
      "Please complete all required fields"
    ];
  } else if (contextLower.includes('checkout') || contextLower.includes('payment')) {
    return [
      "Please enter a valid card number",
      "The expiration date you entered is invalid",
      "Your payment couldn't be processed",
      "Please ensure billing address matches your card"
    ];
  } else {
    return [
      "Please complete this required field",
      "Please enter a valid value",
      "Something went wrong, please try again",
      "Please check your information and try again"
    ];
  }
};

export const getToneOptions = (): { value: ToneType, label: string, description: string }[] => {
  return [
    { 
      value: 'friendly', 
      label: 'Friendly', 
      description: 'Warm and welcoming tone that builds rapport'
    },
    { 
      value: 'professional', 
      label: 'Professional', 
      description: 'Polished, businesslike, and trustworthy'
    },
    { 
      value: 'playful', 
      label: 'Playful', 
      description: 'Fun, light-hearted, and engaging'
    },
    { 
      value: 'formal', 
      label: 'Formal', 
      description: 'Traditional, respectful, and proper'
    },
    { 
      value: 'casual', 
      label: 'Casual', 
      description: 'Relaxed, conversational, and approachable'
    },
    { 
      value: 'concise', 
      label: 'Concise', 
      description: 'Brief, clear, and to the point'
    },
    { 
      value: 'enthusiastic', 
      label: 'Enthusiastic', 
      description: 'Excited, passionate, and energetic'
    },
    { 
      value: 'technical', 
      label: 'Technical', 
      description: 'Precise, specialized language for technical audiences'
    }
  ];
};
