import { useRouter } from "@/.expo/types/router";
import { Text, TouchableOpacity } from "react-native";

export default function RouteButton({
	title,
	location = "/",
}: {
	title: string;
	location?: string;
}) {
	const router = useRouter();

	return (
		<TouchableOpacity onPress={() => router.push(location as never)}>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
}
