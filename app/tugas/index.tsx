import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";

export default function TugasIndex() {
	return (
		<View style={style.container}>
			<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
				List Tugas
			</Text>
			<Button
				style={[style.button, style.flexCenter]}
				location="/tugas/AlertPrimakara"
				text="1. Alert Primakara"
				textStyle={style.textStyle}
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="/tugas/Gallery"
				text="2. Gallery 10 foto"
				textStyle={style.textStyle}
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
	textStyle: {
		color: "white",
		fontWeight: "700",
		fontSize: 18,
		textAlign: "left",
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
