import {StyleSheet, Text, View, type ViewProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export type ThemedSafeArea = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export default function ThemedSafeArea({ style, lightColor, darkColor, ...otherProps }: ThemedSafeArea) {
	const backgroundColor = useThemeColor({}, 'background');
	const insets = useSafeAreaInsets();


	return (
		<View style={[{backgroundColor, paddingTop: insets.top}, style]} {...otherProps} />
	)
}


const styles = StyleSheet.create({})
