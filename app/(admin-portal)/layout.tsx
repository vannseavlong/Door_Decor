"use client";

import React, { useEffect, useState } from "react";
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
        if (!user) {
          setAuthorized(false);
          router.push("/admin/login");
          return;
        }
        if (!isAllowedAdmin(user.email)) {
          // not allowed
          setAuthorized(false);
          router.push("/admin/login");
          return;
        }
        setAuthorized(true);
      });
    })();

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [router]);

  if (authorized === null) return <div>Checking auth...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}
