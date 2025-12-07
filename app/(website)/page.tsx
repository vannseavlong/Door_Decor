import React from "react";
import Hero from "@/components/website/Hero";
import ProductsSection from "@/components/website/ProductsSection";
// import ContactSection from "@/components/website/ContactSection";
import NewContactUs from "@/components/website/NewContactUs";
// import LocationSection from "@/components/website/LocationSection";

export default function Page() {
  return (
    <div>
      <Hero />
      <ProductsSection />
      {/* <ContactSection /> */}
      <NewContactUs />
      {/* <LocationSection /> */}
    </div>
  );
}
