import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Let's personalize your experience</Text>
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>🎯</Text>
          <Text style={styles.emptyTitle}>Onboarding</Text>
          <Text style={styles.emptySubtitle}>Coming soon: Personalize your food preferences</Text>
        </View>

        <Button mode="contained" onPress={() => navigation.navigate('MainTabs')} style={styles.button}>
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 40,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  button: {
    minWidth: 200,
  },
});

export default OnboardingScreen;
