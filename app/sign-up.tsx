import React, { useState } from "react";
import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	Text,
	ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import IconTextInput from "@/components/themed/IconTextView";
import Checkbox from "@/components/themed/Checkbox";
import { Colors } from "@/constants/Colors";
import { Link, Redirect } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/constants/Firebase";
import { useFriendlyError } from "@/hooks/useFirebaseError";
import { useSession } from "@/components/ctx";

const SignUp: React.FC = () => {
	const { session } = useSession();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { error, setFriendlyError, clearError } = useFriendlyError();

	if (session) {
		return <Redirect href="./(app)" />;
	}

	const handleSignUp = async () => {
		clearError();

		if (password !== confirmPassword) {
			setFriendlyError("Passwords do not match");
			return;
		}

		setIsLoading(true);

		try {
			// Create user in Firebase Authentication
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			const { user } = userCredential;

			// Save user information to Firestore
			await setDoc(doc(db, "users", user.uid), {
				username,
				email,
				createdAt: new Date().toISOString(),
			});

			console.log("User created and saved to Firestore:", user.uid);
		} catch (err: any) {
			setPassword("");
			setConfirmPassword("");
			setFriendlyError(err); // Set friendly error message
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.safeArea}
		>
			<ThemedView style={styles.container}>
				<View style={styles.greetingText}>
					<ThemedText type="heading">Welcome</ThemedText>
				</View>
				<View>
					<ThemedText type="heading" textColor="tint">
						Beastie OfficeR
					</ThemedText>
				</View>

				<View style={styles.mutedTextContainer}>
					<ThemedText type="default" textColor="muted">
						Create an account to access all tasks and start organizing!
					</ThemedText>
				</View>

				<View style={styles.inputsContainer}>
					<IconTextInput
						icon={"person"}
						value={username}
						onChangeText={setUsername}
						placeholder="Username"
					/>
					<IconTextInput
						icon={"mail"}
						value={email}
						onChangeText={setEmail}
						placeholder="Email"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<IconTextInput
						icon={"key"}
						value={password}
						onChangeText={setPassword}
						placeholder="Password"
						secureTextEntry
					/>
					<IconTextInput
						icon={"key"}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						placeholder="Confirm Password"
						secureTextEntry
					/>
				</View>

				{error && <Text style={styles.error}>{error}</Text>}

				<View style={styles.rememberContainer}>
					<Checkbox label="I agree to the terms and conditions" />
					<Link href="/sign-in" asChild>
						<TouchableOpacity>
							<ThemedText type="link">Already have an account? Sign In</ThemedText>
						</TouchableOpacity>
					</Link>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={handleSignUp}
					disabled={isLoading}
				>
					<Text style={styles.buttonText}>
						{isLoading ? "Signing Up..." : "Register"}
					</Text>
				</TouchableOpacity>

				{isLoading && <ActivityIndicator style={styles.loading} />}
			</ThemedView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1 },
	container: { flex: 1, paddingHorizontal: 16 },
	greetingText: { marginTop: 64, flexDirection: "row", gap: 10 },
	mutedTextContainer: { marginTop: 50 },
	inputsContainer: { marginTop: 20 },
	rememberContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 10,
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 15,
		paddingHorizontal: 32,
		borderRadius: 40,
		backgroundColor: Colors.dark.tint,
		marginTop: 20,
	},
	buttonText: { color: "#fff", fontSize: 18 },
	error: { color: "red", marginTop: 10, textAlign: "center" },
	loading: { marginTop: 16 },
});

export default SignUp;
