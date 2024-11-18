import { Text, View } from "react-native";
import React from "react";
import {Redirect} from "expo-router";
import {useSession} from "@/components/ctx";

export default function Tasks() {

	const {session, signOut} = useSession();

	if (!session) {
		return <Redirect href="/sign-in" />;
	}


	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>This is Tasks screen</Text>
		</View>
	);
}
