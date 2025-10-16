import { containerStyles } from "@/styles/container";
import { textStyles } from "@/styles/text";
import { Text, View } from "react-native";

interface GreetingsProps {
	name: string;
}

export function Greetings(props: GreetingsProps) {
	return (
		<View style={{ alignItems: "center" }}>
			<Text style={textStyles.subheading}>Hello {props.name}!</Text>
		</View>
	);
}

export default function LotsOfGreetings() {
	return (
		<View style={containerStyles.container}>
			<Greetings name="Rizky" />
			<Greetings name="Bagas" />
			<Greetings name="Fauzan" />
		</View>
	);
}
