import { initializeApp } from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore } from "@firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {getStorage} from "@firebase/storage";


// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDECECpY-eZMuG_kMmMY_smLqLsZ0NVAc4",
	authDomain: "beastieoffice.firebaseapp.com",
	projectId: "beastieoffice",
	storageBucket: "beastieoffice.firebasestorage.app",
	messagingSenderId: "305857928198",
	appId: "1:305857928198:web:1c914fce2a9882f202b787"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);
