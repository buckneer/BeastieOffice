/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/),
 * [Tamagui](https://tamagui.dev/),
 * [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


export const Colors = {
	light: {
		text: '#171719',           // Main text color, a dark shade for readability on light background
		background: '#FFFFFF',     // Main background color, white
		tint: '#ef3d43',           // Primary accent color (purple), consistent with dark theme for highlights and active elements
		icon: '#cdcdcd',           // Icon color, a medium gray for lighter backgrounds
		tabIconDefault: '#cdcdcd', // Default color for inactive tab icons, similar to the icon color
		tabIconSelected: '#ef3d43',// Selected tab icon color, matching the primary accent color
		muted: "#9BA1A6"
	},

	dark: {
		text: '#FFFFFF',            // Main text color, typically white
		background: '#171719',       // Main background color, a dark shade
		tint: '#ef3d43',             // Primary accent color (purple), used for highlights and active elements
		icon: '#9BA1A6',             // Icon color, a soft gray
		tabIconDefault: '#9BA1A6',   // Default color for inactive tab icons, similar to the icon color
		tabIconSelected: '#ef3d43',  // Selected tab icon color, matches the primary accent color
		muted: "#9BA1A6"
	},
};
