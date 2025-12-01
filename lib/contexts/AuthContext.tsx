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
    // Only use real Firebase Auth
    const unsubscribe = onAuthStateChangedFn(
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

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
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
    } catch (error) {
      console.error("Login error:", error);
      // @ts-expect-error: error may not have code/message
      console.error("Error code:", error?.code);
      // @ts-expect-error: error may not have code/message
      console.error("Error message:", error?.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await (auth as FirebaseAuth).signOut();
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
