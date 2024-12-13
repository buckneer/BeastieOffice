import {Stack} from "expo-router";
import {SetupDataProvider} from "@/components/SetupContext";


export default function OfficeLayout() {
	return (
		<SetupDataProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</SetupDataProvider>
	)
}
