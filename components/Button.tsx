import { Link } from "expo-router";

export default function Button({
	style,
	location = "/",
	text = "Press Me",
}: {
	style: any;
	location?: any;
	text?: string;
}) {
	return (
		<Link style={style} href={location}>
			{text}
		</Link>
	);
}
