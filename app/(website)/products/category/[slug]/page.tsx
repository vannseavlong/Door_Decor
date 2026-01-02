import React from "react";
import { RouteParams } from "@/types/product";
import { getProductsServer } from "@/lib/firebase/product";
import { getCategoriesServer } from "@/lib/firebase/category";
import CategoryClient from "./CategoryClient";

type Props = {
  params: RouteParams | Promise<RouteParams>;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  // In Next.js App Router, `params` can be a Promise that must be awaited
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  // normalize slug to a single string; if it's an array, join with '-'
  const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug ?? "";

  // Fetch categories and products from Firebase
  const [categoriesData, productsData] = await Promise.all([
    getCategoriesServer(),
    getProductsServer(),
  ]);

  // Find the category by matching slugified name (EN or KM)
  const category = categoriesData.find((cat) => {
    const slugEN = slugify(cat.name.en);
    const slugKM = slugify(cat.name.km);
    return slugEN === slug || slugKM === slug;
  });

  // Filter products by categoryId
  const products = category
    ? productsData.filter((p) => p.categoryId === category.id)
    : [];

  return (
    <CategoryClient
      category={category || null}
      products={products}
      slug={slug}
    />
  );
}
