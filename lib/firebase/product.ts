import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const PRODUCTS = "products";

export type ProductRecord = {
  id?: string;
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
  const snap = await adminDb
    .collection(PRODUCTS)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
    id: d.id,
    ...(d.data() as ProductRecord),
  }));
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
  await adminDb
    .collection(PRODUCTS)
    .doc(id)
    .set({ ...data, updatedAt: new Date().toISOString() }, { merge: true });
  return { ok: true };
}

export async function deleteProductServer(id: string) {
  await adminDb.collection(PRODUCTS).doc(id).delete();
  return { ok: true };
}
