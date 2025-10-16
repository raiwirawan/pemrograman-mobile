import { useRouter } from "expo-router";
import { StyleProp, Text, TouchableOpacity } from "react-native";

import { buttonStyles } from "@/styles/button";
import { textStyles } from "@/styles/text";

export default function RouteButton({
	title,
	location = "/",
	styles = {},
	textStyle = {},
}: {
	title: string;
	location?: string;
	styles?: StyleProp<any>;
	textStyle?: StyleProp<any>;
}) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={[buttonStyles.default, styles]}
			onPress={() => router.push(location as never)}
		>
			<Text style={[textStyles.subheading, { color: "white" }, textStyle]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
