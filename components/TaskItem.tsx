import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {ThemedText} from "@/components/themed/ThemedText";


interface TaskItemProps {
	active?: boolean
}


const TaskItem = ({active} : TaskItemProps) => {

	const backgroundColor = active ? useThemeColor({}, 'tint') : useThemeColor({}, 'background');
	const borderBottomColor = useThemeColor({}, 'muted');

	return (
		<View style={[styles.container, {borderBottomColor}]}>
			<ThemedText type='subtitle'>
				10:30
			</ThemedText>
			<View style={[styles.taskView, { backgroundColor, flex: 1 }]}>
				<ThemedText type='subtitle'>Hello World</ThemedText>
				<ThemedText>10:30 - 13:00</ThemedText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
		padding: 20,
		paddingVertical: 20,
		borderRadius: 10,
		flexDirection: 'row',
		gap: 10,
		borderBottomWidth: 0.5,
		alignItems: 'center'
	},
	taskView: {
		padding: 10,
		borderRadius: 20
	}
})

export default TaskItem;
