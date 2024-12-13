import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { useRoleColor } from "@/hooks/useRoleColor";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";



export interface RoleItemProps {
	expanded?: boolean;
	role: {
		name: string;
		color: "green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral";
		workingHours?: number;
		salary?: number;
	};
	onUpdate: (updates: Partial<RoleItemProps["role"]>) => void;
	onPress: () => void; // New onPress prop
}

export default function RoleItem({ expanded, role, onUpdate, onPress }: RoleItemProps) {
	const { background: borderColor } = useRoleColor(role.color) as {
		background: string;
		text: string;
	};

	const [workingHours, setWorkingHours] = useState(role.workingHours ?? 0);
	const [salary, setSalary] = useState(role.salary ?? 0);

	const handleUpdate = () => {
		onUpdate({ workingHours, salary });
	};

	return (
		<TouchableOpacity
			onPress={onPress} // Toggle expand when pressed
			style={[{ borderColor }, styles.rolesView]}
		>
			<View style={expanded ? styles.expandedTextView : styles.textView}>
				<ThemedText style={styles.propViewText}>{role.name}</ThemedText>
				{!expanded ? (
					<View style={[styles.editableData, { flexDirection: "row" }]}>
						<View style={styles.propView}>
							<ThemedText>Working Hours</ThemedText>
							<ThemedText>{workingHours}</ThemedText>
						</View>
						<View style={styles.propView}>
							<ThemedText>Avg. Salary</ThemedText>
							<ThemedText>{salary}</ThemedText>
						</View>
					</View>
				) : (
					<View style={styles.editableData}>
						<View style={styles.propView}>
							<ThemedText>Working Hours</ThemedText>
							<ThemedTextInput
								placeholder="Enter working hours"
								keyboardType="numeric"
								value={workingHours.toString()}
								onChangeText={(text) => setWorkingHours(Number(text))}
								onEndEditing={handleUpdate}
								style={styles.inputTextInput}
							/>
						</View>
						<View style={styles.propView}>
							<ThemedText>Avg. Salary</ThemedText>
							<ThemedTextInput
								placeholder="Enter salary"
								keyboardType="numeric"
								value={salary.toString()}
								onChangeText={(text) => setSalary(Number(text))}
								onEndEditing={handleUpdate}
								style={styles.inputTextInput}
							/>
						</View>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	rolesView: {
		borderWidth: 2,
		borderRadius: 20,
		marginHorizontal: 10,
		padding: 10,
		marginVertical: 5,
	},
	textView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	expandedTextView: {
		flexDirection: "column",
	},
	editableData: {
		gap: 10,
	},
	propView: {
		justifyContent: "center",
	},
	propViewText: {
		fontWeight: "bold",
	},
	inputTextInput: {
		width: "100%",
	},
});
