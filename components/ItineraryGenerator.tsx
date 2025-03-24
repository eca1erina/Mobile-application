import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Button } from "react-native";
import Response from "@/components/response";
import Message from "@/components/message";
import { POST } from "@/actions";

export default function Itinerary() {
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);

  const SearchInput = () => {
    setListData((prevList) => [...prevList, inputText]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Image
          source={{
            uri: "https://www.shutterstock.com/image-vector/robot-icon-chatbot-cute-smiling-600nw-715418284.jpg",
          }}
          style={styles.icon}
        />
        <Text style={styles.headerText}>Gemini AI</Text>
      </View>

      <FlatList
        style={styles.flatList}
        data={listData}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Message message={item} />
            <Response prompt={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
      />

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Film, country, duration, budget"
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          selectionColor="#323232"
        />
        <TouchableOpacity onPress={SearchInput} style={styles.searchButton}>
          <Image
            source={{
              uri: "https://www.shutterstock.com/image-vector/robot-icon-chatbot-cute-smiling-600nw-715418284.jpg",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9", 
    paddingTop: 40,
    paddingHorizontal: 16,
    width: 350,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#323232",
    marginLeft: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  flatList: {
    marginBottom: 80, 
  },
  messageContainer: {
    marginBottom: 16,
  },
  listContentContainer: {
    paddingBottom: 80, 
  },
  searchBar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4, 
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    width: 100,
    color: "#323232",
  },
  searchButton: {
    marginLeft: 10,
  },
});
