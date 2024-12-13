import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedAnimatedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedAnimatedView({
	                                   style,
	                                   lightColor,
	                                   darkColor,
	                                   ...otherProps
                                   }: ThemedAnimatedViewProps) {
	const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

	return (
		<Animated.View
			key={themeColor} // This key change will force re-render on theme change
			style={[{ backgroundColor: themeColor }, style]}
			{...otherProps}
		/>
	);
}
