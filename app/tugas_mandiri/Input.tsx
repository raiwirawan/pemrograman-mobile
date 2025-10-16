import React, { useState } from "react";
import {
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

export default function TugasInputSubmit() {
	const [currentInput, setCurrentInput] = useState("");

	const [submittedText, setSubmittedText] = useState("");

	const handleSubmit = () => {
		setSubmittedText(currentInput);

		setCurrentInput("");

		Keyboard.dismiss();
	};

	return (
		<View style={styles.container}>
			{/* 4. Komponen TextInput */}
			<TextInput
				style={styles.input}
				placeholder="Masukkan teks di sini..."
				value={currentInput}
				onChangeText={setCurrentInput}
			/>

			{/* 5. Tombol Submit */}
			<Button
				title="Submit Teks"
				onPress={handleSubmit}
				disabled={currentInput.trim().length === 0}
			/>

			{/* 6. Tampilan Hasil */}
			{submittedText.length > 0 && (
				<View style={styles.resultContainer}>
					<Text style={styles.resultLabel}>Teks yang Disubmit:</Text>
					<Text style={styles.resultText}>{submittedText}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 30,
		paddingTop: 80,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
		width: "90%",
		fontSize: 16,
	},
	resultContainer: {
		marginTop: 30,
		padding: 15,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		alignItems: "center",
		width: "90%",
	},
	resultLabel: {
		fontSize: 14,
		color: "#666",
	},
	resultText: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 5,
		color: "#333",
		textAlign: "center",
	},
});
