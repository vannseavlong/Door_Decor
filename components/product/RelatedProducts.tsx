import React from "react";
import Link from "next/link";
import Card from "@/components/website/Card";
import { Product } from "@/types/product";

type Props = { products: Product[]; currentId?: string };

export default function RelatedProducts({ products, currentId }: Props) {
  // If caller passed full product list, try to find the current product and
  // select related items from the same category. Otherwise fall back to the
  // simple exclude-self behavior.
  const current = products.find((p) => p.id === currentId);

  let items: Product[] = [];
  if (current && current.category) {
    items = products
      .filter((p) => p.category === current.category && p.id !== currentId)
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map((p) => (
          <div key={p.id}>
            <Link href={`/product/${p.id}`} className="block">
              {/* Render image + title using Card (no internal link) */}
              <Card src={p.imageUrl ?? "/imageStock/img1.jpg"} title={p.name} />
            </Link>

            {/* <div className="mt-2">
              <div className="text-sm font-medium text-[#1A1A1A]">{p.name}</div>
              <div className="text-xs text-gray-500">{p.category}</div>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}
