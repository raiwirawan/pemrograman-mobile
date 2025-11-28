declare module "firebase/auth/react-native" {
  import type { FirebaseApp } from "firebase/app";
  import type { Persistence } from "firebase/auth";
  export function initializeAuth(
    app: FirebaseApp,
    options?: { persistence: Persistence }
  ): any;
  export function getReactNativePersistence(storage: any): Persistence;
}
