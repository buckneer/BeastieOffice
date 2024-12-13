import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Navigator, Stack, Tabs} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import {AuthProvider} from "@/components/ctx";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Colors} from "@/constants/Colors";
import CustomTabBar from "@/components/navigation/TabBar";


export default function TabLayout() {

	const colorScheme = useColorScheme();


	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
			tabBar={(props) => <CustomTabBar {...props} />}>
			<Tabs.Screen name="index" options={{
				title: 'Tasks',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
				),
			}} />

			<Tabs.Screen name="tasks" options={{
				title: 'New Task',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
				),
			}} />
			<Tabs.Screen name="dashboard" options={{
				title: 'Salary',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={color} />
				),
			}} />
			<Tabs.Screen name="profile" options={{
				title: 'Profile',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
				),
			}} />
		</Tabs>
	);
}
