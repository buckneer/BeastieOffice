import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View, TouchableWithoutFeedback } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export type IconTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
	icon?: keyof typeof Ionicons.glyphMap;
};

const IconTextInput = ({ lightColor, darkColor, icon, ...rest }: IconTextInputProps) => {
	const [isActive, setIsActive] = useState(false);
	const inputRef = useRef<TextInput>(null);
	const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
	const activeTintColor = isActive ? tint : iconColor;

	const handlePress = () => {
		inputRef.current?.focus();
	};

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={[{ backgroundColor, borderColor: activeTintColor }, styles.container]}>
				<Ionicons name={icon} size={20} color={activeTintColor} style={styles.icon} />
				<TextInput
					ref={inputRef}
					style={[styles.textInput, { color }]}
					onFocus={() => setIsActive(true)}
					onBlur={() => setIsActive(false)}
					{...rest}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center', // Align items vertically center
		width: '100%', // Make the container full-width
		paddingHorizontal: 10, // Add padding around the container
		marginTop: 10,
	},
	icon: {
		paddingVertical: 14,
		paddingRight: 10, // Add spacing to the right of the icon
	},
	textInput: {
		flex: 1, // Make the TextInput take up remaining space
		fontSize: 16,

	}
});

export default IconTextInput;
