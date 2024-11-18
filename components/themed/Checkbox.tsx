import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export type CheckboxProps = {
	label?: string;
	lightColor?: string;
	darkColor?: string;
	onChange?: (checked: boolean) => void;
	initialChecked?: boolean;
};

const Checkbox = ({ label, lightColor, darkColor, onChange, initialChecked = false }: CheckboxProps) => {
	const [isChecked, setIsChecked] = useState(initialChecked);

	// Using theme colors for the checkbox and label
	const checkboxColor = useThemeColor({ light: lightColor, dark: darkColor }, 'muted');
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
	const activeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

	const toggleCheckbox = () => {
		setIsChecked(!isChecked);
		if (onChange) onChange(!isChecked);
	};

	return (
		<TouchableOpacity onPress={toggleCheckbox} style={[styles.container, { backgroundColor }]}>
			<View style={[styles.checkbox, { borderColor: isChecked ? activeColor : checkboxColor }]}>
				{isChecked && (
					<Ionicons name="checkmark" size={18} color={activeColor} />
				)}
			</View>
			{label && <Text style={[styles.label, { color: checkboxColor }]}>{label}</Text>}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',

		borderRadius: 10,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 2,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: 'bold',
	},
});

export default Checkbox;
