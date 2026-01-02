import React from "react";
import Hero from "@/components/website/Hero";
import ProductsSection from "@/components/website/ProductsSection";
// import ContactSection from "@/components/website/ContactSection";
import NewContactUs from "@/components/website/NewContactUs";
import Blog from "@/components/website/Blog";
// import LocationSection from "@/components/website/LocationSection";
import { getHeroSectionServer } from "@/lib/firebase/heroSection";
import { getCategoriesServer } from "@/lib/firebase/category";
import { getProductsServer } from "@/lib/firebase/product";
import { getInstallationsServer } from "@/lib/firebase/installations";
import { getFooterServer } from "@/lib/firebase/footer";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function Page() {
  // Fetch data from Firebase
  const [
    heroData,
    categoriesData,
    productsData,
    installationsData,
    footerData,
  ] = await Promise.all([
    getHeroSectionServer(),
    getCategoriesServer(),
    getProductsServer(),
    getInstallationsServer(),
    getFooterServer(),
  ]);

  return (
    <div>
      <Hero
        title={heroData?.title}
        description={heroData?.description}
        imageUrl={heroData?.imageUrl}
      />
      <ProductsSection categories={categoriesData} products={productsData} />
      <Blog posts={installationsData} />
      {/* <ContactSection /> */}
      <NewContactUs
        contactData={{
          phone: footerData?.phone,
          socialMedia: footerData?.socialMedia,
        }}
      />
      {/* <LocationSection /> */}
    </div>
  );
}
