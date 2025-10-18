import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MyBackButton() {
	const navigation = useNavigation();

	return (
		<Button
			onPress={() => {
				navigation.goBack();
			}}
		>
			Back
		</Button>
	);
}

export default function ProfileScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Profile Screen</Text>
			<MyBackButton />
		</View>
	);
}
