import { TouchableOpacity } from "react-native";

export default function AlertPrimakara() {
	return (
		<TouchableOpacity
			onPress={() => {
				alert("Primakara Luar Biasa");
			}}
		></TouchableOpacity>
	);
}
