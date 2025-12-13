import { db as adminDb } from "@/lib/firebase/server";

const FOOTER = "footer";

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

export async function getFooterServer(): Promise<FooterRecord | null> {
  const snap = await adminDb.collection(FOOTER).doc("main").get();
  if (!snap.exists) return null;
  return snap.data() as FooterRecord;
}

export async function updateFooterServer(data: FooterRecord) {
  await adminDb.collection(FOOTER).doc("main").set(data, { merge: true });
  return { ok: true };
}
