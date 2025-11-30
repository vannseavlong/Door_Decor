// Firebase configuration
// Replace these with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// PRODUCTION SETUP INSTRUCTIONS:
// 1. Install Firebase: npm install firebase
// 2. Create a Firebase project at https://console.firebase.google.com
// 3. Enable Authentication (Email/Password)
// 4. Create Firestore Database
// 5. Enable Firebase Storage and set up security rules
// 6. Copy your config from Firebase Console and replace the values above
// 7. Uncomment the imports and exports below
// 8. Comment out or remove the mock implementations

// Mock Firebase implementation for demonstration
// In production, uncomment the imports below and initialize Firebase properly

/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
*/

// Mock implementations for development
export const auth = {
  currentUser: null as any,
  signInWithEmailAndPassword: async (email: string, password: string) => {
    return { user: { uid: 'mock-user-id', email } };
  },
  signOut: async () => {
    return Promise.resolve();
  },
  onAuthStateChanged: (callback: any) => {
    const unsubscribe = () => {};
    return unsubscribe;
  }
};

export const db = {
  collection: (name: string) => ({
    get: async () => ({ docs: [] }),
    doc: (id: string) => ({
      get: async () => ({ exists: true, data: () => ({}) }),
      set: async (data: any) => Promise.resolve(),
      update: async (data: any) => Promise.resolve(),
      delete: async () => Promise.resolve()
    }),
    add: async (data: any) => ({ id: 'new-id' })
  })
};

export const storage = {
  ref: (path: string) => ({
    put: async (file: File) => ({ ref: { getDownloadURL: async () => 'mock-url' } }),
    getDownloadURL: async () => 'mock-url'
  })
};

export { firebaseConfig };
