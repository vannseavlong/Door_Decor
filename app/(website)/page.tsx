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
import SecondHero from "@/components/website/SecondHero";

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

  console.log("🏠 Home Page - Products count:", productsData.length);
  console.log("🏠 Home Page - Categories count:", categoriesData.length);
  console.log("🏠 Home Page - Sample product:", productsData[0]);

  return (
    <div>
      {/* <Hero
        title={heroData?.title}
        description={heroData?.description}
        imageUrl={heroData?.imageUrl}
      /> */}

      <SecondHero
        bannerEnLandscape={heroData?.bannerEnLandscape}
        bannerEnPortrait={heroData?.bannerEnPortrait}
        bannerKmLandscape={heroData?.bannerKmLandscape}
        bannerKmPortrait={heroData?.bannerKmPortrait}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: 1440 }}>
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
    </div>
  );
}
