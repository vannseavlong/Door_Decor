import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const CATEGORIES = "categories";

export type CategoryRecord = {
  id?: string; // Internal ID stored in document (used for product references)
  firestoreId?: string; // Firestore document ID
  name: { en: string; km: string };
  description: { en: string; km: string };
  createdAt?: string;
  updatedAt?: string;
};

export async function getCategoriesServer(): Promise<CategoryRecord[]> {
  try {
    const snap = await adminDb
      .collection(CATEGORIES)
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
      const data = d.data();
      return {
        ...data,
        firestoreId: d.id, // Preserve Firestore document ID
        // Keep internal id field from document data (if exists)
      } as CategoryRecord;
    });
  } catch (error) {
    console.error(
      "Error fetching categories with orderBy, trying without:",
      error
    );
    // Fallback: fetch without ordering if orderBy fails
    try {
      const snap = await adminDb.collection(CATEGORIES).get();
      return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
        const data = d.data();
        return {
          ...data,
          firestoreId: d.id, // Preserve Firestore document ID
          // Keep internal id field from document data (if exists)
        } as CategoryRecord;
      });
    } catch (fallbackError) {
      console.error("Error fetching categories:", fallbackError);
      return [];
    }
  }
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...updateData } = data; // Remove id from data to prevent conflicts
  await adminDb
    .collection(CATEGORIES)
    .doc(id)
    .set(
      { ...updateData, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  return { ok: true };
}

export async function deleteCategoryServer(id: string) {
  await adminDb.collection(CATEGORIES).doc(id).delete();
  return { ok: true };
}
