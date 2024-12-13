import { useState, useEffect } from 'react'
import {StyleSheet, Text, View, ScrollView, Animated} from 'react-native'
import moment from 'moment'
import Date from './Date'
import {ThemedText} from "@/components/themed/ThemedText";


export interface CalendarProps {
	onSelectDate: (date: any) => void
	selected: any
	scrollY: Animated.Value; // Added prop for animation
}

const Calendar = ({ onSelectDate, selected, scrollY } : CalendarProps) => {
	const [dates, setDates] = useState<any>([])
	const [scrollPosition, setScrollPosition] = useState(0)
	const [currentMonth, setCurrentMonth] = useState<string>()

	const getCurrentMonth = () => {
		const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM, YYYY')
		setCurrentMonth(month)
	}

	useEffect(() => {
		getCurrentMonth()
	}, [scrollPosition])

	// get the dates from today to 10 days from now, format them as strings and store them in state
	const getDates = () => {
		const _dates = []
		for (let i = 0; i < 10; i++) {
			const date = moment().add(i, 'days')
			_dates.push(date)
		}
		setDates(_dates)
	}

	useEffect(() => {
		getDates()
	}, [])

	const animatedTitleStyle = {
		opacity: scrollY.interpolate({
			inputRange: [0, 100],
			outputRange: [1, 0], // Fade out as you scroll
			extrapolate: "clamp",
		}),
		transform: [
			{
				translateY: scrollY.interpolate({
					inputRange: [0, 100],
					outputRange: [0, -50], // Move upwards as you scroll
					extrapolate: "clamp",
				}),
			},
		],
	};

	return (
		<>
			<Animated.View style={[styles.centered, animatedTitleStyle]}>
				<ThemedText style={styles.title}>{currentMonth}</ThemedText>
			</Animated.View>
			<View style={styles.dateSection}>
				<View style={styles.scroll}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{dates.map((date: any, index: any) => (
							<Date
								key={index}
								date={date}
								onSelectDate={onSelectDate}
								selected={selected}
							/>
						))}
					</ScrollView>
				</View>
			</View>
		</>
	)
}

export default Calendar

const styles = StyleSheet.create({
	centered: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	dateSection: {
		width: '100%',
		padding: 20,
	},
	scroll: {

	},
})
