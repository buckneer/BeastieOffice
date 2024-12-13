/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/),
 * [Tamagui](https://tamagui.dev/),
 * [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export type RoleColorsType = {
	[key in keyof typeof RoleColors['light']]: {
		background: string;
		text: string;
	};
};


export const Colors = {
	light: {
		text: '#171719',           // Main text color, a dark shade for readability on light background
		background: '#FFFFFF',     // Main background color, white
		tint: '#ef3d43',           // Primary accent color (purple), consistent with dark theme for highlights and active elements
		icon: '#cdcdcd',           // Icon color, a medium gray for lighter backgrounds
		tabIconDefault: '#cdcdcd', // Default color for inactive tab icons, similar to the icon color
		tabIconSelected: '#ef3d43',// Selected tab icon color, matching the primary accent color
		muted: "#9BA1A6",
		white: '#FFFFFF',
	},

	dark: {
		text: '#FFFFFF',            // Main text color, typically white
		background: '#171719',       // Main background color, a dark shade
		tint: '#ef3d43',             // Primary accent color (purple), used for highlights and active elements
		icon: '#9BA1A6',             // Icon color, a soft gray
		tabIconDefault: '#9BA1A6',   // Default color for inactive tab icons, similar to the icon color
		tabIconSelected: '#ef3d43',  // Selected tab icon color, matches the primary accent color
		muted: "#9BA1A6",
		white: '#FFFFFF',
	},
};


export const RoleColors = {
	light: {
		green: {
			background: "#4CAF50", // Green
			text: "#E8F5E9", // Light Green
		},
		blue: {
			background: "#2196F3", // Blue
			text: "#E3F2FD", // Light Blue
		},
		rose: {
			background: "#E91E63", // Rose
			text: "#FCE4EC", // Light Rose
		},
		orange: {
			background: "#FF9800", // Orange
			text: "#FFF3E0", // Light Orange
		},
		purple: {
			background: "#9C27B0", // Purple
			text: "#F3E5F5", // Light Purple
		},
		cyan: {
			background: "#03A9F4", // Cyan
			text: "#E1F5FE", // Light Cyan
		},
		amber: {
			background: "#FFC107", // Amber
			text: "#FFF8E1", // Light Amber
		},
		coral: {
			background: "#FF5722", // Coral
			text: "#FBE9E7", // Light Coral
		},
	},
	dark: {
		green: {
			background: "#81C784", // Soft Green
			text: "#1B5E20", // Deep Green
		},
		blue: {
			background: "#64B5F6", // Soft Blue
			text: "#0D47A1", // Deep Blue
		},
		rose: {
			background: "#F06292", // Soft Rose
			text: "#880E4F", // Deep Rose
		},
		orange: {
			background: "#FFB74D", // Soft Orange
			text: "#E65100", // Deep Orange
		},
		purple: {
			background: "#BA68C8", // Soft Purple
			text: "#4A148C", // Deep Purple
		},
		cyan: {
			background: "#4FC3F7", // Soft Cyan
			text: "#01579B", // Deep Cyan
		},
		amber: {
			background: "#FFD54F", // Soft Amber
			text: "#FF6F00", // Deep Amber
		},
		coral: {
			background: "#FF8A65", // Soft Coral
			text: "#BF360C", // Deep Coral
		},
	},
};

