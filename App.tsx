import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import NavigationBar from 'expo-navigation-bar';
import HomeScreen from '@/components/HomeScreen';
import ProfileScreen from '@/components/ProfileScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Home'); 
  const { user } = useUser();

  NavigationBar.setBackgroundColorAsync('#F7F9FC');
  NavigationBar.setButtonStyleAsync('dark');

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.content}>
          {currentTab === 'Home' && <HomeScreen />}
          {currentTab === 'Profile' && <ProfileScreen />}
        </View>

        <View style={styles.navigationBar}>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'Home' && styles.activeTab]}
            onPress={() => setCurrentTab('Home')}
          >
            <Text style={[styles.tabText, currentTab === 'Home' && styles.activeText]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'Profile' && styles.activeTab]}
            onPress={() => setCurrentTab('Profile')}
          >
            <Text style={[styles.tabText, currentTab === 'Profile' && styles.activeText]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <Text style={styles.title}>Please Sign In</Text>
          <Link href="/(auth)/sign-in">
            <Text style={styles.link}>Sign In</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text style={styles.link}>Sign Up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  signedOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#4A90E2',
    marginVertical: 10,
  },
});
