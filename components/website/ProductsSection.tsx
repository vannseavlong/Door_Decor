"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/website/Card";
import Link from "next/link";
import { Product } from "@/types/product";
import dummyProducts, {
  CATEGORIES as DUMMY_CATEGORIES,
} from "@/data/data-dummy";
import { useTranslate } from "@/lib/utils/useTranslate";
import { CategoryRecord } from "@/lib/firebase/category";
import { ProductRecord } from "@/lib/firebase/product";

type Props = {
  products?: ProductRecord[];
  categories?: CategoryRecord[];
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

export default function ProductsSection({ products, categories }: Props) {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "en";

  console.log("🎨 ProductsSection - Received products:", products);
  console.log("🎨 ProductsSection - Products length:", products?.length || 0);
  console.log("🎨 ProductsSection - Received categories:", categories);
  console.log(
    "🎨 ProductsSection - Categories length:",
    categories?.length || 0
  );

  // use passed products when available; otherwise fall back to local dummy data
  const items: (ProductRecord | Product)[] =
    products && products.length ? products : dummyProducts;

  console.log("🎨 ProductsSection - Using items count:", items.length);
  console.log(
    "🎨 ProductsSection - Is using dummy data?",
    items === dummyProducts
  );

  // Helper to get category name based on locale
  const getCategoryName = (cat: CategoryRecord): string => {
    return currentLocale === "kh" ? cat.name.km : cat.name.en;
  };

  // Helper to get product name based on locale
  const getProductName = (product: ProductRecord): string => {
    if (typeof product.name === "string") return product.name;
    return currentLocale === "kh" ? product.name.km : product.name.en;
  };

  // Helper to get category ID by name (for products with string category)
  const getCategoryId = (categoryName: string): string => {
    if (!categories || !categories.length) return categoryName;
    const found = categories.find((c) => {
      return c.name.en === categoryName || c.name.km === categoryName;
    });
    return found?.id ?? categoryName;
  };

  // group products by category ID
  const grouped = items.reduce(
    (acc: Record<string, (ProductRecord | Product)[]>, p) => {
      const catId =
        (p as ProductRecord).categoryId ??
        getCategoryId((p as Product).category ?? "Uncategorized");
      if (!acc[catId]) acc[catId] = [];
      acc[catId].push(p);
      return acc;
    },
    {}
  );

  console.log("📊 Grouped products by category:", grouped);
  console.log("📊 Grouped category IDs:", Object.keys(grouped));
  console.log(
    "📊 Available categories:",
    categories?.map((c) => ({
      firestoreDocId: c.firestoreId,
      internalId: c.id,
      name: c.name,
    }))
  );

  console.log("\n🚨 =============== ID MATCHING CHECK =============== 🚨");
  console.log(
    "Category internal IDs:",
    categories?.map((c) => c.id)
  );
  console.log("Product categoryIds:", Object.keys(grouped));
  console.log("🚨 ================================================== 🚨\n");

  // Debug: Check if IDs match using the internal id field
  if (categories && categories.length > 0) {
    Object.keys(grouped).forEach((groupedId) => {
      const found = categories.find((c) => c.id === groupedId);
      console.log(
        `📊 Product categoryId "${groupedId}" matches category:`,
        found ? `✅ ${found.name.en}` : "❌ NO MATCH"
      );
    });
  }

  // Filter categories to only those that have products
  // Match using the internal id field from the category document
  const categoriesWithProducts =
    categories && categories.length
      ? categories.filter((c) => {
          if (!c.id) return false;
          const hasProducts = grouped[c.id];
          console.log(
            `📊 Category internal id ${c.id} (${c.name.en}) has products:`,
            hasProducts ? "✅ YES" : "❌ NO",
            "Count:",
            hasProducts?.length || 0
          );
          return hasProducts;
        })
      : Object.keys(grouped).map(
          (id) =>
            ({
              id,
              name: { en: id, km: id },
              description: { en: "", km: "" },
            } as CategoryRecord)
        );

  console.log("📊 Categories with products:", categoriesWithProducts);
  console.log(
    "📊 Categories with products count:",
    categoriesWithProducts.length
  );

  // Safety check: if no categories matched, display all products under their category IDs
  const finalCategories =
    categoriesWithProducts.length > 0
      ? categoriesWithProducts
      : Object.keys(grouped).map((id) => {
          // Find the matching category using internal id field
          const matchingCategory = categories?.find((c) => c.id === id);
          if (matchingCategory) {
            console.log(
              `✅ Found matching category for internal id ${id}:`,
              matchingCategory.name
            );
            return matchingCategory;
          }
          console.log(`❌ No matching category found for internal id: ${id}`);
          return {
            id,
            name: {
              en: `⚠️ Category ID Mismatch: ${id}`,
              km: `⚠️ ប្រភេទមិនត្រឹមត្រូវ: ${id}`,
            },
            description: {
              en: "Please update this product's category in the admin panel",
              km: "សូមធ្វើបច្ចុប្បន្នភាពប្រភេទផលិតផលនេះនៅក្នុងបន្ទះគ្រប់គ្រង",
            },
          } as CategoryRecord;
        });

  console.log("📊 Final categories to display:", finalCategories.length);
  console.log(
    "📊 Final categories:",
    finalCategories.map((c) => ({ id: c.id, name: c.name }))
  );

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
          <h2 className="heading-2 text-brand-dark font-khmer">
            {t("productTitle")}
          </h2>
          {/* <p
            className="body-base text-gray-600 font-khmer"
            style={{ marginTop: "var(--space-2)" }}
          >
            {t("exploreCategory")}
          </p> */}
        </motion.div>

        <div className="space-y-10">
          {finalCategories.map((cat, catIndex) => {
            const categoryName = getCategoryName(cat);
            const categorySlug = slugify(categoryName);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`heading-3 text-brand-dark ${
                      currentLocale === "kh" ? "font-khmer" : ""
                    }`}
                  >
                    {categoryName}
                  </h3>
                  <Link
                    href={`/products/category/${categorySlug}`}
                    className={`body-sm text-brand-primary hover:text-brand-primary/90 hover:underline transition-colors ${
                      currentLocale === "kh" ? "font-khmer" : ""
                    }`}
                    aria-label={`View products in ${categoryName}`}
                  >
                    {t("viewAllProducts")}
                  </Link>
                </div>

                <motion.div
                  className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {grouped[cat.id!].map((p, idx) => (
                    <motion.div
                      key={p.id ?? `${cat.id}-${idx}`}
                      variants={itemVariants}
                    >
                      <Card
                        src={p.imageUrl ?? IMGS[idx % IMGS.length]}
                        title={getProductName(p as ProductRecord)}
                        id={p.id}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
