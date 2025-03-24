import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";
import { Button } from "react-native-web";

const date = new Date();
const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Response(props) {
	const [generatedText, setGeneratedText] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const templatePrompt = `Please create a detailed itinerary based on the following constraints:

The itinerary should exclusively feature locations, activities, or experiences directly related to the movie.  Do not include any locations or activities not depicted or mentioned in the film.
The itinerary should include the following details:

* Day-by-day breakdown of the trip.
* Specific locations to visit, including addresses or coordinates when available.
* Activities to undertake at each location, referencing specific scenes or events from the movie.
* Suggested accommodation options near each location, considering the specified budget.
* Estimated costs for each activity and accommodation, ensuring the total trip cost stays within the budget.
* Transportation recommendations between locations.
* Optional: Include relevant dialogue or trivia about the movie related to each location.

Please present the itinerary in the following format: Name of movie:"", name of country/countries:"", duration:"", budget:"", the rest of the itinerary:"". Ensure all information is accurate and relevant to the constraints:`;

			const combinedPrompt = `${templatePrompt} ${props.prompt}.`;

			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const result = await model.generateContent(combinedPrompt);
			const response = await result.response;
			const text = await response.text();
			setGeneratedText(text);
		};
		fetchData();
	}, [props.prompt]);

	return (
		<View style={styles.response}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Image source={{uri:"https://www.shutterstock.com/image-vector/robot-icon-chatbot-cute-smiling-600nw-715418284.jpg"}} style={styles.icon} />
					<Text style={{ fontWeight: 600 }}>Gemini</Text>
				</View>
				<Text style={{ fontSize: 10, fontWeight: "600" }}>
					{date.getHours()}:{date.getMinutes()}
				</Text>
			</View>
			<Markdown>{generatedText}</Markdown>
		</View>
	);
}

const styles = StyleSheet.create({
	response: {
		flexDirection: "column",
		gap: 8,
		backgroundColor: "#fafafa",
		marginBottom: 8,
		padding: 16,
		borderRadius: 16,
	},
	icon: {
		width: 28,
		height: 28,
	},
});
