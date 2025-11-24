import React from "react";
import Card from "@/components/website/Card";
import { Product } from "@/types/product";

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
  const items =
    products && products.length
      ? products
      : IMGS.map((src, idx) => ({
          id: String(idx + 1),
          name: "WPC Door",
          imageUrl: src,
        }));

  return (
    <section className="w-full py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
          <p className="mt-2 text-gray-600">Explore our product gallery</p>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, idx) => (
            <Card
              key={((p as Product).id as string) ?? String(idx)}
              src={(p as Product).imageUrl ?? IMGS[idx % IMGS.length]}
              title={(p as Product).name ?? "Product"}
              id={(p as Product).id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
