"use server";
import {
  getFooterServer,
  updateFooterServer,
  FooterRecord,
} from "@/lib/firebase/footer";

export async function getFooter(): Promise<FooterRecord | null> {
  return getFooterServer();
}

export async function saveFooter(data: FooterRecord) {
  return updateFooterServer(data);
}
