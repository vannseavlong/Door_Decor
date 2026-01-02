"use client";

import React from "react";
import {
  Home,
  Package,
  FolderTree,
  Layout,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

type TabType =
  | "hero"
  | "about"
  | "products"
  | "categories"
  | "installations"
  | "footer";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const tabs = [
  { id: "hero" as const, label: "Hero", icon: Home },
  { id: "about" as const, label: "About", icon: FileText },
  { id: "products" as const, label: "Products", icon: Package },
  { id: "categories" as const, label: "Categories", icon: FolderTree },
  { id: "installations" as const, label: "Installations", icon: ImageIcon },
  { id: "footer" as const, label: "Footer", icon: Layout },
];

export default function AdminBottomBar({ activeTab, onTabChange }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <nav className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1 ${
                isActive
                  ? "text-brand-primary bg-brand-primary/10"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
