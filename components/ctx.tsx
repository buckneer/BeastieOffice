import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import {auth} from "@/constants/Firebase";

interface AuthContextType {
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	session: User | null;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	signIn: async () => {},
	signOut: async () => {},
	session: null,
	isLoading: true,
});

export function useSession() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useSession must be used within an AuthProvider');
	}
	return context;
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setSession(user);
			setIsLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setSession(userCredential.user);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async () => {
		setIsLoading(true);
		try {
			await firebaseSignOut(auth);
			console.log('User signed out');
			setSession(null);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}
