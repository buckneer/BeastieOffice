import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Redirect, router, useRouter} from "expo-router";
import {useSession} from "@/components/ctx";
import {Styles} from "@expo/config-plugins/build/android";
import {ThemedText} from "@/components/themed/ThemedText";
import {Colors} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useThemeColor} from "@/hooks/useThemeColor";
import ProfileItem from "@/components/ProfileItem";

export default function Profile() {

	const {session, signOut} = useSession();
	const router = useRouter();

	const backgroundColor = useThemeColor({}, 'tint');

	if (!session) {
		return <Redirect href="/sign-in" />;
	}


	return (
		<SafeAreaView
			style={styles.containerView}
		>
			<View style={styles.profileView}>
				<View style={[styles.profileImageView, {backgroundColor}]}>
					<Ionicons name={'person'} size={30} color={"#FFF"} />
				</View>
				<ThemedText type="subtitle">{session.email}</ThemedText>
			</View>

			<ProfileItem icon={'add-outline'} text="Create Office" onPress={() => {router.push('/(app)/(office)/home')}} />
			<ProfileItem icon={'people-outline'} text="My Offices" />
			<ProfileItem icon={'person-add-outline'} text="Join Office" />
			<ProfileItem icon={'exit-outline'} text="Logout" alt={true} onPress={signOut} />

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
		gap: 20
	},
	profileImageView: {
		padding: 10,
		borderRadius: 20,
	}
})
