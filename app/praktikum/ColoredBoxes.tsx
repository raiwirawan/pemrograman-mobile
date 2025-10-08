import { View } from "react-native";

export default function ColoredBoxes() {
	return (
		<>
			<View style={{ backgroundColor: "red", height: 50, width: 50 }}></View>
			<View
				style={{ backgroundColor: "green", height: 100, width: 100 }}
			></View>
			<View style={{ backgroundColor: "blue", height: 150, width: 150 }}></View>
		</>
	);
}
