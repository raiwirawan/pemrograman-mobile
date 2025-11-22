import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

export const HomeScreen = () => {
	const { user, logout } = useAuth();
	const [loggingOut, setLoggingOut] = useState(false);

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	const handleLogout = async () => {
		Alert.alert("Logout", "Are you sure you want to log out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Logout",
				style: "destructive",
				onPress: async () => {
					setLoggingOut(true);
					try {
						await logout();
						// Auto redirect oleh AppNavigator
					} catch (error) {
						console.error("Logout error:", error);
						Alert.alert("Error", "Failed to log out. Please try again.");
					} finally {
						setLoggingOut(false);
					}
				},
			},
		]);
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Header Section */}
			<View style={styles.header}>
				<Image
					source={{
						uri:
							user?.photoURL ??
							"https://randomuser.me/api/portraits/men/32.jpg",
					}}
					style={styles.profileImage}
				/>
				<Text style={styles.name}>Hi, {user?.displayName || user?.email}</Text>
				<Text style={styles.title}>Creative Technologist</Text>
				<Text style={styles.description}>
					Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
					sint. Velit officia consequat duis enim velit mollit. Exercitation
					veniam consequat sunt nostrud amet.
				</Text>

				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.resumeButton}>
						<Text style={styles.resumeButtonText}>Download Resume</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.logoutButton,
							loggingOut && styles.logoutButtonDisabled,
						]}
						onPress={handleLogout}
						disabled={loggingOut}
					>
						{loggingOut ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text style={styles.logoutButtonText}>Logout</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>

			{/* Social Media & Footer */}
			<View style={styles.footer}>
				<View style={styles.socialIcons}>
					<TouchableOpacity onPress={() => openURL("https://facebook.com")}>
						<Ionicons
							name="logo-facebook"
							size={28}
							color="#4267B2"
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => openURL("https://instagram.com")}>
						<Ionicons
							name="logo-instagram"
							size={28}
							color="#E1306C"
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => openURL("https://twitter.com")}>
						<Ionicons
							name="logo-twitter"
							size={28}
							color="#1DA1F2"
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => openURL("https://linkedin.com")}>
						<Ionicons
							name="logo-linkedin"
							size={28}
							color="#0077B5"
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.copyright}>
					Copyright ©2020 All rights reserved
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 60,
	},
	header: {
		alignItems: "center",
		padding: 24,
		backgroundColor: "#fff",
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 16,
	},
	name: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#18191F",
	},
	title: {
		fontSize: 20,
		color: "#474A57",
		marginBottom: 16,
	},
	description: {
		fontSize: 14,
		color: "#474A57",
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 24,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
		justifyContent: "center",
	},
	resumeButton: {
		backgroundColor: "#4CAF50",
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 8,
	},
	resumeButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	logoutButton: {
		backgroundColor: "#FF3B30",
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 8,
		minWidth: 100,
		alignItems: "center",
	},
	logoutButtonDisabled: {
		backgroundColor: "#FF6B6B",
		opacity: 0.7,
	},
	logoutButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	footer: {
		alignItems: "center",
		paddingVertical: 32,
		backgroundColor: "#fff",
	},
	socialIcons: {
		flexDirection: "row",
		marginBottom: 16,
	},
	icon: {
		marginHorizontal: 12,
	},
	copyright: {
		fontSize: 14,
		color: "#8695A4",
	},
});
