import { useRouter } from "expo-router";
import { StyleProp, Text, TouchableOpacity } from "react-native";

export default function Button({
	style,
	location = "/",
	text = "Press Me",
	textStyle,
}: {
	style: StyleProp<any>;
	location?: string;
	text?: string;
	textStyle?: StyleProp<any>;
}) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={style}
			onPress={() => router.push(location as any)}
		>
			<Text style={textStyle}>{text}</Text>
		</TouchableOpacity>
	);
}
