import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { GET_Details } from '@/actions'; 
import { POST_Booking } from '@/actions'; 
import { useUser } from '@clerk/clerk-expo';

const Page = () => {
  const { id } = useLocalSearchParams(); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsFromDb = await GET_Details();
        setData(destinationsFromDb); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to load destinations!"); 
        setLoading(false); 
      }
    };

    fetchDestinations(); 
  }, []);

  const destination = data.find((item) => item.id === Number(id));

  const handleBooking = async () => {
    if (!user || !destination) {
      Alert.alert("Error", "Missing user or destination data!");
      return;
    }

    try {
      const booking = await POST_Booking(user?.id, destination.id); 
      Alert.alert("Booking Successful", `Destination ${destination.name} booked!`);
    } catch (error) {
      Alert.alert("Booking Failed", "There was an error booking your destination.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error || !destination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Destination not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: destination.image }}
          onError={() => console.log('Error loading image')}
          style={styles.image} 
        />
        
        <Text style={styles.name}>{destination.name}</Text>
        
        <Text style={styles.country}>{destination.countries}</Text>

        <Text style={styles.country}>{destination.duration} days</Text>

        <Text style={styles.country}>${destination.budget}</Text>

        <Text style={styles.description}>{destination.description}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  content: {
    marginBottom: 20,
    alignItems: 'center', 
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover', 
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  country: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#ffb687',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#ff3333',
  },
});

export default Page;
