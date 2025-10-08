import { View } from "react-native";

export default function ColoredBoxesFlex() {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ backgroundColor: "red", flex: 1 }}></View>
			<View style={{ backgroundColor: "green", flex: 2 }}></View>
			<View style={{ backgroundColor: "blue", flex: 3 }}></View>
		</View>
	);
}
