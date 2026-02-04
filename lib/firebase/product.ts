import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";

const PRODUCTS = "products";
const CACHE_TAG_PRODUCTS = "products-list";

export type LocalizedText = {
  en: string;
  km: string;
};

export type ProductCodeValue = {
  label: LocalizedText;
  value: LocalizedText;
};

// Legacy format support
export type LegacyProductCodeValue = LocalizedText;

export type ProductRecord = {
  id?: string;
  code?: string; // Product code for display
  name: LocalizedText;
  description: LocalizedText;
  price: string;
  categoryId: string;
  imageUrl: string; // Single image only
  productCode?: { [key: string]: ProductCodeValue | LegacyProductCodeValue };
  createdAt?: string;
  updatedAt?: string;
};

export const getProductsServer = unstable_cache(
  async (): Promise<ProductRecord[]> => {
    try {
      console.log("🔍 Attempting to fetch products from Firebase...");
      const snap = await adminDb
        .collection(PRODUCTS)
        .orderBy("createdAt", "desc")
        .get();
      console.log(`✅ Found ${snap.docs.length} products in Firebase`);
      const products = snap.docs.map(
        (d: QueryDocumentSnapshot<DocumentData>) => {
          const data = d.data();
          // Remove id field if it exists in data to prevent conflicts
          delete data.id;
          return {
            id: d.id, // Use Firestore document ID
            ...data,
          } as ProductRecord;
        },
      );
      console.log("📦 Products:", products);
      return products;
    } catch (error) {
      console.error(
        "❌ Error fetching products with orderBy, trying without:",
        error,
      );
      // Fallback: fetch without ordering if orderBy fails
      try {
        const snap = await adminDb.collection(PRODUCTS).get();
        console.log(
          `✅ Fallback: Found ${snap.docs.length} products in Firebase`,
        );
        const products = snap.docs.map(
          (d: QueryDocumentSnapshot<DocumentData>) => {
            const data = d.data();
            // Remove id field if it exists in data to prevent conflicts
            delete data.id;
            return {
              id: d.id, // Use Firestore document ID
              ...data,
            } as ProductRecord;
          },
        );
        console.log("📦 Fallback products:", products);
        return products;
      } catch (fallbackError) {
        console.error("❌ Error fetching products:", fallbackError);
        return [];
      }
    }
  },
  [CACHE_TAG_PRODUCTS],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_PRODUCTS],
  },
);

export async function addProductServer(data: ProductRecord) {
  const { revalidateTag } = await import("next/cache");
  const now = new Date().toISOString();
  const docRef = await adminDb.collection(PRODUCTS).add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  revalidateTag(CACHE_TAG_PRODUCTS, "max"); // Invalidate cache
  return { id: docRef.id };
}

export async function updateProductServer(
  id: string,
  data: Partial<ProductRecord>,
) {
  const { revalidateTag } = await import("next/cache");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...updateData } = data; // Remove id from data to prevent conflicts
  await adminDb
    .collection(PRODUCTS)
    .doc(id)
    .set(
      { ...updateData, updatedAt: new Date().toISOString() },
      { merge: true },
    );
  revalidateTag(CACHE_TAG_PRODUCTS, "max"); // Invalidate cache
  return { ok: true };
}

export async function deleteProductServer(id: string) {
  const { revalidateTag } = await import("next/cache");
  await adminDb.collection(PRODUCTS).doc(id).delete();
  revalidateTag(CACHE_TAG_PRODUCTS, "max"); // Invalidate cache
  return { ok: true };
}
