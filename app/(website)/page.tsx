import React from "react";
import Hero from "@/components/website/Hero";
import ProductsSection from "@/components/website/ProductsSection";
import ContactSection from "@/components/website/ContactSection";
// import LocationSection from "@/components/website/LocationSection";

export default function Page() {
  return (
    <div>
      <Hero />
      <ProductsSection />
      <ContactSection />
      {/* <LocationSection /> */}
    </div>
  );
}
