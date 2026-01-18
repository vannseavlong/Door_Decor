import { db as adminDb } from "@/lib/firebase/server";
import { unstable_cache } from "next/cache";

const FOOTER = "footer";
const CACHE_TAG_FOOTER = "footer-data";

export type FooterRecord = {
  companyDescription: { en: string; km: string };
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    line: string;
    tiktok: string;
    telegram: string;
    telegramChannel: string;
  };
};

export const getFooterServer = unstable_cache(
  async (): Promise<FooterRecord | null> => {
    const snap = await adminDb.collection(FOOTER).doc("main").get();
    if (!snap.exists) return null;
    return snap.data() as FooterRecord;
  },
  [CACHE_TAG_FOOTER],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_FOOTER],
  },
);

export async function updateFooterServer(data: FooterRecord) {
  const { revalidateTag } = await import("next/cache");
  await adminDb.collection(FOOTER).doc("main").set(data, { merge: true });
  revalidateTag(CACHE_TAG_FOOTER); // Invalidate cache
  return { ok: true };
}
