import {StyleSheet, Text, View} from "react-native";
import {useSession} from "@/components/ctx";
import {ThemedText} from "@/components/themed/ThemedText";

export default function JoinedOffices() {

	const { session } = useSession();


	return (
		<View>
			{session?.joined?.map(item => (
				<View>
					<ThemedText>{item.officeId}</ThemedText>
					<ThemedText>{item.role}</ThemedText>
				</View>
			))}
		</View>
	)
}


const styles = StyleSheet.create({})
