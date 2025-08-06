import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface Category {
  id: number;
  title: string;
  count: number;
  color: string;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function CategoryCard({ category }: CategoryCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { duration: 150 });
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={styles.title}>{category.title}</Text>
      <Text style={styles.count}>{category.count} tasks</Text>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
});