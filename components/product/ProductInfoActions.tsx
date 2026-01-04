"use client";

import React from "react";
import { toast } from "sonner";
import { ProductRecord } from "@/lib/firebase/product";
import ProductCode from "@/components/product/ProductCode";
import ProductStats from "@/components/product/ProductStats";
import { useTranslate } from "@/lib/utils/useTranslate";

type Props = { product: ProductRecord };

export default function ProductInfoActions({ product }: Props) {
  const { lang } = useTranslate();
  const currentLocale = lang || "en";

  // Convert productCode object to array for ProductCode component with proper locale support
  const productCodeRows = product.productCode
    ? Object.entries(product.productCode).map(([key, value]) => {
        // Key format: "Label EN/Label KM"
        const [labelEN, labelKM] = key.split("/");
        const label = currentLocale === "kh" && labelKM ? labelKM : labelEN;
        const displayValue =
          currentLocale === "kh" && value.km ? value.km : value.en;

        return {
          label: label || key,
          value: displayValue || "-",
        };
      })
    : [];

  const handleContact = () => {
    try {
      const id = product.id || "unknown";
      const key = `product-stats-${id}`;
      const raw = localStorage.getItem(key);
      const s = raw ? JSON.parse(raw) : { views: 0, clicks: 0 };
      s.clicks = (s.clicks || 0) + 1;
      localStorage.setItem(key, JSON.stringify(s));
      // dispatch storage event to update other listeners (same-tab)
      try {
        window.dispatchEvent(
          new StorageEvent("storage", { key, newValue: JSON.stringify(s) })
        );
      } catch {}
    } catch {}

    toast.success("Redirecting to contact form...");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Use product code if available, otherwise fallback to product name
  const displayCode = product.code || product.id || product.name.en;

  return (
    <div>
      {/* Product code and details table */}
      <ProductCode code={displayCode} rows={productCodeRows} />

      {/* Request button (compact) */}
      <div className="mt-6 flex items-center gap-4 flex-nowrap">
        <button
          onClick={handleContact}
          className="inline-flex items-center justify-center bg-brand-primary text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-lg transition-colors"
        >
          Request a Quote
        </button>
        <ProductStats productId={product.id ?? "unknown"} />
      </div>
    </div>
  );
}
