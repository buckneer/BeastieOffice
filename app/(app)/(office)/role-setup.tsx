import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import { useRoleColor } from "@/hooks/useRoleColor";
import { useThemeColor } from "@/hooks/useThemeColor";
import NavigationIcons from "@/components/NavigationIcons";
import {useSetupData} from "@/components/SetupContext";

export default function RoleSetup() {
	const [roleName, setRoleName] = useState<string>("");
	const allColors = useRoleColor();
	const [selectedColor, setSelectedColor] = useState<"green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral" | null>(null);
	const backgroundTint = useThemeColor({}, 'tint');

	const { addRole, saveToFirestore } = useSetupData(); // Use the context to access `addRole`

	const handleAddRole = () => {
		if (!roleName || !selectedColor) {
			alert("Please enter a role name and select a color!");
			return;
		}

		addRole({ name: roleName, color: selectedColor, workingHours: 0, salary: 0 });

		// Reset the form
		setRoleName("");
		setSelectedColor(null);
	};

	const handleNext = async () => {
		try {
			await saveToFirestore(); // Save data to Firestore
			console.log("Data saved successfully");
		} catch (error) {
			console.error("Error saving data to Firestore:", error);
		}
	};


	return (
		<KeyboardAvoidingView style={styles.mainSafeAreaView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View>
				<ThemedText type="title" textColor={'tint'}>It's time for roles!</ThemedText>
			</View>
			<View style={styles.workspaceView}>
				<ThemedText type="subtitle">Name your employee role!</ThemedText>
				<ThemedTextInput
					value={roleName}
					onChangeText={setRoleName}
					placeholder="For example: developer, designer"
					style={styles.titleTextInput}
				/>
			</View>
			<View style={styles.workspaceView}>
				<ThemedText type="subtitle">Let's color it!</ThemedText>
				<View style={styles.container}>
					{Object.entries(allColors).map(([key, { background }]) => (
						<TouchableOpacity
							key={key}
							style={[
								styles.colorBox,
								{ backgroundColor: background },
								selectedColor === key && styles.selectedBox,
							]}
							onPress={() => setSelectedColor(key as "green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral")}
						/>
					))}
				</View>
			</View>
			<View style={styles.saveView}>
				<TouchableOpacity
					style={[styles.saveButton, { backgroundColor: backgroundTint }]}
					onPress={handleAddRole} // Attach the `handleAddRole` function
				>
					<Text style={styles.saveButtonText}>ADD</Text>
				</TouchableOpacity>
			</View>
			<NavigationIcons prevStepRoute={'./'} nextStepRoute={'./task-data'} onNext={handleNext} />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	mainSafeAreaView: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	titleTextInput: {
		marginTop: 25,
		width: '100%'
	},
	workspaceView: {
		marginTop: 25,
		alignSelf: 'stretch',
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 14,
		justifyContent: 'center',
		marginTop: 10,
	},
	colorBox: {
		width: 70,
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		elevation: 2,
	},
	selectedBox: {
		borderWidth: 3,
		borderColor: '#FF6347',
	},
	saveView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	saveButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
	},
	saveButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
});
