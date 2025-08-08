import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../contexts/AppContext';

const ProfileScreen = () => {
  const { user, setIsAuthenticated } = useAppContext();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.profileText}>👤</Text>
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Text style={styles.settingItem}>🔔 Notifications</Text>
          <Text style={styles.settingItem}>🌙 Dark Mode</Text>
          <Text style={styles.settingItem}>📍 Location Services</Text>
          <Text style={styles.settingItem}>💝 Preferences</Text>
        </View>

        <Button mode="outlined" onPress={handleLogout} style={styles.button}>
          Logout
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 30,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileText: {
    fontSize: 48,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#757575',
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
  settingItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#424242',
  },
  button: {
    marginTop: 20,
    minWidth: 200,
  },
});

export default ProfileScreen;
