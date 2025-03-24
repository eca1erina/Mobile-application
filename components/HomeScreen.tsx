import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  TextInput 
} from 'react-native';
import { Link } from 'expo-router';
import { router, useLocalSearchParams } from "expo-router";
import { GET } from '@/actions'; 

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]); 
  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchDestinations = async () => {
      const destinationsFromDb = await GET(); 
      setData(destinationsFromDb);
      setFilteredDestinations(destinationsFromDb); 
    };

    fetchDestinations();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredDestinations(data); 
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = data.filter((destination) =>
        destination.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredDestinations(filtered); 
    }
  };

  const renderDestination = ({ item }) => (
    <View style={styles.destinationCard}>
      <Image source={{ uri: item.image }} style={styles.destinationImage} />
      <Link
        href={{
          pathname: '/(home)/[id]',
          params: { id: item.id },
        }}
      >
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationCountry}>{item.country}</Text>
        <Text style={styles.destinationDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainSection}>
        <Text style={styles.mainTitle}>Welcome to Your Travel Guide</Text>
        <Text style={styles.mainDescription}>
          Explore your dream destinations and make it happen!
        </Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search destinations..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={handleSearch} 
      />

      <FlatList
        data={filteredDestinations} 
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
    backgroundColor: '#f1b189',
    paddingHorizontal: 16,
  },
  mainSection: {
    backgroundColor: '#564f4b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  mainDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  searchBar: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  destinationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 13,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  destinationImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  destinationInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  destinationCountry: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  viewDetailsButton: {
    marginTop: 5,
    backgroundColor: '#564f4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
