import { db as adminDb } from "@/lib/firebase/server";
import { unstable_cache } from "next/cache";

const ABOUT_COLLECTION = "about";
const ABOUT_DOC_ID = "main";
const CACHE_TAG_ABOUT = "about-data";

export type CoreValue = {
  id: string;
  icon: string; // SVG path or icon name
  title: {
    en: string;
    km: string;
  };
  description: {
    en: string;
    km: string;
  };
};

export type AboutDataRecord = {
  heroImage?: string; // legacy field
  aboutLandscape?: string;
  aboutPortrait?: string;
  description: {
    en: string;
    km: string;
  };
  additionalImage: string;
  coreValues?: CoreValue[];
};

export const getAboutDataServer = unstable_cache(
  async (): Promise<AboutDataRecord | null> => {
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
  },
  [CACHE_TAG_ABOUT],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_ABOUT],
  },
);

export async function updateAboutDataServer(data: AboutDataRecord) {
  try {
    const { revalidateTag } = await import("next/cache");
    await adminDb
      .collection(ABOUT_COLLECTION)
      .doc(ABOUT_DOC_ID)
      .set(data, { merge: true });
    revalidateTag(CACHE_TAG_ABOUT, "max"); // Invalidate cache
    return { ok: true };
  } catch (error) {
    console.error("Error updating about data:", error);
    throw error;
  }
}
