export interface Resolution {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  progress: number;
  target: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface ProgressLog {
  id: string;
  resolutionId: string;
  date: Date;
  completed: boolean;
  notes?: string;
}