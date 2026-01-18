import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";

const CATEGORIES = "categories";
const CACHE_TAG_CATEGORIES = "categories-list";

export type CategoryRecord = {
  id?: string; // Internal ID stored in document (used for product references)
  firestoreId?: string; // Firestore document ID
  name: { en: string; km: string };
  description: { en: string; km: string };
  createdAt?: string;
  updatedAt?: string;
};

export const getCategoriesServer = unstable_cache(
  async (): Promise<CategoryRecord[]> => {
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
        error,
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
  },
  [CACHE_TAG_CATEGORIES],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_CATEGORIES],
  },
);

export async function addCategoryServer(data: CategoryRecord) {
  const { revalidateTag } = await import("next/cache");
  const now = new Date().toISOString();
  const docRef = await adminDb.collection(CATEGORIES).add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  revalidateTag(CACHE_TAG_CATEGORIES); // Invalidate cache
  return { id: docRef.id };
}

export async function updateCategoryServer(
  id: string,
  data: Partial<CategoryRecord>,
) {
  const { revalidateTag } = await import("next/cache");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...updateData } = data; // Remove id from data to prevent conflicts
  await adminDb
    .collection(CATEGORIES)
    .doc(id)
    .set(
      { ...updateData, updatedAt: new Date().toISOString() },
      { merge: true },
    );
  revalidateTag(CACHE_TAG_CATEGORIES); // Invalidate cache
  return { ok: true };
}

export async function deleteCategoryServer(id: string) {
  const { revalidateTag } = await import("next/cache");
  await adminDb.collection(CATEGORIES).doc(id).delete();
  revalidateTag(CACHE_TAG_CATEGORIES); // Invalidate cache
  return { ok: true };
}
