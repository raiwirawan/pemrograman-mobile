import RouteButton from "@/components/RouteButton";
import { Text, View } from "react-native";

import { textStyles } from "@/styles/text";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={textStyles.heading}>TUGAS 2</Text>
			<Text style={[textStyles.subheading, { marginBottom: 20 }]}>
				Silahkan pilih mau melihat yang mana
			</Text>
			<RouteButton
				title="Praktikum"
				location="/praktikum"
				styles={{ width: 200 }}
				textStyle={{ textAlign: "center" }}
			/>
			<RouteButton
				title="Tugas Mandiri"
				location="/tugas_mandiri"
				styles={{ width: 200 }}
				textStyle={{ textAlign: "center" }}
			/>
		</View>
	);
}
