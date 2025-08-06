import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  time?: string;
}

interface TaskListItemProps {
  task: Task;
  onToggle: () => void;
  showTime?: boolean;
}

const priorityColors = {
  low: '#34D399',
  medium: '#F59E0B',
  high: '#EF4444',
};

const categoryColors = {
  Work: '#60A5FA',
  Personal: '#F87171',
  Shopping: '#34D399',
};

export function TaskListItem({ task, onToggle, showTime = false }: TaskListItemProps) {
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(task.completed ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: task.completed ? 0.7 : 1,
  }));

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, { duration: 100 }, () => {
      scale.value = withSpring(1, { duration: 100 });
    });
    
    checkScale.value = withSpring(task.completed ? 0 : 1, { duration: 300 });
    onToggle();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
          <Animated.View style={checkAnimatedStyle}>
            <Check size={16} color="#FFFFFF" strokeWidth={3} />
          </Animated.View>
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <View style={styles.metadata}>
            <View 
              style={[
                styles.categoryBadge, 
                { backgroundColor: categoryColors[task.category as keyof typeof categoryColors] || '#94A3B8' }
              ]}
            >
              <Text style={styles.categoryText}>{task.category}</Text>
            </View>
            {showTime && task.time && (
              <View style={styles.timeContainer}>
                <Clock size={12} color="#64748B" strokeWidth={2} />
                <Text style={styles.timeText}>{task.time}</Text>
              </View>
            )}
          </View>
        </View>
        
        <View 
          style={[
            styles.priorityIndicator, 
            { backgroundColor: priorityColors[task.priority] }
          ]} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkboxCompleted: {
    backgroundColor: '#34D399',
    borderColor: '#34D399',
  },
  taskInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  priorityIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
});