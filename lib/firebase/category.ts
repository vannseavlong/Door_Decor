import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const CATEGORIES = "categories";

export type CategoryRecord = {
  id?: string;
  name: { en: string; km: string };
  description: { en: string; km: string };
  createdAt?: string;
  updatedAt?: string;
};

export async function getCategoriesServer(): Promise<CategoryRecord[]> {
  const snap = await adminDb
    .collection(CATEGORIES)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
    id: d.id,
    ...(d.data() as CategoryRecord),
  }));
}

export async function addCategoryServer(data: CategoryRecord) {
  const now = new Date().toISOString();
  const docRef = await adminDb.collection(CATEGORIES).add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id };
}

export async function updateCategoryServer(
  id: string,
  data: Partial<CategoryRecord>
) {
  await adminDb
    .collection(CATEGORIES)
    .doc(id)
    .set({ ...data, updatedAt: new Date().toISOString() }, { merge: true });
  return { ok: true };
}

export async function deleteCategoryServer(id: string) {
  await adminDb.collection(CATEGORIES).doc(id).delete();
  return { ok: true };
}
