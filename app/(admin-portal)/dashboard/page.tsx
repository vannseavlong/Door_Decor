"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LogOut, Package, FolderTree, Layout } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";
import {
  HeroSection,
  ProductsTab,
  CategoriesTab,
  MessagesTab,
  FooterTab,
} from "@/components/admin-portal";
import Image from "next/image";

type TabType = "hero" | "products" | "categories" | "messages" | "footer";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/Door-Logo.jpg"
                alt="Wonder Door Logo"
                width={40}
                height={40}
                className="h-10 w-auto mr-3 object-contain"
              />
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-brand-primary  transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("hero")}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "hero"
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Home className="w-5 h-5 inline-block mr-2" />
                Hero Section
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "products"
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Package className="w-5 h-5 inline-block mr-2" />
                Products
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "categories"
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FolderTree className="w-5 h-5 inline-block mr-2" />
                Categories
              </button>
              {/* <button
                onClick={() => setActiveTab("messages")}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "messages"
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Mail className="w-5 h-5 inline-block mr-2" />
                Messages
              </button> */}
              <button
                onClick={() => setActiveTab("footer")}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "footer"
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Layout className="w-5 h-5 inline-block mr-2" />
                Footer
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "hero" && <HeroSection />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "footer" && <FooterTab />}
      </div>
    </div>
  );
}
