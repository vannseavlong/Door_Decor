import { db as adminDb } from "@/lib/firebase/server";

const ABOUT_COLLECTION = "about";
const ABOUT_DOC_ID = "main";

export type AboutDataRecord = {
  heroImage: string;
  description: {
    en: string;
    km: string;
  };
  additionalImage: string;
};

export async function getAboutDataServer(): Promise<AboutDataRecord | null> {
  try {
    const snap = await adminDb
      .collection(ABOUT_COLLECTION)
      .doc(ABOUT_DOC_ID)
      .get();
    if (!snap.exists) return null;
    return snap.data() as AboutDataRecord;
  } catch (error) {
    console.error("Error getting about data:", error);
    return null;
  }
}

export async function updateAboutDataServer(data: AboutDataRecord) {
  try {
    await adminDb
      .collection(ABOUT_COLLECTION)
      .doc(ABOUT_DOC_ID)
      .set(data, { merge: true });
    return { ok: true };
  } catch (error) {
    console.error("Error updating about data:", error);
    throw error;
  }
}
