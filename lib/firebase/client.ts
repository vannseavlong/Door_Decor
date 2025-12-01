import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "../config/firebase";

// Log configuration status for debugging
if (typeof window !== "undefined") {
  console.log("Firebase configured:", isFirebaseConfigured);
  console.log("Firebase config:", {
    apiKey: firebaseConfig.apiKey
      ? "***" + firebaseConfig.apiKey.slice(-4)
      : "missing",
    projectId: firebaseConfig.projectId || "missing",
    authDomain: firebaseConfig.authDomain || "missing",
  });
}

// Initialize Firebase app using environment-provided config (must be set in .env.local)
const app = !getApps().length
  ? initializeApp(firebaseConfig as FirebaseOptions)
  : getApps()[0];

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
