"use client";

import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Login - Starting login process for:", email);

      await login(email, password);
      console.log("Login - Firebase auth successful");

      // After sign-in, validate that the email is allowed to access admin.
      console.log("Login - Checking admin whitelist via API");
      const res = await fetch("/api/admin/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Login - API response status:", res.status);

      if (!res.ok) {
        await logout();
        toast.error("Your account is not allowed to access the admin panel.");
        return;
      }

      const data = await res.json();
      console.log("Login - API response data:", data);

      if (!data.allowed) {
        await logout();
        toast.error("Your account is not allowed to access the admin panel.");
        return;
      }

      console.log("Login - Success! Redirecting to dashboard");
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login - Error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-lg mb-4">
            <span className="text-white">WD</span>
          </div>
          <h1 className="text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to manage your content</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-orange-500 hover:text-orange-600"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Demo Mode:</strong> Enter any email and password to access
            the admin panel. In production, this will authenticate with
            Firebase.
          </p>
        </div>
      </div>
    </div>
  );
}
