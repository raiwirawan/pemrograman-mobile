import { View } from "react-native";

export default function ColoredBoxFDJC() {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<View style={{ backgroundColor: "red", width: 50, height: 50 }}></View>
			<View style={{ backgroundColor: "green", width: 50, height: 50 }}></View>
			<View style={{ backgroundColor: "blue", width: 50, height: 50 }}></View>
		</View>
	);
}
