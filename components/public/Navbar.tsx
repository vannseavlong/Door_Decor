"use client";

import React, { useState } from "react";
import LanguageSwitcher from "@/components/public/LanguageSwitcher";
import ContactButton from "@/components/public/ContactButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/MMS-Logo.png" alt="logo" className="h-10 w-auto" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ContactButton />
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Menu"
              className="p-2 rounded-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-4">
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="px-1">
              <LanguageSwitcher />
            </div>
            <ContactButton />
          </div>
        </div>
      )}
    </header>
  );
}
