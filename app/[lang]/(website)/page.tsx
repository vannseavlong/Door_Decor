import React, { Suspense } from "react";
import ProductsSection from "@/components/website/ProductsSection";
import NewContactUs from "@/components/website/NewContactUs";
import Blog from "@/components/website/Blog";
import { getHeroSectionServer } from "@/lib/firebase/heroSection";
import { getCategoriesServer } from "@/lib/firebase/category";
import { getProductsServer } from "@/lib/firebase/product";
import { getInstallationsServer } from "@/lib/firebase/installations";
import { getFooterServer } from "@/lib/firebase/footer";
import SecondHero from "@/components/website/SecondHero";
import HeroSkeleton from "@/components/website/skeletons/HeroSkeleton";
import ProductsSkeleton from "@/components/website/skeletons/ProductsSkeleton";
import BlogSkeleton from "@/components/website/skeletons/BlogSkeleton";
import ContactSkeleton from "@/components/website/skeletons/ContactSkeleton";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Separate async components for progressive loading
async function HeroSection() {
  const heroData = await getHeroSectionServer();
  
  return (
    <SecondHero
      bannerEnLandscape={heroData?.bannerEnLandscape}
      bannerEnPortrait={heroData?.bannerEnPortrait}
      bannerKmLandscape={heroData?.bannerKmLandscape}
      bannerKmPortrait={heroData?.bannerKmPortrait}
    />
  );
}

async function ProductsSectionWrapper() {
  const [categoriesData, productsData] = await Promise.all([
    getCategoriesServer(),
    getProductsServer(),
  ]);

  return <ProductsSection categories={categoriesData} products={productsData} />;
}

async function BlogSection() {
  const installationsData = await getInstallationsServer();
  return <Blog posts={installationsData} />;
}

async function ContactSection() {
  const footerData = await getFooterServer();
  
  return (
    <NewContactUs
      contactData={{
        phone: footerData?.phone,
        socialMedia: footerData?.socialMedia,
      }}
    />
  );
}

export default function Page() {
  return (
    <div>
      {/* Hero Section - Load first */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: 1440 }}>
        {/* Products Section - Load independently */}
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsSectionWrapper />
        </Suspense>

        {/* Blog/Installations Section - Load independently */}
        <Suspense fallback={<BlogSkeleton />}>
          <BlogSection />
        </Suspense>

        {/* Contact Section - Load last */}
        <Suspense fallback={<ContactSkeleton />}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
}
