import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import { buttonStyles } from "@/styles/button";
import { textStyles } from "@/styles/text";

export default function RouteButton({
	title,
	location = "/",
}: {
	title: string;
	location?: string;
}) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={buttonStyles.default}
			onPress={() => router.push(location as never)}
		>
			<Text style={[textStyles.subheading, { color: "white" }]}>{title}</Text>
		</TouchableOpacity>
	);
}
