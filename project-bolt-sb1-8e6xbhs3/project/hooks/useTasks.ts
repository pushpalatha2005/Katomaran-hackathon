import { useState, useEffect } from 'react';
import { Task } from '@/types';

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Email Report',
    description: 'Send weekly project report to team',
    completed: false,
    category: 'Work',
    priority: 'high',
    date: new Date(),
    time: '09:00 AM',
  },
  {
    id: 2,
    title: 'Gym Workout',
    description: 'Upper body strength training',
    completed: true,
    category: 'Personal',
    priority: 'medium',
    date: new Date(),
    time: '05:30 PM',
  },
  {
    id: 3,
    title: 'Read Book',
    description: 'Continue reading "Atomic Habits"',
    completed: false,
    category: 'Personal',
    priority: 'low',
    date: new Date(),
  },
  {
    id: 4,
    title: 'Water Plants',
    description: 'Water all indoor plants',
    completed: false,
    category: 'Personal',
    priority: 'medium',
    date: new Date(),
  },
  {
    id: 5,
    title: 'Team Meeting',
    description: 'Weekly team standup meeting',
    completed: false,
    category: 'Work',
    priority: 'high',
    date: new Date(),
    time: '10:00 AM',
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const getTasksByDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  const getTasksByCategory = (category: string) => {
    return tasks.filter(task => task.category === category);
  };

  const getTodayTasks = () => {
    return getTasksByDate(new Date());
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const getPendingTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksByDate,
    getTasksByCategory,
    getTodayTasks,
    getCompletedTasks,
    getPendingTasks,
  };
}