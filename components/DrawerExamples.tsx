import {
	createDrawerNavigator,
	DrawerNavigationProp,
} from "@react-navigation/drawer";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import ProfileScreen from "../app/ProfileScreen";

function DrawerExamplesScreen() {
	const navigation = useNavigation<DrawerNavigationProp<any>>();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button onPress={() => navigation.openDrawer()}>Open drawer</Button>
		</View>
	);
}

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
	return (
		<LeftDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
			<LeftDrawer.Screen name="Home" component={DrawerExamplesScreen} />
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
