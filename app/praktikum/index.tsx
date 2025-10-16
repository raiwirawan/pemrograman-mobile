import RouteButton from "@/components/RouteButton";
import { containerStyles } from "@/styles/container";
import { textStyles } from "@/styles/text";
import { Text, View } from "react-native";

export default function Praktikum() {
	return (
		<View style={containerStyles.container}>
			<Text style={textStyles.heading}>Halaman Praktikum</Text>
			<RouteButton title="1. Greetings" location="/praktikum/Greetings" />
			<RouteButton title="2. State" location="/praktikum/State" />
		</View>
	);
}
