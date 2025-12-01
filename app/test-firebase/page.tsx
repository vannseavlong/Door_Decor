"use client";

import { useEffect, useState } from "react";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/config/firebase";

export default function TestFirebasePage() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const checkConfig = () => {
      const result = {
        isConfigured: isFirebaseConfigured,
        config: {
          apiKey: firebaseConfig.apiKey
            ? `***${firebaseConfig.apiKey.slice(-4)}`
            : "MISSING",
          authDomain: firebaseConfig.authDomain || "MISSING",
          projectId: firebaseConfig.projectId || "MISSING",
          storageBucket: firebaseConfig.storageBucket || "MISSING",
          messagingSenderId: firebaseConfig.messagingSenderId || "MISSING",
          appId: firebaseConfig.appId
            ? `***${firebaseConfig.appId.slice(-4)}`
            : "MISSING",
        },
      };
      setStatus(JSON.stringify(result, null, 2));
    };

    checkConfig();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Firebase Configuration Test</h1>
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {status}
        </pre>
        <div className="mt-4">
          <h2 className="font-bold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>If isConfigured is false, check your .env.local file</li>
            <li>Make sure all NEXT_PUBLIC_FIREBASE_* variables are set</li>
            <li>Restart your dev server after changing .env.local</li>
            <li>
              Go to Firebase Console → Authentication → Sign-in method → Enable
              Email/Password
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
