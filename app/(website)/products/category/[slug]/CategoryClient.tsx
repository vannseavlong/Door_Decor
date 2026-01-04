"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/website/Card";
import { ProductRecord } from "@/lib/firebase/product";
import { CategoryRecord } from "@/lib/firebase/category";
import { useTranslate } from "@/lib/utils/useTranslate";

type Props = {
  category: CategoryRecord | null;
  products: ProductRecord[];
  slug: string;
};

export default function CategoryClient({ category, products, slug }: Props) {
  const { lang } = useTranslate();
  const currentLocale = lang || "en";

  // Get category name based on current locale
  const categoryLabel = category
    ? currentLocale === "kh"
      ? category.name.km
      : category.name.en
    : slug
        .split("-")
        .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : ""))
        .join(" ");

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1
              className={`heading-2 text-brand-dark ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
            >
              {categoryLabel}
            </h1>
            {/* <p
              className={`body-base text-gray-600 ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
              style={{ marginTop: "var(--space-1)" }}
            >
              {currentLocale === "kh"
                ? `ផលិតផលក្នុងប្រភេទ ${categoryLabel}`
                : `Products in the ${categoryLabel} category`}
            </p> */}
          </div>
          <div>
            <Link
              href="/"
              className={`body-sm text-brand-primary hover:underline transition-colors ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
            >
              {currentLocale === "kh" ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home"}
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div
            className={`body-base text-gray-600 ${
              currentLocale === "kh" ? "font-khmer" : ""
            }`}
          >
            {currentLocale === "kh"
              ? "រកមិនឃើញផលិតផលក្នុងប្រភេទនេះទេ។"
              : "No products found in this category."}
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const productName =
                currentLocale === "kh" ? p.name.km : p.name.en;
              return (
                <Card
                  key={p.id}
                  src={p.imageUrl ?? "/imageStock/img1.jpg"}
                  title={productName}
                  id={p.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
