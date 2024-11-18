import React from 'react';
import {TextInput, type TextInputProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";


export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
	active?: boolean;
};

const ThemedTextInput = ({lightColor, darkColor, active, ...rest} : ThemedTextInputProps) => {

	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

	return (
		<TextInput style={[{color, borderColor: color, borderWidth: .5, padding: 10, borderRadius: 20, fontSize: 20, fontWeight: 'bold'}]} {...rest}>

		</TextInput>
	);
};

export default ThemedTextInput;
