import Button from "@/components/Button";
import { StyleSheet, View } from "react-native";

export default function PraktikumIndex() {
	return (
		<View style={style.container}>
			<Button
				style={[style.button, style.flexCenter]}
				location={"/praktikum/ColoredTexts"}
				text="1. Text Berwarna"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxes"
				text="2. Box Berwarna Belum Flex"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxesFlex"
				text="3. Box Berwarna Sudah Flex"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxFlexDirection"
				text="4. Box Berwarna - Flex Direction"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxFDJC"
				text="5. Box Berwarna - Flex Direction, Justify Content"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxStretch"
				text="6. Box Berwarna - Align Items Stretch"
			/>
		</View>
	);
}

const style = StyleSheet.create({
	button: {
		width: "100%",
		backgroundColor: "blue",
		padding: 10,
		paddingVertical: 20,
		paddingLeft: 20,
		borderRadius: 20,
		marginBottom: 20,
		fontWeight: 700,
		fontSize: 18,
		color: "white",
	},
	flexCenter: {
		alignItems: "flex-start",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
});
