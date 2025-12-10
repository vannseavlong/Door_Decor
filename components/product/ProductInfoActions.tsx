"use client";

import React from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import ProductCode from "@/components/product/ProductCode";

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
      {/* <h1 className="text-4xl font-extrabold leading-tight">{product.name}</h1>

      <div className="mt-4 text-gray-700">
        {product.description ? (
          <p className="text-sm text-gray-700">{product.description}</p>
        ) : (
          <p className="text-sm text-gray-600">No description available.</p>
        )}
      </div>

      <hr className="my-6 border-t border-gray-200" /> */}

      {/* Product code and details table */}
      <ProductCode
        code={product.code || product.name}
        rows={product.productCodeRows || specsArray}
      />

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
