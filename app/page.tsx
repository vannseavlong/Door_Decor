import React from "react";
import Hero from "@/components/public/Hero";
import ProductsSection from "@/components/public/ProductsSection";
import ContactSection from "@/components/public/ContactSection";
import LocationSection from "@/components/public/LocationSection";

export default function Page() {
  return (
    <div>
      <Hero />
      <ProductsSection />
      <ContactSection />
      <LocationSection />
    </div>
  );
}
