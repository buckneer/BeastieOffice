import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemedIcon} from "@/components/themed/ThemedIcon";
import React from "react";
import {useThemeColor} from "@/hooks/useThemeColor";
import {RelativePathString, useRouter} from "expo-router";


interface NavigationIcons {
	nextStepRoute?: RelativePathString;
	prevStepRoute?: RelativePathString;
	disabledNext?: boolean;
}

export default function NavigationIcons({nextStepRoute, prevStepRoute, disabledNext}: NavigationIcons) {

	const router = useRouter();

	const backgroundColor = useThemeColor({}, 'tint');
	const prevStepBackgroundColor = useThemeColor({}, 'muted');


	const nextStep = () => {
		if(nextStepRoute) {
			router.push(nextStepRoute)
		}
	}

	const prevStep = () => {
		if(prevStepRoute) {
			router.back();
		}
	}

	return (
		<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
			{prevStepRoute && (
				<TouchableOpacity  style={[styles.arrowView, {backgroundColor: prevStepBackgroundColor}]} onPress={prevStep}>
					<ThemedIcon name={"arrow-back-outline"} size={50} iconColor={"white"} />
				</TouchableOpacity>
			)}
			{nextStepRoute && (
				<TouchableOpacity disabled={disabledNext} style={[styles.arrowView, {backgroundColor: disabledNext ? prevStepBackgroundColor : backgroundColor}]} onPress={nextStep}>
					<ThemedIcon name={"arrow-forward-outline"} size={50} iconColor={"white"} />
				</TouchableOpacity>
			)}
		</View>
	)
}


const styles = StyleSheet.create({
	arrowView: {
		marginTop: 25,
		borderRadius: 40,
		padding: 10
	}
})
