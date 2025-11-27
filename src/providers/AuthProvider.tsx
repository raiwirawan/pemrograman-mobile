// src/providers/AuthProvider.tsx
import * as WebBrowser from "expo-web-browser";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFirebaseAuth } from "../config/firebase";

WebBrowser.maybeCompleteAuthSession();

const auth = getFirebaseAuth(); // ← baru di sini dipanggil

// ... sisanya sama seperti sebelumnya

type AuthContextType = {
	user: User | null;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
