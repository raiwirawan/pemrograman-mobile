import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
	Alert,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";

export const LoginScreen: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false); // Local loading

	const { login, googleLogin } = useAuth();
	const navigation = useNavigation<any>();

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			await login(email.trim(), password);
			// Success → auto redirect by AppNavigator
		} catch (error: any) {
			let message = "Login failed. Please try again.";
			if (error.code === "auth/user-not-found") {
				message = "No user found with this email.";
			} else if (error.code === "auth/wrong-password") {
				message = "Incorrect password.";
			} else if (error.code === "auth/invalid-email") {
				message = "Invalid email address.";
			} else if (error.code === "auth/too-many-requests") {
				message = "Too many attempts. Try again later.";
			}
			Alert.alert("Login Failed", message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
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
				<Text style={styles.title}>Log in</Text>
				<Text style={styles.subtitle}>
					Enter your email and password to securely access your account and
					manage your services.
				</Text>

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
						textContentType="password"
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

				{/* Remember Me & Forgot Password */}
				<View style={styles.optionsRow}>
					<View style={styles.rememberMe}>
						<Checkbox
							status={rememberMe ? "checked" : "unchecked"}
							onPress={() => setRememberMe((prev) => !prev)}
							color="#4CAF50"
							disabled={loading}
						/>
						<Text style={styles.rememberText}>Remember me</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("ForgotPassword")}
						disabled={loading}
					>
						<Text style={styles.forgotPassword}>Forgot Password</Text>
					</TouchableOpacity>
				</View>

				{/* Login Button */}
				<Button
					mode="contained"
					onPress={handleLogin}
					style={[styles.loginButton, loading && { opacity: 0.7 }]}
					contentStyle={styles.loginButtonContent}
					labelStyle={styles.loginButtonLabel}
					disabled={loading}
					loading={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</Button>

				{/* Sign Up Link */}
				<View style={styles.signUpContainer}>
					<Text style={styles.signUpText}>{"Don't have an account? "}</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Register")}
						disabled={loading}
					>
						<Text style={styles.signUpLink}>Sign Up here</Text>
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
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
	optionsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	rememberMe: {
		flexDirection: "row",
		alignItems: "center",
	},
	rememberText: {
		marginLeft: 8,
		fontSize: 14,
		color: "#444",
	},
	forgotPassword: {
		fontSize: 14,
		color: "#4CAF50",
		fontWeight: "600",
	},
	loginButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 25,
		marginBottom: 24,
	},
	loginButtonContent: {
		height: 50,
	},
	loginButtonLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 24,
	},
	signUpText: {
		fontSize: 14,
		color: "#666",
	},
	signUpLink: {
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
