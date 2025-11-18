"use client";

import React from "react";
import Card from "@/components/public/Card";

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

export default function ProductsSection() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
          <p className="mt-2 text-gray-600">Explore our product gallery</p>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {IMGS.map((src, idx) => (
            <Card key={src + idx} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
