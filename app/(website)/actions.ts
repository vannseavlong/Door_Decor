// Server actions for fetching website data
// These are optimized for customer-facing pages with ISR

import { getHeroSectionServer } from "@/lib/firebase/heroSection";
import {
  getCategoriesOptimized,
  getInstallationsOptimized,
} from "@/lib/firebase/optimized-queries";

export async function getHomePageData() {
  try {
    const [heroData, installations] = await Promise.all([
      getHeroSectionServer(),
      getInstallationsOptimized(6), // Get 6 latest installations for blog section
    ]);

    return {
      hero: heroData,
      installations,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      hero: null,
      installations: [],
    };
  }
}

export async function getCategoriesForWebsite() {
  try {
    return await getCategoriesOptimized();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
