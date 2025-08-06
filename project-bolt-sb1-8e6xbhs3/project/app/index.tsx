import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexScreen() {
  useEffect(() => {
    // Redirect to welcome screen
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#E879F9', '#A855F7', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});