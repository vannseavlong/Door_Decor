import admin from "firebase-admin";

// Create a reusable error for missing env var so we don't throw during module import.
const MISSING_KEY_ERROR = new Error(
  "FIREBASE_ADMIN_KEY env var is required for server Firebase admin SDK"
);

function createThrowingProxy() {
  // Proxy will throw when any property is accessed or method is called.
  return new Proxy(
    {},
    {
      get() {
        throw MISSING_KEY_ERROR;
      },
      apply() {
        throw MISSING_KEY_ERROR;
      },
    }
  ) as any;
}

let _auth: any = null;
let _db: any = null;

function initAdminIfNeeded() {
  if (_auth && _db) return;
  if (!process.env.FIREBASE_ADMIN_KEY) {
    // Do not throw here — return proxies so importing modules (during build)
    // won't crash. Actual runtime usage will throw with a clear message.
    _auth = createThrowingProxy();
    _db = createThrowingProxy();
    return;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN_KEY)
      ),
    });
  }

  _auth = admin.auth();
  _db = admin.firestore();
}

// Initialize lazily when this module is imported. This avoids throwing during
// build-time module collection but still provides actual admin instances at
// runtime when the env var is present.
initAdminIfNeeded();

export const auth = _auth;
export const db = _db;
