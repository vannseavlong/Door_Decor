import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { isAllowedAdmin as _isAllowedAdmin } from "@/lib/firebase/whitelist";

// whitelist utilities (server-safe) re-export
export const isAllowedAdmin = _isAllowedAdmin;

// client-side auth helpers — import client SDK lazily so this module is safe to import on server
export async function signInWithGoogle() {
  const { auth } = await import("@/lib/firebase/client");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  const { auth } = await import("@/lib/firebase/client");
  return signOut(auth);
}
