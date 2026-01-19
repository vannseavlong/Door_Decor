import { db as adminDb } from "@/lib/firebase/server";
import { unstable_cache } from "next/cache";

const HERO_SECTION = "heroSection";
const CACHE_TAG_HERO = "hero-section";

export type HeroSectionRecord = {
  title: { en: string; km: string };
  description: { en: string; km: string };
  imageUrl: string;
  bannerEnLandscape?: string;
  bannerEnPortrait?: string;
  bannerKmLandscape?: string;
  bannerKmPortrait?: string;
};

export const getHeroSectionServer = unstable_cache(
  async (): Promise<HeroSectionRecord | null> => {
    const snap = await adminDb.collection(HERO_SECTION).doc("main").get();
    if (!snap.exists) return null;
    return snap.data() as HeroSectionRecord;
  },
  [CACHE_TAG_HERO],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: [CACHE_TAG_HERO],
  },
);

export async function updateHeroSectionServer(data: HeroSectionRecord) {
  console.log("🔥 Firebase: Updating hero section in Firestore...");
  console.log("🔥 Data keys:", Object.keys(data));
  console.log("🔥 Has bannerEnLandscape:", !!data.bannerEnLandscape);
  console.log("🔥 Has bannerEnPortrait:", !!data.bannerEnPortrait);
  console.log("🔥 Has bannerKmLandscape:", !!data.bannerKmLandscape);
  console.log("🔥 Has bannerKmPortrait:", !!data.bannerKmPortrait);

  const { revalidateTag } = await import("next/cache");
  await adminDb.collection(HERO_SECTION).doc("main").set(data, { merge: true });
  revalidateTag(CACHE_TAG_HERO, "max"); // Invalidate cache
  console.log("🔥 Firebase: Update complete!");
  return { ok: true };
}
