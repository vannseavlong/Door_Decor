"use server";

import {
  getAboutDataServer,
  updateAboutDataServer,
  AboutDataRecord,
} from "@/lib/firebase/about";

export async function getAboutData(): Promise<AboutDataRecord | null> {
  return getAboutDataServer();
}

export async function saveAboutData(data: AboutDataRecord) {
  return updateAboutDataServer(data);
}
