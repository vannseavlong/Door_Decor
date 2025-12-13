"use server";
import {
  getHeroSectionServer,
  updateHeroSectionServer,
  HeroSectionRecord,
} from "@/lib/firebase/heroSection";

export async function getHeroSection(): Promise<HeroSectionRecord | null> {
  return getHeroSectionServer();
}

export async function saveHeroSection(data: HeroSectionRecord) {
  return updateHeroSectionServer(data);
}
