import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Redirect} from "expo-router";
import {useSession} from "@/components/ctx";
import {ThemedText} from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";

export default function Tasks() {

	const {session, signOut} = useSession();

	if (!session) {
		return <Redirect href="/sign-in" />;
	}


	return (
		<KeyboardAvoidingView
			style={{

			}}
		>
			<SafeAreaView>
				<View style={styles.container}>
					<ThemedText type={'title'}>Create new task</ThemedText>
				</View>
				<View style={styles.taskTypeView}>
					<TouchableOpacity>
						<ThemedText type="subtitle">Daily Task</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity>
						<ThemedText type="subtitle">Weekly Task</ThemedText>
					</TouchableOpacity>
				</View>
				<View style={styles.inputsView}>
					<View style={styles.inputContainer}>
						<ThemedText>Task Name:</ThemedText>
						<ThemedTextInput passwordRules="Cool Task Name" />
					</View>
					<View style={styles.inputContainer}>
						<ThemedText>Task Time:</ThemedText>
						<ThemedTextInput passwordRules="Cool Task Name" />
					</View>
					<View style={styles.inputContainer}>
						<ThemedText>Assign Task to Office:</ThemedText>
						<ScrollView>
							<ThemedText>Developers</ThemedText>
							<ThemedText>Designers</ThemedText>
							<ThemedText>Office 1</ThemedText>
							<ThemedText>Office 2</ThemedText>
							<ThemedText>Restaurant 1</ThemedText>
							<ThemedText>Restaurant 2</ThemedText>
						</ScrollView>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	taskTypeView: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 40,
		marginTop: 20
	},

	inputsView: {
		marginTop: 10,
		marginHorizontal: 20,
	},

	inputContainer: {
		marginTop: 10
	}
})
