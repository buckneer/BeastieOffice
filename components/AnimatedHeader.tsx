import React, { useState, useRef, useEffect } from 'react';
import {Animated, StyleSheet, Dimensions, FlatList} from 'react-native';
import moment from 'moment';
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const CENTER_POSITION = width / 2 - ITEM_WIDTH / 2;

const AnimatedHeader = () => {
	const [selectedDateIndex, setSelectedDateIndex] = useState(2); // Start at index 2 (current day)
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef<FlatList<any>>(null);

	const getDates = () => {
		const dates = [];
		const currentMonth = moment().month();
		const currentYear = moment().year();
		const daysInMonth = moment().daysInMonth();

		// Add two days from the previous month for centering
		for (let i = -2; i < 0; i++) {
			dates.push(moment().subtract(1, 'month').date(moment().subtract(1, 'month').daysInMonth() + i + 1));
		}

		// Add all dates for the current month
		for (let day = 1; day <= daysInMonth; day++) {
			dates.push(moment([currentYear, currentMonth, day]));
		}

		// Add two days from the next month for centering
		for (let i = 1; i <= 2; i++) {
			dates.push(moment().add(1, 'month').date(i));
		}

		return dates;
	};

	useEffect(() => {
		const dates = getDates();
		const today = moment().startOf('day');
		const index = dates.findIndex((date) => date.isSame(today, 'day'));
		if (index !== -1) {
			setSelectedDateIndex(index);
			if (flatListRef.current) {
				flatListRef.current.scrollToOffset({
					offset: index * ITEM_WIDTH,
					animated: false,
				});
			}
		}
	}, []);

	const handleMomentumScrollEnd = (event: any) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const centerIndex = Math.round(offsetX / ITEM_WIDTH);
		setSelectedDateIndex(centerIndex); // Update selected index
	};

	return (
		<ThemedView style={styles.container}>
			<Animated.FlatList
				ref={flatListRef}
				data={getDates()}
				keyExtractor={(item) => item.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={ITEM_WIDTH}
				decelerationRate="fast"
				contentContainerStyle={{ paddingHorizontal: CENTER_POSITION }}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item, index }) => {
					const inputRange = [
						(index - 1) * ITEM_WIDTH,
						index * ITEM_WIDTH,
						(index + 1) * ITEM_WIDTH,
					];

					// Adjust scaling and opacity for smooth animations
					const scale = scrollX.interpolate({
						inputRange,
						outputRange: [1, 1.5, 1],
						extrapolate: 'clamp',
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.5, 1, 0.5],
						extrapolate: 'clamp',
					});

					const isCentered = index === selectedDateIndex;

					return (
						<Animated.View
							style={[
								styles.dateContainer,
								{
									transform: [{ scale }],
									opacity,
								},
							]}
						>
							<ThemedText
								type="default"
								style={[styles.dateText, isCentered && styles.centeredDateText]}
							>
								{item.format('DD')}
							</ThemedText>
							<ThemedText
								type="default"
								style={[styles.dayText, isCentered && styles.centeredDayText]}
							>
								{item.format('dddd')}
							</ThemedText>
						</Animated.View>
					);
				}}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 140,
		backgroundColor: 'transparent',
	},
	dateContainer: {
		width: ITEM_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateText: {
		fontSize: 16,
	},
	dayText: {
		fontSize: 12,
	},
	centeredDateText: {

	},
	centeredDayText: {

	},
});

export default AnimatedHeader;
