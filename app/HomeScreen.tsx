import { Text, View } from "react-native";
import { Button } from "@react-navigation/elements";

export default function HomeScreen({
	navigation: { navigate },
}: {
	navigation: { navigate: (screen: string) => void };
}) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>This is the home screen of the app</Text>
			<Button onPress={() => navigate("Profile")}>Go to Profile</Button>
		</View>
	);
}
