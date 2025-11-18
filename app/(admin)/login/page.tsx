"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signOutUser } from "@/lib/firebase/auth";
import { isAllowedAdmin } from "@/lib/firebase/whitelist";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = (async () => {
      const { auth } = await import("@/lib/firebase/client");
      return onAuthStateChanged(auth, (user) => {
        if (user && isAllowedAdmin(user.email)) router.push("/admin/dashboard");
      });
    })();
    // unsub will be a Promise (we returned) — attempt cleanup if possible
    return () => {
      // nothing to cleanup synchronously
    };
  }, [router]);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const email = result.user?.email;
      if (!isAllowedAdmin(email)) {
        await signOutUser();
        setError("Your account is not authorized to access the admin panel.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin Login</h1>
      <p>Only approved emails can sign in.</p>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
