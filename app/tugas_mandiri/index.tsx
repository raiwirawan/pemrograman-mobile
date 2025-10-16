import RouteButton from "@/components/RouteButton";
import { containerStyles } from "@/styles/container";
import { textStyles } from "@/styles/text";
import { Text, View } from "react-native";

export default function Praktikum() {
	return (
		<View style={containerStyles.container}>
			<Text style={textStyles.heading}>Halaman Tugas Mandiri</Text>
			<RouteButton title="1. HelloWorld" location="/tugas_mandiri/HelloWorld" />
			<RouteButton title="2. Input" location="/tugas_mandiri/Input" />
		</View>
	);
}
