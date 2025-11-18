import admin from "firebase-admin";

if (!admin.apps.length) {
  const key = process.env.FIREBASE_ADMIN_KEY;
  if (!key) {
    throw new Error(
      "FIREBASE_ADMIN_KEY env var is required for server Firebase admin SDK"
    );
  }
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(key)),
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
