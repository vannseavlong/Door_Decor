import { db as adminDb } from "@/lib/firebase/server";

const HERO_SECTION = "heroSection";

export type HeroSectionRecord = {
  title: { en: string; km: string };
  description: { en: string; km: string };
  imageUrl: string;
};

export async function getHeroSectionServer(): Promise<HeroSectionRecord | null> {
  const snap = await adminDb.collection(HERO_SECTION).doc("main").get();
  if (!snap.exists) return null;
  return snap.data() as HeroSectionRecord;
}

export async function updateHeroSectionServer(data: HeroSectionRecord) {
  await adminDb.collection(HERO_SECTION).doc("main").set(data, { merge: true });
  return { ok: true };
}
