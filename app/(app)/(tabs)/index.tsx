import React, {useEffect, useRef, useState} from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";
import { useSession } from "@/components/ctx";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import TaskItem from "@/components/TaskItem";
import AnimatedHeader from "@/components/AnimatedHeader";
import {ThemedAnimatedView} from "@/components/themed/ThemedAnimatedView";
import {Colors} from "@/constants/Colors";
import Calendar from "@/components/AnimatedHeader";
import moment from "moment/moment";

export default function Index() {
	const [selectedDate, setSelectedDate] = useState<any>(null);
	const scrollY = useRef(new Animated.Value(0)).current;
	const { session } = useSession();


	useEffect(() => {
		setSelectedDate(moment().format('YYYY-MM-DD') );
	}, [])

	// Animations for header container and title
	const animatedContainerStyle = {
		paddingTop: scrollY.interpolate({
			inputRange: [0, 30],
			outputRange: [80, 0], // Adjust size to make the header smaller
			extrapolate: "clamp",
		}),
		paddingBottom: scrollY.interpolate({
			inputRange: [0, 30],
			outputRange: [40, 0], // Reduce padding as you scroll
			extrapolate: "clamp",
		}),
	};

	const animatedTitleStyle = {
		opacity: scrollY.interpolate({
			inputRange: [0, 30],
			outputRange: [1, 0], // Fade out the title
			extrapolate: "clamp",
		}),
		paddingBottom: scrollY.interpolate({
			inputRange: [0, 30],
			outputRange: [20, 0],
			extrapolate: "clamp",
		})
	};

	if (!session) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<View style={styles.container}>
			{/* Header with animation */}
			<ThemedAnimatedView style={[styles.calendarContainer, animatedContainerStyle]}>
				<View>
					<Calendar scrollY={scrollY} onSelectDate={setSelectedDate} selected={selectedDate} />
				</View>
			</ThemedAnimatedView>

			{/* Task list */}
			<View>
				<ThemedText style={styles.typesTexts} type="subtitle">
					Today's Tasks
				</ThemedText>
			</View>

			<ScrollView
				style={styles.taskView}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
			>
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	calendarContainer: {
		paddingTop: 80,
		paddingBottom: 40,
		borderBottomEndRadius: 40,
		borderBottomStartRadius: 40,
		overflow: "hidden",
	},
	calendarTitleView: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		marginBottom: 20,
	},
	dateView: {
		padding: 10,
		alignItems: "center",
	},
	typesTexts: {
		padding: 10,
	},
	taskView: {
		flex: 1,
	},
});
