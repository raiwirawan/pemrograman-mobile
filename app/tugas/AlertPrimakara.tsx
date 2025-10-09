import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AlertPrimakara() {
	return (
		<View style={tugasStyles.container}>
			<Text style={tugasStyles.textStyle}>
				Tekan tombol di bawah untuk melihat alert bertuliskan
			</Text>
			<Text style={[tugasStyles.textStyle, tugasStyles.textBold]}>
				Primakara Luar Biasa
			</Text>
			<TouchableOpacity
				style={tugasStyles.alertButtonStyle}
				onPress={() => {
					alert("Primakara Luar Biasa");
				}}
			>
				<Text style={tugasStyles.alertTextStyle}>Alert</Text>
			</TouchableOpacity>
		</View>
	);
}

export const tugasStyles = StyleSheet.create({
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
	},
	textBold: {
		fontWeight: "700",
	},
	alertButtonStyle: {
		marginTop: 20,
		backgroundColor: "white",
		borderWidth: 3,
		borderColor: "red",
		padding: 10,
		borderRadius: 10,
		width: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	alertTextStyle: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: "700",
		color: "red",
	},
});
