import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function TaskCard({ task, onToggle }: TaskCardProps) {
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
    <AnimatedTouchableOpacity
      style={[styles.container, animatedStyle]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={styles.content}>
        <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
          <Animated.View style={checkAnimatedStyle}>
            <Check size={16} color="#FFFFFF" strokeWidth={3} />
          </Animated.View>
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <Text style={styles.time}>{task.time}</Text>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
});