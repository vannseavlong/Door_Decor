import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";

const COLLECTION_NAME = "installations";
const CACHE_TAG_INSTALLATIONS = "installations-list";

export type InstallationRecord = {
  id: string;
  title: string;
  title_km?: string;
  description: string;
  description_km?: string;
  image: string;
  tag: string;
  href?: string;
  location?: string;
  date?: string;
};

export const getInstallationsServer = unstable_cache(
  async (): Promise<InstallationRecord[]> => {
    try {
      const querySnapshot = await adminDb.collection(COLLECTION_NAME).get();
      return querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          // Remove id field if it exists in data to prevent conflicts
          delete data.id;
          return {
            id: doc.id, // Use Firestore document ID
            ...data,
          } as InstallationRecord;
        },
      );
    } catch (error) {
      console.error("Error getting installations:", error);
      return [];
    }
  },
  [CACHE_TAG_INSTALLATIONS],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_INSTALLATIONS],
  },
);

export async function addInstallationServer(
  data: Omit<InstallationRecord, "id">,
): Promise<string> {
  try {
    const { revalidateTag } = await import("next/cache");
    const docRef = await adminDb.collection(COLLECTION_NAME).add(data);
    revalidateTag(CACHE_TAG_INSTALLATIONS, "max"); // Invalidate cache
    return docRef.id;
  } catch (error) {
    console.error("Error adding installation:", error);
    throw error;
  }
}

export async function updateInstallationServer(
  id: string,
  data: Partial<InstallationRecord>,
) {
  try {
    const { revalidateTag } = await import("next/cache");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = data; // Remove id from data
    await adminDb
      .collection(COLLECTION_NAME)
      .doc(id)
      .set(updateData, { merge: true });
    revalidateTag(CACHE_TAG_INSTALLATIONS, "max"); // Invalidate cache
  } catch (error) {
    console.error("Error updating installation:", error);
    throw error;
  }
}

export async function deleteInstallationServer(id: string) {
  try {
    const { revalidateTag } = await import("next/cache");
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidateTag(CACHE_TAG_INSTALLATIONS, "max"); // Invalidate cache
  } catch (error) {
    console.error("Error deleting installation:", error);
    throw error;
  }
}
