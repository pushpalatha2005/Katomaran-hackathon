import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter } from 'lucide-react-native';
import { TaskListItem } from '@/components/TaskListItem';

const allTasks = [
  { id: 1, title: 'Email Report', category: 'Work', completed: false, priority: 'high' },
  { id: 2, title: 'Gym Workout', category: 'Personal', completed: true, priority: 'medium' },
  { id: 3, title: 'Read Book', category: 'Personal', completed: false, priority: 'low' },
  { id: 4, title: 'Water Plants', category: 'Personal', completed: false, priority: 'medium' },
  { id: 5, title: 'Team Meeting', category: 'Work', completed: false, priority: 'high' },
  { id: 6, title: 'Final Report', category: 'Work', completed: false, priority: 'high' },
];

export default function AllTasksScreen() {
  const [tasks, setTasks] = useState(allTasks);
  const [filter, setFilter] = useState('All');

  const toggleTask = (taskId: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>All tasks</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {totalCount} tasks
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Filter size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.filterTabs}>
          {['All', 'Pending', 'Completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.filterTab,
                { backgroundColor: filter === tab ? '#E879F9' : 'transparent' }
              ]}
              onPress={() => setFilter(tab)}
            >
              <Text 
                style={[
                  styles.filterTabText,
                  { color: filter === tab ? '#FFFFFF' : '#64748B' }
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
          {tasks
            .filter(task => {
              if (filter === 'Pending') return !task.completed;
              if (filter === 'Completed') return task.completed;
              return true;
            })
            .map((task) => (
              <TaskListItem 
                key={task.id} 
                task={task} 
                onToggle={() => toggleTask(task.id)}
              />
            ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  taskCount: {
    fontSize: 14,
    color: '#F3E8FF',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  filterTabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 24,
  },
});