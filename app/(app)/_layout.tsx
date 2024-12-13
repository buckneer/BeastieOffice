import {Stack} from "expo-router";
import {App} from "expo-router/build/rsc/entry";


export default function AppLayout(){
	return (
		<Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="(office)" />
			{/*<Stack.Screen name="(office)" />*/}
		</Stack>
	)
}
