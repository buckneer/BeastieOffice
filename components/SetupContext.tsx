import React, {createContext, ReactNode, useContext, useState} from 'react';

// Define the shape of Role data
interface Role {
	name: string;
	color: "green" | "blue" | "rose" | "orange" | "purple" | "cyan" | "amber" | "coral";
	workingHours?: number;
	salary?: number;
}

// Define the SetupDataContextType
interface SetupDataContextType {
	officeName: string;
	workspaces: number;
	roles: Role[];
	setOfficeName: (name: string) => void;
	setWorkspaces: (count: number) => void;
	addRole: (role: Role) => void;
	editRole: (ind: number, updates: Role) => void;
}


// Create the context
const SetupDataContext = createContext<SetupDataContextType | undefined>(undefined);

interface SetupDataProps {
	children: ReactNode;
}

// Provider Component
export const SetupDataProvider = ({ children } : SetupDataProps) => {
	const [officeName, setOfficeName] = useState<string>('');
	const [workspaces, setWorkspaces] = useState<number>(0);
	const [roles, setRoles] = useState<Role[]>([]);

	const addRole = (role: Role) => {
		setRoles((prevRoles) => [...prevRoles, {...role, workingHours: 0, salary: 0}]);
	};

	const editRole = (ind: number, updates: Partial<Role>) => {
		if (ind < 0 || ind >= roles.length) {
			console.error('Index out of bounds');
			return;
		}

		// Update the specific properties of the role at the given index
		roles[ind] = { ...roles[ind], ...updates };
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
			}}
		>
			{children}
		</SetupDataContext.Provider>
	);
};

// Hook for consuming the context
export const useSetupData = (): SetupDataContextType => {
	const context = useContext(SetupDataContext);
	if (!context) {
		throw new Error('useSetupData must be used within a SetupDataProvider');
	}
	return context;
};
