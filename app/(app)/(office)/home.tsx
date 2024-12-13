import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {ThemedIcon} from "@/components/themed/ThemedIcon";
import {useRouter} from "expo-router";
import NavigationIcons from "@/components/NavigationIcons";

const OfficeDetails = () => {

	const router = useRouter();

	const backgroundColor = useThemeColor({}, 'tint');
	const insets = useSafeAreaInsets();




	return (
		<View style={[styles.createOfficeView, {paddingTop: insets.top}]}>
			<ThemedText type="title">Let's create new office!</ThemedText>
			<NavigationIcons nextStepRoute={'./office-details'} />
		</View>
	);
};


const styles = StyleSheet.create({
	createOfficeView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	arrowView: {
		marginTop: 25,
		borderRadius: 40,
		padding: 10
	}
})

export default OfficeDetails;
