import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Redirect} from "expo-router";
import {useSession} from "@/components/ctx";
import {ThemedText} from "@/components/themed/ThemedText";

export default function Dashboard() {

	const {session, signOut} = useSession();

	if (!session) {
		return <Redirect href="/sign-in" />;
	}


	return (
		<SafeAreaView

		>
			<View style={styles.salaryInView}>
				<ThemedText type='title'>SALARY IN 5 DAYS</ThemedText>
			</View>
			<View style={styles.prevPaymentsView}>
				<ThemedText type='subtitle'>Previous payments:</ThemedText>
			</View>
			<ScrollView>

			</ScrollView>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	salaryInView: {
		justifyContent: "center",
		alignItems: "center",
	},
	prevPaymentsView: {
		marginTop: 25,
		marginStart: 25
	}
})
