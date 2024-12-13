import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {ThemedText} from "@/components/themed/ThemedText";
import React, {type ComponentProps} from "react";
import {useThemeColor} from "@/hooks/useThemeColor";
import type {IconProps} from "@expo/vector-icons/build/createIconSet";


export interface ProfileItemProps {
	text: string;
	icon: keyof typeof Ionicons.glyphMap;
	onPress?: () => void;
	alt?: boolean;
}

const ProfileItem = ({text, icon, onPress, alt} : ProfileItemProps) => {


	const backgroundColor = useThemeColor({}, 'muted');
	const color = useThemeColor({}, alt ? 'tint' : 'text');

	return (
		<TouchableOpacity style={styles.profileView} onPress={onPress}>
			<View style={[styles.profileImageView]}>
				<Ionicons name={icon} size={30} color={color} />
			</View>
			<ThemedText type="subtitle" textColor={alt ? 'tint' : 'text'}>{text}</ThemedText>
		</TouchableOpacity>
	);
};


const styles = StyleSheet.create({
	profileView: {
		padding: 5,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		gap: 20
	},
	profileImageView: {
		padding: 10,
		borderRadius: 20,
	}
})

export default ProfileItem;
