import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    titleOpacity.value = withSpring(1, { duration: 800 });
    titleTranslateY.value = withSpring(0, { duration: 800 });
    
    subtitleOpacity.value = withDelay(300, withSpring(1, { duration: 600 }));
    subtitleTranslateY.value = withDelay(300, withSpring(0, { duration: 600 }));
    
    buttonOpacity.value = withDelay(600, withSpring(1, { duration: 500 }));
    buttonScale.value = withDelay(600, withSpring(1, { duration: 500 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.Text style={[styles.title, titleAnimatedStyle]}>
            Welcome to
          </Animated.Text>
          <Animated.Text style={[styles.brandTitle, titleAnimatedStyle]}>
            TUDU
          </Animated.Text>
          
          <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
            Your day, your goals,{'\n'}
            one task at a time. Plan,{'\n'}
            prioritize, and achieve{'\n'}
            more effortlessly
          </Animated.Text>
        </View>

        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/auth')}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: height * 0.15,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  brandTitle: {
    fontSize: 72,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 48,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 16,
    color: '#F3E8FF',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    minWidth: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
    letterSpacing: 1,
  },
});