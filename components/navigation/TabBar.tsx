import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from "@/hooks/useThemeColor";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
	const insets = useSafeAreaInsets();
	const backgroundColor = useThemeColor({}, "background");
	const textColor = useThemeColor({}, "text");
	const activeTextColor = useThemeColor({}, "tint");

	const animations = useRef(state.routes.map(() => new Animated.Value(1))).current;

	useEffect(() => {
		state.routes.forEach((_, index) => {
			Animated.timing(animations[index], {
				toValue: state.index === index ? 1.5 : 1,
				duration: 200,
				useNativeDriver: false,
			}).start();
		});
	}, [state.index]);

	return (
		<View style={[styles.tabBar, { backgroundColor }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.tabBarLabel ?? options.title ?? route.name;
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<Animated.View
						key={route.key}
						style={[
							styles.animatedTab,
							{
								flex: animations[index], // Animate flex property
							},
						]}
					>
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							onPress={onPress}
							style={[
								styles.tab,
								isFocused ? { backgroundColor: activeTextColor } : {},
							]}
						>
							{options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? '#FFF' : textColor, size: 24 })}

							{/*{isFocused && (*/}
							{/*	<Text style={[styles.label, { color: '#FFF' }]}>{typeof label === 'string' ? label : route.name}</Text>*/}
							{/*)}*/}
						</TouchableOpacity>
					</Animated.View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20,
		marginHorizontal: 10,
		marginBottom: 20,
		padding: 10,
	},
	animatedTab: {
		marginHorizontal: 5,
	},
	tab: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		borderRadius: 15,
		flexDirection: 'row',
		gap: 3,
	},
	label: {

		fontWeight: 'bold',
	},
});

export default CustomTabBar;
