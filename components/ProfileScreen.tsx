import React from 'react';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Welcome!</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email: </Text>
            <Text style={styles.infoText}>{user?.emailAddresses[0].emailAddress}</Text>
          </View>
          <TouchableOpacity
                  onPress={async () => {
                    await signOut();
                    router.replace('/sign-in'); 
                  }}
                >
                  <Text>Sign Out</Text>
                </TouchableOpacity>
        </View>
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffb687',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});
