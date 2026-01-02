import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const COLLECTION_NAME = "installations";

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

export async function getInstallationsServer(): Promise<InstallationRecord[]> {
  try {
    const querySnapshot = await adminDb.collection(COLLECTION_NAME).get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as InstallationRecord[];
  } catch (error) {
    console.error("Error getting installations:", error);
    return [];
  }
}

export async function addInstallationServer(
  data: Omit<InstallationRecord, "id">
): Promise<string> {
  try {
    const docRef = await adminDb.collection(COLLECTION_NAME).add(data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding installation:", error);
    throw error;
  }
}

export async function updateInstallationServer(
  id: string,
  data: Partial<InstallationRecord>
) {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).update(data);
  } catch (error) {
    console.error("Error updating installation:", error);
    throw error;
  }
}

export async function deleteInstallationServer(id: string) {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
  } catch (error) {
    console.error("Error deleting installation:", error);
    throw error;
  }
}
