import Button from "@/components/Button";
import { StyleSheet, View } from "react-native";

export default function TugasIndex() {
	return (
		<View style={style.container}>
			<Button
				style={[style.button, style.flexCenter]}
				location="./AlertPrimakara"
				text="1. Alert Primakara"
			/>
			<Button
				style={[style.button, style.flexCenter]}
				location="./Gallery"
				text="2. Gallery 10 foto"
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
		color: "white",
		fontWeight: "700",
		fontSize: 18,
		textAlign: "left",
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
});
