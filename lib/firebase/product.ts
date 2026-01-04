import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const PRODUCTS = "products";

export type ProductRecord = {
  id?: string;
  code?: string; // Product code for display
  name: { en: string; km: string };
  description: { en: string; km: string };
  price: string;
  categoryId: string;
  imageUrl: string; // Single image only
  productCode: { [key: string]: { en: string; km: string } };
  createdAt?: string;
  updatedAt?: string;
};

export async function getProductsServer(): Promise<ProductRecord[]> {
  try {
    console.log("🔍 Attempting to fetch products from Firebase...");
    const snap = await adminDb
      .collection(PRODUCTS)
      .orderBy("createdAt", "desc")
      .get();
    console.log(`✅ Found ${snap.docs.length} products in Firebase`);
    const products = snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
      const data = d.data();
      // Remove id field if it exists in data to prevent conflicts
      delete data.id;
      return {
        id: d.id, // Use Firestore document ID
        ...data,
      } as ProductRecord;
    });
    console.log("📦 Products:", products);
    return products;
  } catch (error) {
    console.error(
      "❌ Error fetching products with orderBy, trying without:",
      error
    );
    // Fallback: fetch without ordering if orderBy fails
    try {
      const snap = await adminDb.collection(PRODUCTS).get();
      console.log(
        `✅ Fallback: Found ${snap.docs.length} products in Firebase`
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
        }
      );
      console.log("📦 Fallback products:", products);
      return products;
    } catch (fallbackError) {
      console.error("❌ Error fetching products:", fallbackError);
      return [];
    }
  }
}

export async function addProductServer(data: ProductRecord) {
  const now = new Date().toISOString();
  const docRef = await adminDb.collection(PRODUCTS).add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id };
}

export async function updateProductServer(
  id: string,
  data: Partial<ProductRecord>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...updateData } = data; // Remove id from data to prevent conflicts
  await adminDb
    .collection(PRODUCTS)
    .doc(id)
    .set(
      { ...updateData, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  return { ok: true };
}

export async function deleteProductServer(id: string) {
  await adminDb.collection(PRODUCTS).doc(id).delete();
  return { ok: true };
}
