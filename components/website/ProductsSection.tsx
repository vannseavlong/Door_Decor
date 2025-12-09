"use client";

import React from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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
    <section className="w-full py-12 md:py-16">
      <div className="" style={{ maxWidth: 1440 }}>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 text-brand-dark font-khmer">Products</h2>
          <p
            className="body-base text-gray-600 font-khmer"
            style={{ marginTop: "var(--space-2)" }}
          >
            Explore our product gallery
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-3 text-brand-dark font-khmer">{cat}</h3>
                <Link
                  href={`/products/category/${slugify(cat)}`}
                  className="body-sm text-brand-secondary hover-brand-primary hover:underline transition-colors"
                  aria-label={`View products in ${cat}`}
                >
                  View all
                </Link>
              </div>

              <motion.div
                className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {grouped[cat].map((p, idx) => (
                  <motion.div
                    key={p.id ?? `${cat}-${idx}`}
                    variants={itemVariants}
                  >
                    <Card
                      src={p.imageUrl ?? IMGS[idx % IMGS.length]}
                      title={p.name}
                      id={p.id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
