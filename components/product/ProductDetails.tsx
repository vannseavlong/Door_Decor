"use client";

import React from "react";
import Link from "next/link";
import ContactButton from "@/components/website/ContactButton";
import { Product } from "@/types/product";

type Props = { product: Product };

export default function ProductDetails({ product }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-xl text-gray-700">${product.price}</p>
      {product.category && (
        <p className="mt-1 text-sm text-gray-500">
          Category: {product.category}
        </p>
      )}

      {/* Description or placeholder */}
      <div className="mt-4 text-gray-700">
        {/* If product.description exists show it */}
        {product.description ? (
          <p className="text-sm text-gray-700">{product.description}</p>
        ) : (
          <p className="text-sm text-gray-600">No description available.</p>
        )}
      </div>

      {/* Specifications area - flexible shape */}
      {Array.isArray(product.specifications) &&
        product.specifications.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Specifications</h2>
            <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
              {product.specifications.map((s, idx) => (
                <div key={idx} className="flex gap-2">
                  <dt className="font-medium w-40">{s.label}:</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Back
        </Link>

        <ContactButton className="bg-[#f7942d] text-white px-4 py-2 rounded-md" />
      </div>
    </div>
  );
}
