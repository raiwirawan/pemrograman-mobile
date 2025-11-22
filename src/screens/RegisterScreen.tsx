import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";

export const RegisterScreen: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const { register, googleLogin } = useAuth();
	const navigation = useNavigation<any>();

	const handleCreateAccount = async () => {
		// Validasi lokal
		if (!name.trim() || !email.trim() || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}
		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters");
			return;
		}

		setLoading(true);
		try {
			await register(name, email.trim(), password);
			// Success → auto redirect oleh AppNavigator
		} catch (error: any) {
			console.error("Registration error:", error);
			let message = "Registration failed. Please try again.";
			if (error.code === "auth/email-already-in-use") {
				message = "This email is already registered.";
			} else if (error.code === "auth/invalid-email") {
				message = "Please enter a valid email address.";
			} else if (error.code === "auth/weak-password") {
				message = "Password is too weak. Use at least 6 characters.";
			} else if (error.code === "auth/operation-not-allowed") {
				message = "Email/password accounts are not enabled.";
			}
			Alert.alert("Registration Failed", message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
			<View style={styles.innerContainer}>
				{/* Back Button */}
				{navigation.canGoBack() && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
						disabled={loading}
					>
						<MaterialCommunityIcons
							name="chevron-left"
							size={32}
							color="#000"
						/>
					</TouchableOpacity>
				)}

				{/* Title */}
				<Text style={styles.title}>Create Account</Text>
				<Text style={styles.subtitle}>
					Create a new account to get started and enjoy seamless access to our
					features.
				</Text>

				{/* Name Input */}
				<View style={styles.inputContainer}>
					<MaterialCommunityIcons
						name="account-outline"
						size={20}
						color="#888"
						style={styles.icon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Name"
						value={name}
						onChangeText={setName}
						autoCapitalize="words"
						editable={!loading}
					/>
				</View>

				{/* Email Input */}
				<View style={styles.inputContainer}>
					<MaterialCommunityIcons
						name="email-outline"
						size={20}
						color="#888"
						style={styles.icon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email address"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoComplete="email"
						textContentType="emailAddress"
						editable={!loading}
					/>
				</View>

				{/* Password Input */}
				<View style={styles.inputContainer}>
					<MaterialCommunityIcons
						name="lock-outline"
						size={20}
						color="#888"
						style={styles.icon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!showPassword}
						autoComplete="password"
						textContentType="newPassword"
						editable={!loading}
					/>
					<TouchableOpacity
						onPress={() => setShowPassword((prev) => !prev)}
						disabled={loading}
					>
						<MaterialCommunityIcons
							name={showPassword ? "eye-off" : "eye"}
							size={20}
							color="#888"
							style={styles.iconRight}
						/>
					</TouchableOpacity>
				</View>

				{/* Create Account Button */}
				<Button
					mode="contained"
					onPress={handleCreateAccount}
					style={[styles.createButton, loading && { opacity: 0.7 }]}
					contentStyle={styles.createButtonContent}
					labelStyle={styles.createButtonLabel}
					disabled={loading}
					loading={loading}
				>
					{loading ? "Creating..." : "Create Account"}
				</Button>

				{/* Sign In Link */}
				<View style={styles.signInContainer}>
					<Text style={styles.signInText}>Already have an account? </Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Login")}
						disabled={loading}
					>
						<Text style={styles.signInLink}>Sign In here</Text>
					</TouchableOpacity>
				</View>

				{/* Divider */}
				<View style={styles.dividerContainer}>
					<View style={styles.divider} />
					<Text style={styles.orText}>Or Continue With Account</Text>
					<View style={styles.divider} />
				</View>

				{/* Social Login */}
				<View style={styles.socialContainer}>
					<TouchableOpacity style={styles.socialButton} disabled={loading}>
						<Text style={[styles.socialText, { color: "#1877F2" }]}>f</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.socialButton}
						disabled={loading}
						onPress={googleLogin}
					>
						<Text style={[styles.socialText, { color: "#DB4437" }]}>G</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.socialButton} disabled={loading}>
						<MaterialCommunityIcons name="apple" size={28} color="#000" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

// Styles tetap sama
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	innerContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 20,
	},
	backButton: {
		alignSelf: "flex-start",
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#000",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		marginBottom: 32,
		lineHeight: 20,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		paddingHorizontal: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	icon: {
		marginRight: 12,
	},
	iconRight: {
		marginLeft: 12,
	},
	input: {
		flex: 1,
		height: 50,
		fontSize: 16,
		color: "#000",
	},
	createButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 25,
		marginBottom: 24,
	},
	createButtonContent: {
		height: 50,
	},
	createButtonLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	signInContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 24,
	},
	signInText: {
		fontSize: 14,
		color: "#666",
	},
	signInLink: {
		fontSize: 14,
		color: "#4CAF50",
		fontWeight: "600",
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
	},
	divider: {
		flex: 1,
		height: 1,
		backgroundColor: "#ddd",
	},
	orText: {
		marginHorizontal: 16,
		fontSize: 14,
		color: "#888",
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 16,
	},
	socialButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	socialText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
