"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslate } from "@/lib/utils/useTranslate";

const OPTIONS: { code: string; label: string; flagSrc: string }[] = [
  { code: "en", label: "EN", flagSrc: "/flags/EnFlag.webp" },
  { code: "kh", label: "ខ្មែរ", flagSrc: "/flags/KmFlag.webp" },
];

const SUPPORTED_LOCALES = ["en", "kh"];

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslate();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Switch language and navigate to the new localized route
  const handleLanguageChange = (newLang: string) => {
    // Update global state
    setLang(newLang);

    // Close dropdown
    try {
      if (detailsRef.current) detailsRef.current.open = false;
    } catch {
      /* ignore */
    }

    // Build new path with the new language prefix
    const segments = pathname.split("/").filter(Boolean);

    // Check if first segment is a locale
    if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
      // Replace the existing locale
      segments[0] = newLang;
    } else {
      // No locale in path, prepend the new one
      segments.unshift(newLang);
    }

    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left w-full md:w-auto">
      <details ref={detailsRef} className="relative">
        <summary className="flex items-center gap-2 cursor-pointer select-none py-2 px-3 hover:bg-gray-100">
          <Image
            src={
              OPTIONS.find((o) => o.code === lang)?.flagSrc ??
              "/flags/EnFlag.webp"
            }
            alt={lang}
            width={24}
            height={16}
            className="object-cover"
          />
          <span className="hidden sm:inline text-sm">
            {OPTIONS.find((o) => o.code === lang)?.label}
          </span>
          <svg
            className="ml-1 h-3 w-3"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>

        <div className="md:absolute static md:right-0 mt-2 md:w-44 w-full md:shadow-lg bg-white ring-1 ring-black/5 z-50">
          {OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => handleLanguageChange(opt.code)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-3"
            >
              <Image
                src={opt.flagSrc}
                alt={opt.code}
                width={24}
                height={16}
                className="object-cover"
              />
              <span className="text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
