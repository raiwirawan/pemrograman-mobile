import { useState } from "react";
import { Text, View } from "react-native";

export function Blink(props: { text: string }) {
	const [isShowingText, setIsShowingText] = useState(true);

	setInterval(() => {
		setIsShowingText((previousState) => !previousState);
	}, 1000);

	if (!isShowingText) {
		return null;
	}

	return <Text style={{ fontSize: 30 }}>{props.text}</Text>;
}

export default function BlinkApp() {
	return (
		<View>
			<Blink text="I love to blink" />
			<Blink text="Yes blinking is so great" />
			<Blink text="Why did they ever take this out of HTML" />
			<Blink text="Look at me look at me look at me" />
		</View>
	);
}
