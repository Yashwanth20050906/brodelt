
export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  fitnessLevel: string;
  healthIssues: string;
  message: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export type FitnessGoal = 'weightLoss' | 'muscleGain' | 'toning' | 'endurance' | 'flexibility' | 'overall';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
