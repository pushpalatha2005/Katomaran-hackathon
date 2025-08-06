export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  date: Date;
  time?: string;
  reminder?: Date;
  notes?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}