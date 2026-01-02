"use server";

import {
  getInstallationsServer,
  addInstallationServer,
  updateInstallationServer,
  deleteInstallationServer,
  InstallationRecord,
} from "@/lib/firebase/installations";

export async function getInstallations(): Promise<InstallationRecord[]> {
  return getInstallationsServer();
}

export async function addInstallation(data: Omit<InstallationRecord, "id">) {
  return addInstallationServer(data);
}

export async function updateInstallation(
  id: string,
  data: Partial<InstallationRecord>
) {
  return updateInstallationServer(id, data);
}

export async function deleteInstallation(id: string) {
  return deleteInstallationServer(id);
}
