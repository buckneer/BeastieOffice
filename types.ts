// types.ts
import {User as FirebaseUser} from "firebase/auth";

export interface Role {
	name: string;
	color: "green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral";
	workingHours?: number;
	salary?: number;
	joiningCode?: string; // Added this property
}


export interface Office {
	id?: string;
	ownerId: string;
	officeName: string;
	workspaces: number;
	roles: Role[];
}


export interface SetupDataContextType {
	officeName: string;
	workspaces: number;
	roles: Role[];
	setOfficeName: (name: string) => void;
	setWorkspaces: (count: number) => void;
	addRole: (role: Role) => void;
	editRole: (ind: number, updates: Partial<Role>) => void;
	saveToFirestore: () => Promise<void>;
}


export interface Task {
	id?: string;
	officeId: string;
	taskName: string;
	createdAt: string;
	repeatableTime: string;
	taskType: "Daily" | "Weekly";
	assignedRoles: string[];
	completed: boolean;
	completedBy?: { id: string; name: string } | null;
}


export interface Joined {
	role: string;
	officeId: string;
}


export interface User extends FirebaseUser {
	joined?: Joined[];
	username?: string;
}
