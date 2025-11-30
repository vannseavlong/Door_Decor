import React from "react";
import Card from "@/components/website/Card";
import Link from "next/link";
import { Product } from "@/types/product";
import dummyProducts, {
  CATEGORIES as DUMMY_CATEGORIES,
} from "@/data/data-dummy";

type Props = {
  products?: Product[];
};

const IMGS = [
  "/imageStock/img1.jpg",
  "/imageStock/img2.jpg",
  "/imageStock/img3.jpg",
  "/imageStock/img4.jpg",
  "/imageStock/img5.jpg",
  "/imageStock/img6.jpg",
  "/imageStock/img7.jpg",
  "/imageStock/img8.jpg",
  "/imageStock/img9.jpg",
  "/imageStock/img10.jpg",
];

export default function ProductsSection({ products }: Props) {
  // use passed products when available; otherwise fall back to local dummy data
  const items: Product[] =
    products && products.length ? products : dummyProducts;

  // group products by category
  const grouped = items.reduce((acc: Record<string, Product[]>, p) => {
    const cat = p.category ?? "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  // order categories: prefer known categories from data-dummy, then the rest
  const categories = [
    ...DUMMY_CATEGORIES.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((k) => !DUMMY_CATEGORIES.includes(k)),
  ];

  const slugify = (s: string) =>
    encodeURIComponent(
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );

  return (
    <section className="w-full py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Products</h2>
          <p className="mt-2 text-gray-600">Explore our product gallery</p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[32px] font-bold text-gray-900">{cat}</h3>
                <Link
                  href={`/products/category/${slugify(cat)}`}
                  className="text-sm text-indigo-600 hover:underline"
                  aria-label={`View products in ${cat}`}
                >
                  View all
                </Link>
              </div>

              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {grouped[cat].map((p, idx) => (
                  <Card
                    key={p.id ?? `${cat}-${idx}`}
                    src={p.imageUrl ?? IMGS[idx % IMGS.length]}
                    title={p.name}
                    id={p.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
