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
      <main className="pt-16">{children}</main>
      <Footer
        footerData={footerData ?? undefined}
        categories={categoriesData}
      />
      <BottomBar />
    </>
  );
}
