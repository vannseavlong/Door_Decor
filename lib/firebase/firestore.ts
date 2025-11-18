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
  return { id: docRef.id };
}

export async function updateProductServer(
  id: string,
  data: Partial<ProductRecord>
) {
  await adminDb.collection(PRODUCTS).doc(id).set(data, { merge: true });
  return { ok: true };
}

export async function deleteProductServer(id: string) {
  await adminDb.collection(PRODUCTS).doc(id).delete();
  return { ok: true };
}
