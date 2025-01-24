import {
	FlatList,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useSession } from "@/components/ctx";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/constants/Firebase";
import DropDownPicker from "react-native-dropdown-picker";
import { Office, Role } from "@/types";
import Chip from "@/components/Chip";

export default function Tasks() {
	const { session } = useSession();
	const [selectedTaskType, setSelectedTaskType] = useState<string | null>("Daily");
	const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
	const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);
	const [offices, setOffices] = useState<Office[]>([]);
	const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string }[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	// Input states for Task Name and Time
	const [taskName, setTaskName] = useState("");
	const [taskTime, setTaskTime] = useState("");

	const tint = useThemeColor({}, "tint");

	if (!session) {
		return <Redirect href="/sign-in" />;
	}

	const handleTaskTypeSelect = (type: string) => {
		setSelectedTaskType(type);
	};

	const handleRoleToggle = (roleName: string) => {
		setSelectedRoles((prevSelectedRoles) =>
			prevSelectedRoles.includes(roleName)
				? prevSelectedRoles.filter((name) => name !== roleName)
				: [...prevSelectedRoles, roleName]
		);
	};

	useEffect(() => {
		const fetchOffices = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "offices"));
				const officesData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					ownerId: doc.data().ownerId,
					officeName: doc.data().officeName,
					workspaces: doc.data().workspaces,
					roles: doc.data().roles as Role[],
					joiningCode: doc.data().joiningCode,
				})) satisfies Office[];

				setOffices(officesData);

				setDropdownItems(
					officesData.map((office) => ({
						label: office.officeName,
						value: office.id,
					}))
				);
			} catch (error) {
				console.error("Error fetching offices:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOffices();
	}, []);

	useEffect(() => {
		const officeRoles = offices.find((item) => item.id === selectedOffice)?.roles as Role[];
		setRoles(officeRoles);
	}, [selectedOffice]);

	const handleSaveTask = async () => {
		if (!selectedOffice || !taskName || !taskTime || selectedRoles.length === 0) {
			alert("Please fill in all fields before saving.");
			return;
		}

		try {
			const taskData = {
				taskType: selectedTaskType,
				officeId: selectedOffice,
				taskName,
				taskTime,
				assignedRoles: selectedRoles,
				createdAt: new Date().toISOString(),
			};

			await addDoc(collection(db, "tasks"), taskData);

			alert("Task saved successfully!");
			// Reset inputs
			setTaskName("");
			setTaskTime("");
			setSelectedRoles([]);
			setSelectedOffice(null);
		} catch (error) {
			console.error("Error saving task:", error);
			alert("Failed to save the task. Please try again.");
		}
	};

	return (
		<KeyboardAvoidingView>
			<SafeAreaView>
				<View style={styles.container}>
					<ThemedText type="title">Create new task</ThemedText>
				</View>

				<View style={styles.taskTypeView}>
					<TouchableOpacity
						onPress={() => handleTaskTypeSelect("Daily")}
						style={[
							styles.taskTypeButton,
							selectedTaskType === "Daily" && { backgroundColor: tint },
						]}
					>
						<ThemedText
							type="subtitle"
							style={[
								selectedTaskType === "Daily" && { color: "white" },
							]}
						>
							Daily Task
						</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleTaskTypeSelect("Weekly")}
						style={[
							styles.taskTypeButton,
							selectedTaskType === "Weekly" && { backgroundColor: tint },
						]}
					>
						<ThemedText
							type="subtitle"
							style={[
								selectedTaskType === "Weekly" && { color: "white" },
							]}
						>
							Weekly Task
						</ThemedText>
					</TouchableOpacity>
				</View>
				<View style={styles.inputsView}>
					<View style={styles.inputContainer}>
						<ThemedText>Assign Task to Office:</ThemedText>
						<DropDownPicker
							open={dropdownOpen}
							value={selectedOffice}
							items={dropdownItems}
							setOpen={setDropdownOpen}
							setValue={setSelectedOffice}
							setItems={setDropdownItems}
							placeholder="Select an office"
							style={{
								borderColor: "#ccc",
								borderRadius: 8,
							}}
							dropDownContainerStyle={{
								borderColor: "#ccc",
								borderRadius: 8,
							}}
						/>
					</View>
					<View style={styles.inputContainer}>
						<ThemedText>Task Name:</ThemedText>
						<ThemedTextInput
							value={taskName}
							onChangeText={setTaskName}
							placeholder="Enter task name"
						/>
					</View>
					<View style={styles.inputContainer}>
						<ThemedText>Task Time:</ThemedText>
						<ThemedTextInput
							value={taskTime}
							onChangeText={setTaskTime}
							placeholder="Enter task time"
						/>
					</View>
					<View style={styles.inputContainer}>
						<FlatList
							data={roles}
							renderItem={({ item }) => (
								<Chip
									role={item}
									isSelected={selectedRoles.includes(item.name)}
									onPress={() => handleRoleToggle(item.name)}
								/>
							)}
							keyExtractor={(item) => item.name}
							numColumns={2}
							contentContainerStyle={styles.grid}
						/>
					</View>
				</View>
				<View style={{ margin: 20 }}>
					<TouchableOpacity
						style={{
							backgroundColor: tint,
							padding: 10,
							borderRadius: 8,
							alignItems: "center",
						}}
						onPress={handleSaveTask}
					>
						<ThemedText style={{ color: "white" }}>Save Task</ThemedText>
					</TouchableOpacity>
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
		marginTop: 20,
	},
	taskTypeButton: {
		padding: 10,
		borderRadius: 8,
	},
	inputsView: {
		marginTop: 10,
		marginHorizontal: 20,
	},
	inputContainer: {
		marginTop: 10,
	},
	grid: {
		justifyContent: "space-between",
	},
});
