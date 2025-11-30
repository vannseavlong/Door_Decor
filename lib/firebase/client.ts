import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "../config/firebase";

if (!isFirebaseConfigured) {
  // Provide mock client-side implementations so the app can run without real credentials.
  // These match the minimal async interface used throughout the app during development.
  // eslint-disable-next-line import/no-mutable-exports
  export const auth: any = {
    currentUser: null,
    signInWithEmailAndPassword: async (email: string, password: string) => {
      return { user: { uid: "mock-user-id", email } };
    },
    signOut: async () => Promise.resolve(),
    onAuthStateChanged: (cb: any) => {
      // no-op subscription
      const unsubscribe = () => {};
      return unsubscribe;
    },
  };

  // minimal mock Firestore
  // eslint-disable-next-line import/no-mutable-exports
  export const db: any = {
    collection: (name: string) => ({
      get: async () => ({ docs: [] }),
      doc: (id: string) => ({
        get: async () => ({ exists: true, data: () => ({}) }),
        set: async (_data: any) => Promise.resolve(),
        update: async (_data: any) => Promise.resolve(),
        delete: async () => Promise.resolve(),
      }),
      add: async (_data: any) => ({ id: "new-id" }),
    }),
  };
} else {
  const app = !getApps().length
    ? initializeApp(firebaseConfig as any)
    : getApps()[0];
  // eslint-disable-next-line import/no-mutable-exports
  export const auth = getAuth(app);
  // eslint-disable-next-line import/no-mutable-exports
  export const db = getFirestore(app);
}

// Client helpers (optional) can live in lib/firebase/auth.ts
