import React from "react";
import Navbar from "@/components/public/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto px-4 pt-16" style={{ maxWidth: 1440 }}>
        {children}
      </main>
    </>
  );
}
