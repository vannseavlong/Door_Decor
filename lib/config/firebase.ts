// Firebase configuration
// This file builds a firebaseConfig object from environment variables.
// Client-safe variables must use the `NEXT_PUBLIC_` prefix so they are
// available in browser code (e.g. `NEXT_PUBLIC_FIREBASE_API_KEY`).

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

if (!isFirebaseConfigured) {
  // Provide a clear runtime hint so developers know to set env vars.
  // This will run on both server and client builds where this module is imported.
  // Avoid throwing so the dev server can still boot; we provide mocked helpers elsewhere.
  // eslint-disable-next-line no-console
  console.warn(
    "Firebase client config is missing. Set environment variables from .env.example or provide real credentials."
  );
}

export { firebaseConfig, isFirebaseConfigured };
