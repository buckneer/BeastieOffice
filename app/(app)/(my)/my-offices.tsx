import React, { useEffect, useState } from "react";
import {FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/constants/Firebase";
import ThemedSafeArea from "@/components/themed/ThemedSafeArea";
import {Office} from "@/types";


export default function MyOffices() {
	const [offices, setOffices] = useState<Office[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOffices = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "offices"));
				const officesData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Office[];
				setOffices(officesData);
			} catch (error) {
				console.error("Error fetching offices:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOffices();
	}, []);

	const renderOffice = ({ item }: { item: Office }) => (
		<TouchableOpacity style={styles.officeCard}>
			<Text style={styles.officeName}>{item.officeName}</Text>
			<Text style={styles.details}>Workspaces: {item.workspaces}</Text>
		</TouchableOpacity>
	);

	return (
		<ThemedSafeArea style={styles.container}>
			<Text style={styles.title}>My Offices</Text>
			{loading ? (
				<Text style={styles.loadingText}>Loading...</Text>
			) : offices.length > 0 ? (
				<FlatList
					data={offices}
					renderItem={renderOffice}
					keyExtractor={(item) => item.id!}
					contentContainerStyle={styles.listContainer}
				/>
			) : (
				<Text style={styles.emptyText}>No offices found.</Text>
			)}
		</ThemedSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
	},
	loadingText: {
		fontSize: 16,
		color: "#999",
		textAlign: "center",
		marginTop: 20,
	},
	emptyText: {
		fontSize: 16,
		color: "#999",
		textAlign: "center",
		marginTop: 20,
	},
	listContainer: {
		paddingBottom: 20,
	},
	officeCard: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	officeName: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginBottom: 5,
	},
	details: {
		fontSize: 14,
		color: "#666",
	},
});
