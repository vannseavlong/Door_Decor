"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ProductRecord } from "@/lib/firebase/product";
import ProductCode from "@/components/product/ProductCode";
import ProductStats from "@/components/product/ProductStats";
import RequestQuoteDialog from "@/components/product/RequestQuoteDialog";
import { useTranslate } from "@/lib/utils/useTranslate";
import type { ProductCodeValue, LegacyProductCodeValue } from "@/lib/firebase/product";

type Props = { product: ProductRecord };

export default function ProductInfoActions({ product }: Props) {
  const { lang } = useTranslate();
  const currentLocale = lang || "en";
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  // Convert productCode object to array for ProductCode component with proper locale support
  // Desired display order for product code keys (fallbacks will appear after)
  const PRODUCT_CODE_ORDER = [
    "doorType",
    "type",
    "design",
    "material",
    "useArea",
    "special",
    "warranty",
  ];

  // Mapping of various key formats to canonical order keys
  const KEY_ALIASES: Record<string, string> = {
    'doortype': 'doorType',
    'door type': 'doorType',
    'type': 'type',
    'design': 'design',
    'material': 'material',
    'made of': 'material',
    'madeof': 'material',
    'usearea': 'useArea',
    'use area': 'useArea',
    'special': 'special',
    'warranty': 'warranty',
  };

  const productCodeRows = product.productCode
    ? (() => {
        const entries = Object.entries(product.productCode);
        
        // Normalize key to match PRODUCT_CODE_ORDER (handles various formats)
        const normalizeKey = (key: string) => {
          const baseKey = key.split('/')[0].toLowerCase().replace(/\s+/g, '');
          const withSpaces = key.split('/')[0].toLowerCase().trim();
          return KEY_ALIASES[baseKey] || KEY_ALIASES[withSpaces] || key;
        };
        
        // Sort by the PRODUCT_CODE_ORDER array using normalized keys
        entries.sort((a, b) => {
          const normalizedA = normalizeKey(a[0]);
          const normalizedB = normalizeKey(b[0]);
          
          const ia = PRODUCT_CODE_ORDER.indexOf(normalizedA);
          const ib = PRODUCT_CODE_ORDER.indexOf(normalizedB);

          if (ia === -1 && ib === -1) return 0;
          if (ia === -1) return 1;
          if (ib === -1) return -1;
          return ia - ib;
        });

        return entries.map(([key, value]: [string, ProductCodeValue | LegacyProductCodeValue]) => {
          // Handle new Firebase structure: { label: { en, km }, value: { en, km } }
          if (value && typeof value === 'object' && 'label' in value && 'value' in value) {
            const productCodeValue = value as ProductCodeValue;
            const label = currentLocale === "kh" && productCodeValue.label.km 
              ? productCodeValue.label.km 
              : productCodeValue.label.en;
            const displayValue = currentLocale === "kh" && productCodeValue.value.km 
              ? productCodeValue.value.km 
              : productCodeValue.value.en;
            
            return {
              label: label || key,
              value: displayValue || "-",
            };
          }
          
          // Handle old format: key is "Label EN/Label KM", value is { en, km }
          const legacyValue = value as LegacyProductCodeValue;
          const [labelEN, labelKM] = key.split("/");
          const label = currentLocale === "kh" && labelKM ? labelKM : labelEN;
          const displayValue =
            currentLocale === "kh" && legacyValue.km ? legacyValue.km : legacyValue.en;

          return {
            label: label || key,
            value: displayValue || "-",
          };
        });
      })()
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

    // Open quote dialog
    setShowQuoteDialog(true);
  };

  // Use product code if available, otherwise fallback to product name
  const displayCode = product.code || product.id || product.name.en;

  // Get product name (localized if available)
  const productName =
    typeof product.name === "string"
      ? product.name
      : currentLocale === "kh" && product.name.km
      ? product.name.km
      : product.name.en;

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

      {/* Quote Request Dialog */}
      <RequestQuoteDialog
        open={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productId={product.id ?? "unknown"}
        productName={productName}
        productImage={product.imageUrl || ""}
      />
    </div>
  );
}
