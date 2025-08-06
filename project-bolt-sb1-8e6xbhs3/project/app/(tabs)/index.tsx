import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Bell } from 'lucide-react-native';
import { CategoryCard } from '@/components/CategoryCard';
import { TaskCard } from '@/components/TaskCard';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, title: 'Personal', count: 5, color: '#F87171', icon: '👤' },
  { id: 2, title: 'Work', count: 8, color: '#60A5FA', icon: '💼' },
  { id: 3, title: 'Shopping', count: 3, color: '#34D399', icon: '🛍️' },
];

const todayTasks = [
  { id: 1, title: 'Email Reports', time: '09:00 AM', completed: false },
  { id: 2, title: 'Gym Workout', time: '05:30 PM', completed: true },
  { id: 3, title: 'Project Meeting', time: '03:00 PM', completed: false },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState(todayTasks);

  const toggleTask = (taskId: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.userName}>Sarah</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's task</Text>
          <View style={styles.tasksContainer}>
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 16,
    color: '#F3E8FF',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
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
    paddingTop: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  tasksContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
});