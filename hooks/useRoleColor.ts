import { useColorScheme } from 'react-native';
import { RoleColors } from "@/constants/Colors";
import { RoleColorsType } from "@/constants/Colors";

type ColorKey = keyof RoleColorsType;

export function useRoleColor(
	colorName?: ColorKey
): RoleColorsType | { background: string; text: string } {
	const theme = useColorScheme() ?? 'light';

	// Retrieve all colors for the current theme
	const colors = RoleColors[theme] ?? RoleColors.light;

	if (colorName) {
		const color = colors[colorName];
		if (!color) {
			throw new Error(`Color "${colorName}" is not defined in RoleColors.`);
		}
		// Return the specific color object
		return {
			background: color.background,
			text: color.text,
		};
	}

	// Return all colors
	return colors;
}
