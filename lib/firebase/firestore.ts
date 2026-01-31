import { db as adminDb } from "@/lib/firebase/server";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

const PRODUCTS = "products";

export type ProductRecord = {
  id?: string;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
  createdAt?: number;
};

export async function getProductsServer(): Promise<ProductRecord[]> {
  const snap = await adminDb
    .collection(PRODUCTS)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d: QueryDocumentSnapshot) => ({
    id: d.id,
    ...(d.data() as DocumentData),
  })) as ProductRecord[];
}

export async function createProductServer(data: ProductRecord) {
  const docRef = await adminDb.collection(PRODUCTS).add({
    ...data,
    createdAt: data.createdAt || Date.now(),
  });
  // Invalidate Next.js ISR cache for products so website fetches latest data
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("products-list", "max");
  } catch (e) {
    // ignore if revalidateTag not available in this environment
  }
  return { id: docRef.id };
}

export async function updateProductServer(
  id: string,
  data: Partial<ProductRecord>
) {
  await adminDb.collection(PRODUCTS).doc(id).set(data, { merge: true });
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("products-list", "max");
  } catch (e) {
    // ignore if revalidateTag not available in this environment
  }
  return { ok: true };
}

export async function deleteProductServer(id: string) {
  await adminDb.collection(PRODUCTS).doc(id).delete();
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("products-list", "max");
  } catch (e) {
    // ignore if revalidateTag not available in this environment
  }
  return { ok: true };
}
