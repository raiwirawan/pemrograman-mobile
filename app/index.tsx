import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/src/hooks/useAuth";
import { AuthProvider } from "@/src/providers/AuthProvider";
import CreateNote from "@/src/screens/CreateNote";
import HomeScreen from "@/src/screens/HomeScreen";
import { LoginScreen } from "@/src/screens/LoginScreen";
import NoteDetail from "@/src/screens/NoteDetail";
import { RegisterScreen } from "@/src/screens/RegisterScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#FF6464" />
			</View>
		);
	}

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
		>
			{user ? (
				<>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="CreateNote" component={CreateNote} />
					<Stack.Screen name="NoteDetail" component={NoteDetail} />
				</>
			) : (
				<>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<AppNavigator />
		</AuthProvider>
	);
}
