import React, { useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	View,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	Text,
} from "react-native";
import { ThemedView } from "@/components/themed/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/themed/ThemedText";
import IconTextInput from "@/components/themed/IconTextView";
import { Colors } from "@/constants/Colors";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "@/constants/Firebase";

const { width: screenWidth } = Dimensions.get("window");

const ForgotPassword: React.FC = () => {
	const backgroundColor = useThemeColor({}, "background");

	const [email, setEmail] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handlePasswordReset = async () => {
		setIsLoading(true);
		setError("");
		setMessage("");
		try {
			await sendPasswordResetEmail(auth, email);
			setMessage("Password reset email sent successfully.");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
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
					<ThemedText type="heading">Forgot Password</ThemedText>
				</View>

				<View style={styles.instructions}>
					<ThemedText type="default" textColor="muted">
						Enter your email address to reset your password.
					</ThemedText>
				</View>

				<View style={styles.inputsContainer}>
					<IconTextInput
						icon={"mail"}
						value={email}
						onChangeText={setEmail}
						placeholder="Email"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>

				{error ? <Text style={styles.error}>{error}</Text> : null}
				{message ? <Text style={styles.message}>{message}</Text> : null}

				<TouchableOpacity
					style={styles.button}
					onPress={handlePasswordReset}
					disabled={isLoading}
				>
					<Text style={styles.buttonText}>Reset Password</Text>
				</TouchableOpacity>

				{isLoading && <ActivityIndicator style={styles.loading} />}
			</ThemedView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	greetingText: {
		marginTop: 64,
		marginBottom: 20,
	},
	instructions: {
		marginTop: 10,
		marginBottom: 20,
	},
	inputsContainer: {
		marginBottom: 20,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 15,
		paddingHorizontal: 32,
		borderRadius: 40,
		elevation: 3,
		backgroundColor: Colors.dark.tint,
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
	},
	error: {
		color: "red",
		marginBottom: 12,
		textAlign: "center",
	},
	message: {
		color: "green",
		marginBottom: 12,
		textAlign: "center",
	},
	loading: {
		marginTop: 16,
	},
});

export default ForgotPassword;
