import React from "react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import BottomBar from "@/components/website/BottomBar";
import { getCategoriesServer } from "@/lib/firebase/category";
import { getFooterServer } from "@/lib/firebase/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch categories and footer data
  const [categoriesData, footerData] = await Promise.all([
    getCategoriesServer(),
    getFooterServer(),
  ]);

  return (
    <>
      <Navbar categories={categoriesData} />
      <main
        className="mx-auto px-4 sm:px-6 lg:px-8 pt-16"
        style={{ maxWidth: 1440 }}
      >
        {children}
      </main>
      <Footer
        footerData={footerData ?? undefined}
        categories={categoriesData}
      />
      <BottomBar />
    </>
  );
}
