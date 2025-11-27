// src/hooks/useGoogleSignIn.ts
import { getFirebaseAuth } from "@/src/config/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const auth = getFirebaseAuth();

// Selesaikan auth session
WebBrowser.maybeCompleteAuthSession();

export const useGoogleSignIn = () => {
	const [loading, setLoading] = useState(false);

	// Gunakan Google.useAuthRequest (bukan useAuthRequest langsung)
	const [request, response, promptAsync] = Google.useAuthRequest({
		// expoClientId: "YOUR_WEB_CLIENT_ID.googleusercontent.com", // Dari Google Cloud Console
		iosClientId: "YOUR_IOS_CLIENT_ID.googleusercontent.com",
		androidClientId: "YOUR_ANDROID_CLIENT_ID.googleusercontent.com",
		scopes: ["profile", "email"],
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { id_token } = response.params;
			handleGoogleSignIn(id_token);
		} else if (response?.type === "error") {
			Alert.alert("Error", "Google Sign-In gagal. Coba lagi.");
		}
	}, [response]);

	const handleGoogleSignIn = async (idToken: string) => {
		setLoading(true);
		try {
			const credential = GoogleAuthProvider.credential(idToken);
			const userCredential = await signInWithCredential(auth, credential);
			Alert.alert(
				"Sukses",
				`Selamat datang, ${userCredential.user.displayName}!`
			);
			console.log("User:", userCredential.user);
		} catch (error: any) {
			console.error("Firebase error:", error);
			Alert.alert("Error", error.message || "Gagal login dengan Google");
		} finally {
			setLoading(false);
		}
	};

	const signInWithGoogle = () => {
		if (!request) {
			Alert.alert("Error", "Google Auth belum siap");
			return;
		}
		promptAsync();
	};

	return { signInWithGoogle, loading, request };
};
