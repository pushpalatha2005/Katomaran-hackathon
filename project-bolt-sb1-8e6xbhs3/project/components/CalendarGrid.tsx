import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface CalendarGridProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function CalendarGrid({ selectedDate, onDateSelect }: CalendarGridProps) {
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  
  // Get first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
  // Get day of week for first day (0 = Sunday)
  const startingDayOfWeek = firstDay.getDay();
  
  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    calendarDays.push(new Date(currentYear, currentMonth, day));
  }

  const isSelectedDate = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.grid}>
        {calendarDays.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            isSelected={isSelectedDate(date)}
            isToday={isToday(date)}
            onPress={() => date && onDateSelect(date)}
          />
        ))}
      </View>
    </View>
  );
}

interface CalendarDayProps {
  date: Date | null;
  isSelected: boolean;
  isToday: boolean;
  onPress: () => void;
}

function CalendarDay({ date, isSelected, isToday, onPress }: CalendarDayProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (date) {
      scale.value = withSpring(0.9, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (date) {
      scale.value = withSpring(1, { duration: 100 });
    }
  };

  if (!date) {
    return <View style={styles.emptyDay} />;
  }

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.day,
        isSelected && styles.selectedDay,
        isToday && !isSelected && styles.todayDay,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Text 
        style={[
          styles.dayText,
          isSelected && styles.selectedDayText,
          isToday && !isSelected && styles.todayDayText,
        ]}
      >
        {date.getDate()}
      </Text>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDay: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: '14.28%',
    height: 40,
  },
  day: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: '#E879F9',
  },
  todayDay: {
    backgroundColor: '#FEF3C7',
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  todayDayText: {
    color: '#D97706',
    fontFamily: 'Inter-Bold',
  },
});