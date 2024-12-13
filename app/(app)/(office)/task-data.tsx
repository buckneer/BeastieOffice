import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import { ThemedText } from "@/components/themed/ThemedText";
import RoleItem from "@/components/RoleItem";
import NavigationIcons from "@/components/NavigationIcons";
import {useSetupData} from "@/components/SetupContext";
import {useState} from "react";

export default function TaskData() {
	const { roles, editRole } = useSetupData();
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const toggleExpand = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index)); // Toggle expansion
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<SafeAreaView style={styles.safeAreaContainer}>
				<ThemedText style={styles.headingThemedText} type="title" textColor="tint">
					Working Hours and Salary!
				</ThemedText>
				<ThemedText style={styles.headingThemedText} type="subtitle" textColor="muted">
					Click on the item to edit it
				</ThemedText>
				<FlatList
					data={roles}
					keyExtractor={(item, index) => `${item.name}-${index}`}
					renderItem={({ item, index }) => (
						<RoleItem
							expanded={expandedIndex === index}
							role={item}
							onUpdate={(updates) =>
								editRole(index, { ...item, ...updates }) // Ensure a complete object
							}
							onPress={() => toggleExpand(index)} // Handle expand toggle
						/>
					)}
				/>
				<NavigationIcons prevStepRoute={"./"} nextStepRoute={"./salary-details"} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	safeAreaContainer: {
		justifyContent: "center",
		margin: 10,
	},
	headingThemedText: {
		textAlign: "center",
	},
	roleItemsList: {
		width: "100%",
		marginTop: 10,
	},
});
