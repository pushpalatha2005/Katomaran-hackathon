import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  interpolate
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const formOpacity = useSharedValue(1);
  const formTranslateX = useSharedValue(0);

  const handleToggleMode = () => {
    formOpacity.value = withSequence(
      withSpring(0, { duration: 200 }),
      withSpring(1, { duration: 300 })
    );
    formTranslateX.value = withSequence(
      withSpring(isLogin ? -20 : 20, { duration: 200 }),
      withSpring(0, { duration: 300 })
    );
    setIsLogin(!isLogin);
  };

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // For demo purposes, navigate to main app
    router.replace('/(tabs)');
  };

  const handleSocialAuth = (provider: string) => {
    // For demo purposes, navigate to main app
    Alert.alert('Social Login', `${provider} login would be implemented here`);
    router.replace('/(tabs)');
  };

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateX: formTranslateX.value }],
  }));

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
        </View>

        <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
          <BlurView intensity={20} style={styles.formBlur}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {!isLogin && (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#94A3B8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              )}

              <TouchableOpacity
                style={styles.authButton}
                onPress={handleAuth}
                activeOpacity={0.8}
              >
                <Text style={styles.authButtonText}>
                  {isLogin ? 'Login' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>

              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialAuth('Google')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialButtonText}>G</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialAuth('Microsoft')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialButtonText}>M</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleToggleMode}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Text style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Login'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.15,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  formContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  formBlur: {
    padding: 1,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  authButton: {
    backgroundColor: '#E879F9',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
  },
  orText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  socialButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#475569',
  },
  toggleButton: {
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  toggleLink: {
    color: '#E879F9',
    fontFamily: 'Inter-SemiBold',
  },
});