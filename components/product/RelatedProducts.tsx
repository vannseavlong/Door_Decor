"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/website/Card";
import { ProductRecord } from "@/lib/firebase/product";
import { useTranslate } from "@/lib/utils/useTranslate";

type Props = { products: ProductRecord[]; currentId?: string };

export default function RelatedProducts({ products, currentId }: Props) {
  const { lang } = useTranslate();
  const currentLocale = lang || "en";
  // If caller passed full product list, try to find the current product and
  // select related items from the same category. Otherwise fall back to the
  // simple exclude-self behavior.
  const current = products.find((p) => p.id === currentId);

  let items: ProductRecord[] = [];
  if (current && current.categoryId) {
    items = products
      .filter((p) => p.categoryId === current.categoryId && p.id !== currentId)
      .slice(0, 4);
  } else {
    items = products.filter((p) => p.id !== currentId).slice(0, 4);
  }

  if (!items.length) return null;

  return (
    <section className="mt-12">
      <h3 className="heading-4 text-brand-dark mb-4 font-khmer">
        Related Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((p) => {
          const productName = currentLocale === "kh" ? p.name.km : p.name.en;
          return (
            <div key={p.id}>
              <Link href={`/product/${p.id}`} className="block">
                {/* Render image + title using Card (no internal link) */}
                <Card
                  src={p.imageUrl ?? "/imageStock/img1.jpg"}
                  title={productName}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
