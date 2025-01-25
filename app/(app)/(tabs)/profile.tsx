import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Modal,
	TextInput,
	TouchableOpacity,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useSession } from "@/components/ctx";
import { ThemedText } from "@/components/themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProfileItem from "@/components/ProfileItem";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "@/constants/Firebase";
import {Office, Role} from "@/types";

export default function Profile() {
	const { session, signOut } = useSession();
	const router = useRouter();

	const [modalVisible, setModalVisible] = useState(false);
	const [joiningCode, setJoiningCode] = useState("");
	const [resultMessage, setResultMessage] = useState<string>("");

	const backgroundColor = useThemeColor({}, "tint");

	if (!session) {
		return <Redirect href="/sign-in" />;
	}

	const handlePreviewRoleAndOffice = async (code: string) => {
		if (code.length !== 6) {
			setResultMessage("");
			return;
		}

		try {
			const officesCollectionRef = collection(db, "offices");
			const officesSnapshot = await getDocs(officesCollectionRef);

			let foundRole: Role | null = null;
			let foundOfficeId: string | null = null;

			// Search for the role and office based on the joining code
			officesSnapshot.forEach((doc) => {
				const officeData = doc.data() as Office;
				if (Array.isArray(officeData.roles)) {
					const matchingRole = officeData.roles.find((role) => role.joiningCode === code);

					if (matchingRole) {
						foundRole = matchingRole;
						foundOfficeId = doc.id;
					}
				}
			});

			if (foundRole && foundOfficeId) {
				setResultMessage(
					`Preview: You are joining the role "${(foundRole as Role).name}" in Office ID: ${foundOfficeId}.`
				);
			} else {
				setResultMessage("No matching role or office found for the provided joining code.");
			}
		} catch (error) {
			console.error("Error previewing role and office:", error);
			setResultMessage("An error occurred while previewing the role and office.");
		}
	};

	const handleJoinOffice = async () => {
		if (!joiningCode) {
			setResultMessage("Please enter a joining code.");
			return;
		}

		try {
			const officesCollectionRef = collection(db, "offices");
			const officesSnapshot = await getDocs(officesCollectionRef);

			let foundRole: Role | null = null;
			let foundOfficeId: string | null = null;

			// Search for the role based on the joining code
			officesSnapshot.forEach((doc) => {
				const officeData = doc.data() as Office;
				if (Array.isArray(officeData.roles)) {
					const matchingRole = officeData.roles.find((role) => role.joiningCode === joiningCode);

					if (matchingRole) {
						foundRole = matchingRole;
						foundOfficeId = doc.id;
					}
				}
			});

			if (foundRole && foundOfficeId) {
				const userDocRef = doc(db, "users", session.uid);
				const userSnapshot = await getDoc(userDocRef);

				if (!userSnapshot.exists()) {
					setResultMessage("User not found.");
					return;
				}

				const userData = userSnapshot.data();
				const joined = userData.joined || [];

				const isAlreadyJoined = joined.some(
					(entry: { role: string; officeId: string }) =>
						entry.role === foundRole!.name && entry.officeId === foundOfficeId
				);

				if (isAlreadyJoined) {
					setResultMessage("You have already joined this role in this office.");
					return;
				}

				const updatedJoined = [
					...joined,
					{ role: (foundRole as Role).name, officeId: foundOfficeId },
				];

				await updateDoc(userDocRef, { joined: updatedJoined });

				setResultMessage(
					`You have successfully joined the role "${(foundRole as Role).name}" in Office ID: ${foundOfficeId}.`
				);

				setTimeout(() => {
					setJoiningCode("");
					setResultMessage("");
					setModalVisible(false);
				}, 1000);
			} else {
				setResultMessage("No matching role found for the provided joining code.");
			}
		} catch (error) {
			console.error("Error joining office:", error);
			setResultMessage("An error occurred while trying to join the office.");
		}
	};




	return (
		<SafeAreaView style={styles.containerView}>
			<View style={styles.profileView}>
				<View style={[styles.profileImageView, { backgroundColor }]}>
					<Ionicons name={"person"} size={30} color={"#FFF"} />
				</View>
				<ThemedText type="subtitle">{session.username}</ThemedText>
				<ThemedText type="subtitle">{session.email}</ThemedText>
			</View>

			<ProfileItem
				icon={"add-outline"}
				text="Create Office"
				onPress={() => {
					router.push("/(app)/(office)/home");
				}}
			/>
			<ProfileItem
				icon={"people-outline"}
				text="My Offices"
				onPress={() => {
					router.push("/(app)/(my)/my-offices");
				}}
			/>
			<ProfileItem
				icon={"person-add-outline"}
				text="Join Office"
				onPress={() => setModalVisible(true)}
			/>
			<ProfileItem icon={"analytics-outline"} text="Joined in Offices"  onPress={() => router.push("../(my)//joined-offices")}/>
			<ProfileItem icon={"exit-outline"} text="Logout" alt={true} onPress={signOut} />

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Enter Joining Code</Text>
						<TextInput
							style={styles.input}
							placeholder="Joining Code"
							value={joiningCode}
							onChangeText={(code) => {
								setJoiningCode(code);
								if (code.length === 6) {
									handlePreviewRoleAndOffice(code);
								}
							}}
						/>
						{resultMessage ? (
							<Text style={styles.resultMessage}>{resultMessage}</Text>
						) : null}
						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.button, styles.cancelButton]}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, { backgroundColor }]}
								onPress={handleJoinOffice}
							>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
	},
	profileView: {
		padding: 10,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 20,
		gap: 20,
	},
	profileImageView: {
		padding: 10,
		borderRadius: 20,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	input: {
		width: "100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 15,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	button: {
		flex: 1,
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginHorizontal: 5,
	},
	cancelButton: {
		backgroundColor: "#ccc",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	resultMessage: {
		color: "blue", // Or any color you like
		fontSize: 16,
		marginTop: 10,
		textAlign: "center",
	},
});
