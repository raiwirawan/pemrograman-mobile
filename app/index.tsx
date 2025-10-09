import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={style.container}>
			<Text style={style.textStyle}>
				Silahkan Pilih Menu yang Ingin Diakses :
			</Text>
			<Button
				style={style.button}
				location={"/praktikum"}
				text="Praktikum"
				textStyle={style.buttonTextStyle}
			/>
			<Button
				style={style.button}
				location={"/tugas"}
				text="Tugas"
				textStyle={style.buttonTextStyle}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textStyle: {
		fontSize: 20,
		textAlign: "center",
		marginBottom: 20,
		fontWeight: "700",
	},
	button: {
		backgroundColor: "green",
		width: "100%",
		paddingVertical: 20,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
	},
	buttonTextStyle: {
		color: "white",
		fontWeight: "700",
		fontSize: 18,
		textAlign: "center",
	},
});
