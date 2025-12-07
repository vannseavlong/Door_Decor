import React from "react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import BottomBar from "@/components/website/BottomBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto px-8 pt-16" style={{ maxWidth: 1440 }}>
        {children}
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}
