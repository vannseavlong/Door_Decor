"use client";

import React from "react";
import Link from "next/link";
import ContactButton from "@/components/website/ContactButton";
import { Product } from "@/types/product";

type Props = { product: Product };

export default function ProductDetails({ product }: Props) {
  return (
    <div>
      <h1 className="heading-2 text-brand-dark font-khmer">{product.name}</h1>
      <p
        className="heading-5 text-brand-secondary"
        style={{ marginTop: "var(--space-2)" }}
      >
        ${product.price}
      </p>
      {product.category && (
        <p
          className="body-sm text-gray-500"
          style={{ marginTop: "var(--space-1)" }}
        >
          Category: {product.category}
        </p>
      )}

      {/* Description or placeholder */}
      <div className="mt-4">
        {/* If product.description exists show it */}
        {product.description ? (
          <p className="body-base text-gray-700 font-khmer">
            {product.description}
          </p>
        ) : (
          <p className="body-sm text-gray-600">No description available.</p>
        )}
      </div>

      {/* Specifications area - flexible shape */}
      {Array.isArray(product.specifications) &&
        product.specifications.length > 0 && (
          <div className="mt-6">
            <h2 className="heading-6 text-brand-dark mb-2">Specifications</h2>
            <dl className="grid grid-cols-1 gap-y-2 body-sm text-gray-600">
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
          className="inline-block bg-brand-secondary text-white px-4 py-2 rounded-md hover:brightness-95 transition-all body-base font-medium"
        >
          Back
        </Link>

        <ContactButton className="bg-brand-primary text-white px-4 py-2 rounded-md" />
      </div>
    </div>
  );
}
