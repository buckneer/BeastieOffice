import React, { createContext, ReactNode, useContext, useState } from "react";
import {collection, addDoc, where, getDocs, doc, setDoc, query} from "firebase/firestore";
import { db } from "@/constants/Firebase";
import {useSession} from "@/components/ctx";
import {Role, SetupDataContextType} from "@/types";

// interface Role {
// 	name: string;
// 	color: "green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral";
// 	workingHours?: number;
// 	salary?: number;
// }
//
// interface SetupDataContextType {
// 	officeName: string;
// 	workspaces: number;
// 	roles: Role[];
// 	setOfficeName: (name: string) => void;
// 	setWorkspaces: (count: number) => void;
// 	addRole: (role: Role) => void;
// 	editRole: (ind: number, updates: Partial<Role>) => void;
// 	saveToFirestore: () => Promise<void>;
// }

const SetupDataContext = createContext<SetupDataContextType | undefined>(undefined);

interface SetupDataProviderProps {
	children: ReactNode;
}

export const SetupDataProvider = ({ children }: SetupDataProviderProps) => {
	const [officeName, setOfficeName] = useState<string>("");
	const [workspaces, setWorkspaces] = useState<number>(0);
	const {session} = useSession();
	const [roles, setRoles] = useState<Role[]>([]);

	const generateJoiningCode = () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let code = "";
		for (let i = 0; i < 6; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return code;
	};

	const addRole = (role: Role) => {
		setRoles((prevRoles) => [
			...prevRoles,
			{ ...role, workingHours: 0, salary: 0, joiningCode: generateJoiningCode() },
		]);
	};

	const editRole = (ind: number, updates: Partial<Role>) => {
		if (ind < 0 || ind >= roles.length) {
			console.error("Index out of bounds");
			return;
		}

		const updatedRoles = [...roles];
		updatedRoles[ind] = { ...updatedRoles[ind], ...updates };
		setRoles(updatedRoles);
	};

	// Save data to Firestore
	const saveToFirestore = async () => {


		const officeData = {
			ownerId: session!.uid,
			officeName,
			workspaces,
			roles,
			createdAt: new Date().toISOString(),
		};

		try {
			const officesCollection = collection(db, "offices");

			// Query for existing document with the same ownerId
			const existingOfficeQuery = query(officesCollection, where("ownerId", "==", session!.uid), where('officeName', "==", officeName));
			const querySnapshot = await getDocs(existingOfficeQuery);

			if (!querySnapshot.empty) {
				// If document exists, update it
				const docId = querySnapshot.docs[0].id; // Get the ID of the first matching document
				const docRef = doc(db, "offices", docId);

				await setDoc(docRef, officeData, { merge: true }); // Update document with merge option
				console.log("Office data updated successfully!");
			} else {
				// If no document exists, create a new one
				await addDoc(officesCollection, officeData);
				console.log("Office data saved successfully!");
			}
		} catch (error) {
			console.error("Error saving office data:", error);
		}
	};

	return (
		<SetupDataContext.Provider
			value={{
				officeName,
				workspaces,
				roles,
				setOfficeName,
				setWorkspaces,
				addRole,
				editRole,
				saveToFirestore,
			}}
		>
			{children}
		</SetupDataContext.Provider>
	);
};

export const useSetupData = (): SetupDataContextType => {
	const context = useContext(SetupDataContext);
	if (!context) {
		throw new Error("useSetupData must be used within a SetupDataProvider");
	}
	return context;
};
