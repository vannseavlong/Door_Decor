import { db as adminDb } from "@/lib/firebase/server";

const HERO_SECTION = "heroSection";

export type HeroSectionRecord = {
  title: { en: string; km: string };
  description: { en: string; km: string };
  imageUrl: string;
  bannerEnLandscape?: string;
  bannerEnPortrait?: string;
  bannerKmLandscape?: string;
  bannerKmPortrait?: string;
};

export async function getHeroSectionServer(): Promise<HeroSectionRecord | null> {
  const snap = await adminDb.collection(HERO_SECTION).doc("main").get();
  if (!snap.exists) return null;
  return snap.data() as HeroSectionRecord;
}

export async function updateHeroSectionServer(data: HeroSectionRecord) {
  console.log("🔥 Firebase: Updating hero section in Firestore...");
  console.log("🔥 Data keys:", Object.keys(data));
  console.log("🔥 Has bannerEnLandscape:", !!data.bannerEnLandscape);
  console.log("🔥 Has bannerEnPortrait:", !!data.bannerEnPortrait);
  console.log("🔥 Has bannerKmLandscape:", !!data.bannerKmLandscape);
  console.log("🔥 Has bannerKmPortrait:", !!data.bannerKmPortrait);

  await adminDb.collection(HERO_SECTION).doc("main").set(data, { merge: true });
  console.log("🔥 Firebase: Update complete!");
  return { ok: true };
}
