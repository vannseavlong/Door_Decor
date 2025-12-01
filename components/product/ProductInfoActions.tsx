"use client";

import React from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import {
  MaterialIcon,
  DimensionsIcon,
  WeightIcon,
  CertificationsIcon,
} from "@/components/product/specIcons";

type Props = { product: Product };

export default function ProductInfoActions({ product }: Props) {
  const specsArray: { label: string; value: string }[] = Array.isArray(
    product.specifications
  )
    ? product.specifications
    : product.specifications
    ? Object.entries(product.specifications).map(([label, value]) => ({
        label,
        value,
      }))
    : [];

  const handleContact = () => {
    toast.success("Redirecting to contact form...");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold leading-tight">{product.name}</h1>

      <div className="mt-4 text-gray-700">
        {product.description ? (
          <p className="text-sm text-gray-700">{product.description}</p>
        ) : (
          <p className="text-sm text-gray-600">No description available.</p>
        )}
      </div>

      <hr className="my-6 border-t border-gray-200" />

      {/* Specifications (compact list matching design) */}
      {specsArray.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          <div className="space-y-3 text-sm text-gray-700">
            {specsArray.map((s, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600 mt-1">
                  {s.label.toLowerCase().includes("material") ? (
                    <MaterialIcon className="w-3 h-3" />
                  ) : s.label.toLowerCase().includes("dimension") ||
                    s.label.toLowerCase().includes("size") ? (
                    <DimensionsIcon className="w-3 h-3" />
                  ) : s.label.toLowerCase().includes("weight") ? (
                    <WeightIcon className="w-3 h-3" />
                  ) : (
                    <CertificationsIcon className="w-3 h-3" />
                  )}
                </div>

                <div>
                  <span className="font-medium text-gray-800">{s.label}:</span>
                  <span className="ml-2 text-gray-600">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request button (compact) */}
      <div className="mt-6">
        <button
          onClick={handleContact}
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md shadow"
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
}
