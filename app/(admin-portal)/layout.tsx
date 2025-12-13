"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isAllowedAdmin } from "@/lib/firebase/whitelist";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    let unsub: (() => void) | undefined;

    (async () => {
      const { auth } = await import("@/lib/firebase/client");

      unsub = onAuthStateChanged(auth, (user) => {
        console.log("Admin Layout - Auth State Changed:", {
          user: user ? { email: user.email, uid: user.uid } : null,
        });

        if (!user) {
          console.log("Admin Layout - No user, redirecting to login");
          setAuthorized(false);
          router.push("/login");
          return;
        }

        const isAllowed = isAllowedAdmin(user.email);
        console.log("Admin Layout - Checking whitelist:", {
          email: user.email,
          isAllowed,
        });

        if (!isAllowed) {
          console.log(
            "Admin Layout - User not in whitelist, redirecting to login"
          );
          setAuthorized(false);
          router.push("/login");
          return;
        }

        console.log("Admin Layout - User authorized");
        setAuthorized(true);
      });
    })();

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
