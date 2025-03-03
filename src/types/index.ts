
export type ToneType = 
  | 'friendly' 
  | 'professional' 
  | 'playful' 
  | 'formal' 
  | 'casual' 
  | 'concise' 
  | 'enthusiastic' 
  | 'technical';

export interface CopyResult {
  id: string;
  context: string;
  tone: ToneType;
  timestamp: number;
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
