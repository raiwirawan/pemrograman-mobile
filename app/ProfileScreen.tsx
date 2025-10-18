import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

function MyBackButton() {
	const navigation = useNavigation();

	return (
		<Button
			onPress={() => {
				navigation.goBack();
			}}
		>
			Kembali ke Home Screen
		</Button>
	);
}

export default function ProfileScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ marginBottom: 10 }}>
				Kamu sekarang sedang di Profile Screen
			</Text>
			<MyBackButton />
		</View>
	);
}
