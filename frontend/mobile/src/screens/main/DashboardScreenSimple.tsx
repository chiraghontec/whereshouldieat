import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../contexts/AppContext';

const DashboardScreen = ({ navigation }: any) => {
  const { user, setIsAuthenticated } = useAppContext();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to WhereShouldIEat!</Text>
        <Text style={styles.subtitle}>Discover amazing restaurants near you</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features Coming Soon:</Text>
          <Text style={styles.feature}>🔍 Smart restaurant search</Text>
          <Text style={styles.feature}>💎 Hidden gem discoveries</Text>
          <Text style={styles.feature}>📍 Location-based recommendations</Text>
          <Text style={styles.feature}>⭐ Community reviews</Text>
          <Text style={styles.feature}>🎯 Personalized filters</Text>
        </View>

        <Button mode="outlined" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#424242',
  },
  button: {
    marginTop: 20,
    minWidth: 200,
  },
});

export default DashboardScreen;
