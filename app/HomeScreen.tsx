import {
	createDrawerNavigator,
	DrawerNavigationProp,
} from "@react-navigation/drawer";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import ProfileScreen from "../app/ProfileScreen";

function HomeScreen() {
	const navigation = useNavigation<DrawerNavigationProp<any>>();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button onPress={() => navigation.openDrawer()}>Buka Drawer</Button>
			<Text style={{ marginVertical: 10 }}>ATAU</Text>
			<Button onPress={() => navigation.navigate("Profile")}>
				Pergi ke Profile Screen
			</Button>
		</View>
	);
}

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
	return (
		<LeftDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
			<LeftDrawer.Screen name="Home" component={HomeScreen} />
			<LeftDrawer.Screen name="Profile" component={ProfileScreen} />
		</LeftDrawer.Navigator>
	);
};

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
	return (
		<RightDrawer.Navigator
			screenOptions={{ drawerPosition: "right", headerShown: false }}
		>
			<RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
		</RightDrawer.Navigator>
	);
};

export default function DrawerExamples() {
	return <RightDrawerScreen />;
}
