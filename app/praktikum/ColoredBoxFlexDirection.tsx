import { View } from "react-native";

export default function ColoredBoxFlexDirection() {
	return (
		<View style={{ flex: 1, flexDirection: "row" }}>
			<View style={{ backgroundColor: "red", width: 50, height: 50 }}></View>
			<View style={{ backgroundColor: "green", width: 50, height: 50 }}></View>
			<View style={{ backgroundColor: "blue", width: 50, height: 50 }}></View>
		</View>
	);
}
