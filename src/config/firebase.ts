// src/config/firebase.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Using default web-extension auth which works in Expo Go; remove internal RN fallback

// Config Firebase kamu
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let initializeAuthRN: any = null;
let getReactNativePersistenceRN: any = null;

const auth: Auth =
	initializeAuthRN && getReactNativePersistenceRN
		? initializeAuthRN(app, {
				persistence: getReactNativePersistenceRN(AsyncStorage),
		  })
		: getAuth(app);

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);

export const getFirebaseAuth = () => auth;
export const getFirebaseStorage = () => storage;
