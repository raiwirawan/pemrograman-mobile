import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getFirebaseAuth } from "../config/firebase";
import { AuthContext } from "../hooks/useAuth";
import {
	changePassword as changePasswordFn,
	login as loginFn,
	logout as logoutFn,
	register as registerFn,
	resetPassword as resetPasswordFn,
	updateUserEmail as updateUserEmailFn,
	updateUserProfile as updateUserProfileFn,
	uploadAvatar as uploadAvatarFn,
} from "../lib/auth";

const auth = getFirebaseAuth();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const login = async (email: string, password: string) =>
		loginFn(email, password);
	const register = async (fullName: string, email: string, password: string) =>
		registerFn(fullName, email, password);

	const googleLogin = async () => {
		return Promise.reject(new Error("Google Sign-In belum dikonfigurasi"));
	};

	const logout = async () => logoutFn();
	const resetPassword = async (email: string) => resetPasswordFn(email);
	const changePassword = async (currentPassword: string, newPassword: string) =>
		changePasswordFn(currentPassword, newPassword);
	const updateUserProfile = async (updates: {
		displayName?: string;
		photoURL?: string;
	}) => updateUserProfileFn(updates);
	const updateUserEmail = async (newEmail: string) =>
		updateUserEmailFn(newEmail);
	const uploadAvatar = async (uri: string) => uploadAvatarFn(uri);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				register,
				googleLogin,
				logout,
				resetPassword,
				changePassword,
				updateUserProfile,
				updateUserEmail,
				uploadAvatar,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
