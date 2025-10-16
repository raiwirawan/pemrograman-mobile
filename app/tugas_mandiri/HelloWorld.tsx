import { buttonStyles } from "@/styles/button";
import { textStyles } from "@/styles/text";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TugasHelloWorld() {
	const [isVisible, setIsVisible] = useState(false);

	const handlePress = () => {
		setIsVisible(!isVisible);
	};

	const buttonText = isVisible ? "Sembunyikan" : "Tampilkan";

	return (
		<View style={styles.container}>
			<Text style={textStyles.heading}>Tugas Hello World</Text>
			<Text
				style={[
					textStyles.subheading,
					{ marginVertical: 10, textAlign: "center", color: "#555" },
				]}
			>
				Ini adalah tugas dimana kita akan menampilkan teks Hello World ketika
				tombol di bawah ditekan.
			</Text>
			{/* Tombol yang memanggil handlePress saat diklik */}
			<TouchableOpacity onPress={handlePress} style={buttonStyles.secondary}>
				<Text style={[textStyles.body, { color: "#fff" }]}>{buttonText}</Text>
			</TouchableOpacity>
			{isVisible && <Text style={styles.helloText}>Hello World</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	helloText: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
});
