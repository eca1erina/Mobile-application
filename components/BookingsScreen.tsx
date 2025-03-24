import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  ScrollView 
} from 'react-native';
import { Link } from 'expo-router';
import { router, useLocalSearchParams } from "expo-router";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { GET, GET_History } from '@/actions';

export default function HomeScreen() {
  const [filteredDestinations, setFilteredDestinations] = useState([]); 
  const [history, set_Data] = useState([]); 

  const { user } = useUser();

  useEffect(() => {
    const fetchDestinations = async () => {
      if (user?.id) {
        const history_dest = await GET_History(user.id); 
        set_Data(history_dest); 
        setFilteredDestinations(history_dest);
      }
    };

    fetchDestinations(); 
  }, [user]); 

  const renderDestination = ({ item }) => (
    <View style={styles.destinationCard}>
      <Image source={{ uri: item.image }} style={styles.destinationImage} />
      <View style={styles.destinationInfo}>
      <Link
  href={{
    pathname: '/(home)/[id]',
    params: { id: item.id },
  }}
>
        <Text style={styles.destinationName}>{item.name}</Text></Link>
        <Text style={styles.destinationDescription} numberOfLines={2}>
          {item.description}
        </Text>
       
      </View>
    </View>
  );

  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back, {user?.firstName || 'Traveler'}!</Text>
      </View>
      
      <FlatList
        data={history} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDestination}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#323232',
    textAlign: 'center',
  },
  destinationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3, // Slight shadow for iOS
    shadowColor: '#000', // Shadow for Android
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    padding: 16,
  },
  destinationImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  destinationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323232',
    marginBottom: 8,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  viewDetailsButton: {
    backgroundColor: '#ffb687',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 80,
  },
});
