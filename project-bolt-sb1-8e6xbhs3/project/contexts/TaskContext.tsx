import { createContext, useContext } from 'react';
import { useTasks } from '@/hooks/useTasks';

const TaskContext = createContext<ReturnType<typeof useTasks> | null>(null);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const taskMethods = useTasks();

  return (
    <TaskContext.Provider value={taskMethods}>
      {children}
    </TaskContext.Provider>
  );
}