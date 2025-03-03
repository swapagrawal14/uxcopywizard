
export type ToneType = 
  | 'friendly' 
  | 'professional' 
  | 'playful' 
  | 'formal' 
  | 'casual' 
  | 'concise' 
  | 'enthusiastic' 
  | 'technical';

export type TabType = 'generate' | 'result' | 'saved';

export interface CopyResult {
  id: string;
  context: string;
  tone: ToneType;
  timestamp: number;
  brandGuidelines?: string;
  userId?: string; // Add userId field to track which user created this copy
  copy: {
    headline?: string;
    microcopy: string[];
    buttonText: string[];
    errorMessages?: string[];
  };
}

export interface ToneOption {
  value: ToneType;
  label: string;
  description: string;
}

export interface EditableField {
  id: string;
  type: 'microcopy' | 'button' | 'error';
  index: number;
  text: string;
  originalText: string;
}
