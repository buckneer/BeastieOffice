import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import ThemedSafeArea from "@/components/themed/ThemedSafeArea";
import {ThemedText} from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import NavigationIcons from "@/components/NavigationIcons";
import {useSetupData} from "@/components/SetupContext";


export default function OfficeDetails() {


	const { officeName, setOfficeName, workspaces, setWorkspaces, saveToFirestore } = useSetupData();
	// Office Name: A unique identifier for the office.
	// Industry/Type: Dropdown or text field (e.g., Restaurant, Tech Development, Marketing).
	// Number of Workspaces: Number of subdivisions (e.g., Restaurant 1, Office 2).

	const handleNext = async () => {
		try {
			await saveToFirestore(); // Save data to Firestore
			console.log("Data saved successfully");
		} catch (error) {
			console.error("Error saving data to Firestore:", error);
		}
	};

	// STEP 1
	return (
		<KeyboardAvoidingView style={styles.mainSafeAreaView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<SafeAreaView>
				<View>
					<ThemedText type='title' textColor='tint'>Setup your new Office!</ThemedText>
				</View>
				<View>
					<ThemedText style={styles.workspaceView} type="subtitle">What should we call your office?</ThemedText>
					<ThemedTextInput onChangeText={setOfficeName} value={officeName} placeholder="Super cool office name" style={styles.titleTextInput} />
				</View>
				<View style={styles.workspaceView}>
					<ThemedText type="subtitle">And how many workspaces do you have?</ThemedText>
					<ThemedTextInput onChangeText={(e) => setWorkspaces(parseInt(e))} value={workspaces.toString()}  placeholder="Number of workspaces" keyboardType='numeric' style={styles.titleTextInput} />
				</View>

				<NavigationIcons disabledNext={false} nextStepRoute={"./role-setup"} prevStepRoute={'./home'} onNext={handleNext} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}


const styles = StyleSheet.create({
	mainSafeAreaView: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	titleTextInput: {
		marginTop: 25,
	},
	workspaceView: {
		marginTop: 25,
	}
})
