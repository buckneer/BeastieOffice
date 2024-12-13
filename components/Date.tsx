import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface DateProps {
	date: any
	onSelectDate: (date: any) => void
	selected: any
}

const Date = ({ date, onSelectDate, selected }: DateProps) => {
	const day =
		moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
			? 'Today'
			: moment(date).format('ddd')
	const dayNumber = moment(date).format('D')
	const fullDate = moment(date).format('YYYY-MM-DD')

	const active = selected === fullDate
	const activeBackground = useThemeColor({}, 'tint')
	const inactiveBackground = useThemeColor({}, 'background')
	const textColor = useThemeColor({}, 'text')
	const color = active ? '#FFF' : textColor

	return (
		<TouchableOpacity
			onPress={() => onSelectDate(fullDate)}
			style={[
				styles.card,
				{ backgroundColor: active ? activeBackground : inactiveBackground },
			]}
		>
			<Text style={[styles.big, { color }]}>{day}</Text>
			<View style={{ height: 10 }} />
			<Text
				style={[
					styles.medium,
					{ color },
					active && { fontWeight: 'bold', fontSize: 24 },
				]}
			>
				{dayNumber}
			</Text>
		</TouchableOpacity>
	)
}

export default Date

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		borderColor: '#ddd',
		padding: 10,
		marginVertical: 10,
		alignItems: 'center',
		height: 90,
		width: 80,
		marginHorizontal: 5,
	},
	big: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	medium: {
		fontSize: 16,
	},
})
