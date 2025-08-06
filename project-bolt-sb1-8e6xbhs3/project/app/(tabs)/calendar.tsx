import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { CalendarGrid } from '@/components/CalendarGrid';
import { TaskListItem } from '@/components/TaskListItem';

const tasksForDate = [
  { id: 1, title: 'Team Meeting', category: 'Work', completed: false, priority: 'high', time: '10:00 AM' },
  { id: 2, title: 'Doctor Appointment', category: 'Personal', completed: false, priority: 'high', time: '2:00 PM' },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState(tasksForDate);

  const toggleTask = (taskId: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity style={styles.navButton}>
            <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.currentMonth}>{formatDate(selectedDate)}</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <CalendarGrid selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        
        <View style={styles.tasksSection}>
          <Text style={styles.selectedDateText}>
            {formatSelectedDate(selectedDate)}
          </Text>
          
          <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskListItem 
                  key={task.id} 
                  task={task} 
                  onToggle={() => toggleTask(task.id)}
                  showTime
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks for this date</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 8,
  },
  currentMonth: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  tasksSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  selectedDateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  tasksList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
  },
});