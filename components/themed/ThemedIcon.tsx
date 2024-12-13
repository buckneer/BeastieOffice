import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedIonIconProps = {
	name: React.ComponentProps<typeof Ionicons>['name']; // Icon names specific to Ionicons
	size?: number; // Icon size
	lightColor?: string; // Light theme color
	darkColor?: string; // Dark theme color
	iconColor?: 'text' | 'background' | 'tint' | 'icon' | 'muted' | 'white'; // Theme key for icon color
};

export function ThemedIcon({
	                              name,
	                              size = 24,
	                              lightColor,
	                              darkColor,
	                              iconColor,
                              }: ThemedIonIconProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, iconColor || 'icon');

	return <Ionicons name={name} size={size} color={color} />;
}
