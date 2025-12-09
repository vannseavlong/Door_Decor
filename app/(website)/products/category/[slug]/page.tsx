import React from "react";
import Link from "next/link";
import Card from "@/components/website/Card";
import dummyProducts, {
  CATEGORIES as DUMMY_CATEGORIES,
} from "@/data/data-dummy";
import { RouteParams } from "@/types/product";

type Props = {
  params: RouteParams | Promise<RouteParams>;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default async function CategoryPage({ params }: Props) {
  // In Next.js App Router, `params` can be a Promise that must be awaited
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  // normalize slug to a single string; if it's an array, join with '-'
  const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug ?? "";

  // try to resolve slug to one of known categories, otherwise create a human label
  const matched = slug
    ? DUMMY_CATEGORIES.find((c) => slugify(c) === slug)
    : undefined;
  const categoryLabel =
    matched ??
    (slug
      ? slug
          .split("-")
          .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : ""))
          .join(" ")
      : "Category");

  // Match products by slugified category to avoid mismatches from spacing/casing
  // Primary: match by slugified category (same form used by links)
  let products = slug
    ? dummyProducts.filter((p) => slugify(p.category ?? "") === slug)
    : [];

  // Secondary (for robustness): try a simple case-insensitive compare if no results
  if (products.length === 0 && slug) {
    products = dummyProducts.filter(
      (p) =>
        (p.category ?? "").toLowerCase() ===
        decodeURIComponent(slug).toLowerCase()
    );
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="heading-2 text-brand-dark font-khmer">
              {categoryLabel}
            </h1>
            <p
              className="body-base text-gray-600 font-khmer"
              style={{ marginTop: "var(--space-1)" }}
            >
              Products in the {categoryLabel} category
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="body-sm text-brand-secondary hover-brand-primary hover:underline transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="body-base text-gray-600">
            No products found in this category.
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {products.map((p, idx) => (
              <Card
                key={p.id ?? String(idx)}
                src={p.imageUrl ?? "/imageStock/img1.jpg"}
                title={p.name}
                id={p.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
