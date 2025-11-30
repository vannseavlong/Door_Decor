import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type Auth,
} from "firebase/auth";
import { isAllowedAdmin as _isAllowedAdmin } from "@/lib/firebase/whitelist";
import { isFirebaseConfigured } from "@/lib/config/firebase";

// whitelist utilities (server-safe) re-export
export const isAllowedAdmin = _isAllowedAdmin;

// client-side auth helpers — import client SDK lazily so this module is safe to import on server
export async function signInWithGoogle() {
  const client = await import("@/lib/firebase/client");
  const provider = new GoogleAuthProvider();

  if (isFirebaseConfigured) {
    // `client.auth` will be a real `Auth` instance in this branch
    const auth = client.auth as Auth;
    return signInWithPopup(auth, provider);
  }

  // Fallback/mock behavior for development when Firebase is not configured
  // The mock `auth` exposes `signInWithEmailAndPassword` that we can reuse to simulate a login.
  type UserShape = { uid: string; email?: string; [key: string]: unknown };

  const mockAuth = client.auth as {
    signInWithEmailAndPassword: (
      email: string,
      password: string
    ) => Promise<{ user: UserShape }>;
  };

  return mockAuth.signInWithEmailAndPassword("mock-user@example.com", "");
}

export async function signOutUser() {
  const client = await import("@/lib/firebase/client");
  if (isFirebaseConfigured) {
    const auth = client.auth as Auth;
    return signOut(auth);
  }

  const mockAuth = client.auth as { signOut: () => Promise<void> };
  return mockAuth.signOut();
}
