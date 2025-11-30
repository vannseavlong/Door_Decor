"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { auth } from "@/lib/firebase/client";
import {
  signInWithEmailAndPassword as signInWithEmailPasswordFn,
  onAuthStateChanged as onAuthStateChangedFn,
  type User as FirebaseUser,
  type Auth as FirebaseAuth,
} from "firebase/auth";
import { isFirebaseConfigured } from "@/lib/config/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use modular `onAuthStateChanged` when realtime Firebase is configured,
    // otherwise rely on the mock `auth.onAuthStateChanged` provided by our client mock.
    let unsubscribe: (() => void) | undefined;

    if (isFirebaseConfigured) {
      unsubscribe = onAuthStateChangedFn(
        auth as FirebaseAuth,
        (user: FirebaseUser | null) => {
          if (!user) {
            setCurrentUser(null);
            setLoading(false);
            return;
          }

          const normalized: User = {
            uid: (user.uid as string) ?? "",
            email: typeof user.email === "string" ? user.email : null,
            displayName:
              typeof (user.displayName as string) === "string"
                ? (user.displayName as string)
                : null,
          };

          setCurrentUser(normalized);
          setLoading(false);
        }
      );
    } else {
      // mock path
      unsubscribe = (auth as any).onAuthStateChanged((user: unknown) => {
        if (!user) {
          setCurrentUser(null);
          setLoading(false);
          return;
        }

        const maybe = user as {
          uid?: string;
          email?: string | null;
          displayName?: string | null;
        };
        const normalized: User = {
          uid: maybe.uid ?? "",
          email: typeof maybe.email === "string" ? maybe.email : null,
          displayName:
            typeof maybe.displayName === "string" ? maybe.displayName : null,
        };

        setCurrentUser(normalized);
        setLoading(false);
      });
    }

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Use modular `signInWithEmailAndPassword` when Firebase is configured.
      if (isFirebaseConfigured) {
        const result = await signInWithEmailPasswordFn(
          auth as FirebaseAuth,
          email,
          password
        );
        const user = result.user as FirebaseUser;
        const normalized: User = {
          uid: user.uid ?? "",
          email: typeof user.email === "string" ? user.email : null,
          displayName:
            typeof (user.displayName as string) === "string"
              ? (user.displayName as string)
              : null,
        };
        setCurrentUser(normalized);
      } else {
        const result = await (auth as any).signInWithEmailAndPassword(
          email,
          password
        );
        const maybe = result.user as {
          uid?: string;
          email?: string | null;
          displayName?: string | null;
        };
        const normalized: User = {
          uid: maybe.uid ?? "",
          email: typeof maybe.email === "string" ? maybe.email : null,
          displayName:
            typeof maybe.displayName === "string" ? maybe.displayName : null,
        };
        setCurrentUser(normalized);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // In production, use: await signOut(auth);
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
