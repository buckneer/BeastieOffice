import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'heading';
	textColor?: 'text' | 'background' | 'tint' | 'icon' | 'muted';
};

export function ThemedText({
	                           style,
	                           lightColor,
	                           darkColor,
	                           textColor,
	                           type = 'default',
	                           ...rest
                           }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, textColor ? textColor : 'text');

	return (
		<Text
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				type === 'heading' ? styles.heading : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
	},
	heading: {
		fontFamily: 'Beastie',
		fontSize: 40,
		fontWeight: 'bold',
		lineHeight: 40,
	}

});
