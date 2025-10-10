import RouteButton from "@/components/RouteButton";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>TUGAS 2</Text>
			<Text>Silahkan pilih mau melihat yang mana</Text>
			<RouteButton title="Praktikum" location="/praktikum" />
			<RouteButton title="Tugas Mandiri" location="/tugas_mandiri" />
		</View>
	);
}
