import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";

export default function PraktikumIndex() {
	return (
		<View style={style.container}>
			<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
				List Praktikum
			</Text>
			<Button
				style={[style.button, style.flexCenter]}
				location={"/praktikum/ColoredTexts"}
				text="1. Text Berwarna"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxes"
				text="2. Box Berwarna Belum Flex"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxesFlex"
				text="3. Box Berwarna Sudah Flex"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxesFlexDirection"
				text="4. Box Berwarna - Flex Direction"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxesFDJC"
				text="5. Box Berwarna - Flex Direction, Justify Content"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/praktikum/ColoredBoxesStretch"
				text="6. Box Berwarna - Align Items Stretch"
				textStyle={style.buttonTextStyle}
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
	buttonTextStyle: {
		color: "white",
		fontWeight: "700",
		fontSize: 18,
		textAlign: "left",
	},
});
