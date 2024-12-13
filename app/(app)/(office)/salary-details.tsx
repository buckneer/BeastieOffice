import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSetupData } from "@/components/SetupContext";
import { ThemedText } from "@/components/themed/ThemedText";

export default function SalaryDetails() {
	const { officeName, workspaces, roles } = useSetupData();

	return (
		<View style={styles.container}>
			<View style={styles.section}>
				<ThemedText type="title" style={styles.heading}>
					Office Details
				</ThemedText>
				<ThemedText>Office Name: {officeName || "N/A"}</ThemedText>
				<ThemedText>Number of Workspaces: {workspaces}</ThemedText>
			</View>

			<View style={styles.section}>
				<ThemedText type="title" style={styles.heading}>
					Employee Roles
				</ThemedText>
				<FlatList
					data={roles}
					keyExtractor={(item, index) => `${item.name}-${index}`}
					renderItem={({ item }) => (
						<View style={styles.roleItem}>
							<View style={[styles.colorBox, { backgroundColor: item.color }]} />
							<View>
								<Text style={styles.roleName}>{item.name}</Text>
								<Text>Working Hours: {item.workingHours || "N/A"}</Text>
								<Text>Salary: ${item.salary || "N/A"}</Text>
							</View>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	section: {
		marginBottom: 20,
	},
	heading: {
		marginBottom: 10,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	roleItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		marginBottom: 10,
	},
	colorBox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		marginRight: 10,
	},
	roleName: {
		fontWeight: "bold",
		fontSize: 16,
	},
});
