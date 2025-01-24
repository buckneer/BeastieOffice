import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Role } from "@/types";
import { useColorScheme } from "react-native";
import {Colors, RoleColors} from "@/constants/Colors";
import {useThemeColor} from "@/hooks/useThemeColor";

interface ChipProps {
	role: Role;
	onPress?: (roleName: string) => void; // Optional callback for chip press
	isSelected?: boolean; // Indicates if the chip is selected
}

const Chip: React.FC<ChipProps> = ({ role, onPress, isSelected = false }) => {
	const themeColor = useThemeColor({}, "background"); // Background color based on theme
	const roleColor = RoleColors.light[role.color];

	const backgroundColor = isSelected ? roleColor.background : themeColor;
	const textColor = isSelected ? roleColor.text : roleColor.background;

	return (
		<TouchableOpacity
			style={[styles.chip, { backgroundColor }]}
			onPress={() => onPress?.(role.name)}
		>
			{/* Dot for the role color */}
			<View style={[styles.dot, { backgroundColor: isSelected ? themeColor : roleColor.background }]} />
			<Text style={[styles.chipText, { color: textColor }]}>{role.name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	chip: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "transparent",
		borderRadius: 16,
		paddingVertical: 8,
		paddingHorizontal: 16,
		margin: 8,
	},
	chipText: {
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 8,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
});

export default Chip;
