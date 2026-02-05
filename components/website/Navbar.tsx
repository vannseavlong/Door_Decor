"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/website/LanguageSwitcher";
import ContactButton from "@/components/website/ContactButton";
import { useTranslate } from "@/lib/utils/useTranslate";
import { localizePath } from "@/lib/utils/localizePath";
import { CategoryRecord } from "@/lib/firebase/category";

type NavbarProps = {
  categories?: CategoryRecord[];
};

const SUPPORTED_LOCALES = ["en", "kh"];

const Navbar: React.FC<NavbarProps> = ({ categories = [] }) => {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "en";
  const pathname = usePathname();

  // Sort categories by sortOrder
  const sortedCategories = [...categories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  // Strip locale prefix from pathname for route matching
  const getPathWithoutLocale = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
      return "/" + segments.slice(1).join("/") || "/";
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement | null>(null);

  // Helper to get category name based on locale
  const getCategoryName = (name: string | { en: string; km: string }) => {
    if (typeof name === "string") return name;
    return currentLocale === "kh" ? name.km : name.en;
  };

  // Helper to slugify category name
  const slugify = (text: string) =>
    encodeURIComponent(
      text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        productRef.current &&
        !productRef.current.contains(e.target as Node)
      ) {
        setProductOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setProductOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50 shadow-sm">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-4">
            <Link href={localizePath("/", currentLocale)} className="flex items-center gap-3">
              <Image
                src="/Door-Logo.jpg"
                alt="logo"
                width={96}
                height={96}
                className="object-contain max-h-20 md:max-h-24 w-auto"
                style={{ maxHeight: "5rem" }} // fallback for max-h-20
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Link
                href={localizePath("/", currentLocale)}
                className={`body-base font-medium transition-colors font-khmer ${
                  pathWithoutLocale === "/" ? "text-brand-primary" : "text-brand-dark hover-brand-primary"
                }`}
              >
                {t("navHome")}
              </Link>
              <Link
                href={localizePath("/about", currentLocale)}
                className={`body-base font-medium transition-colors font-khmer ${
                  pathWithoutLocale === "/about" ? "text-brand-primary" : "text-brand-dark hover-brand-primary"
                }`}
              >
                {t("navAboutUs")}
              </Link>

              <div ref={productRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProductOpen((s) => !s)}
                  aria-haspopup="menu"
                  aria-expanded={productOpen}
                  className={`body-base font-medium flex items-center gap-2 transition-colors font-khmer ${
                    pathWithoutLocale?.startsWith("/product") ? "text-brand-primary" : "text-brand-dark hover-brand-primary"
                  }`}
                >
                  <span>{t("navProduct")}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transform transition-transform duration-150 ${
                      productOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  role="menu"
                  className={`absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg transition-opacity ${
                    productOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ul className="py-2" role="none">
                    {sortedCategories.length > 0 ? (
                      sortedCategories.map((cat) => (
                        <li key={cat.id} role="none">
                          <Link
                            href={localizePath(
                              `/products/category/${slugify(
                                getCategoryName(cat.name)
                              )}`,
                              currentLocale
                            )}
                            role="menuitem"
                            tabIndex={productOpen ? 0 : -1}
                            onClick={() => setProductOpen(false)}
                            className="block px-4 py-2 body-sm text-brand-dark hover:bg-brand-light hover-brand-primary transition-colors font-khmer"
                          >
                            {getCategoryName(cat.name)}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 body-sm text-gray-500 font-khmer">
                        {t("noProducts")}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ContactButton />
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-2 rounded-md"
            >
              {/* Animated hamburger -> X (use inline transformOrigin + transform for SVG reliability) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-brand-dark"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  style={{
                    transformOrigin: "12px 12px",
                    transform: open
                      ? "translateY(6px) rotate(45deg)"
                      : "translateY(0)",
                    transition: "transform 200ms ease, opacity 200ms ease",
                  }}
                />

                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  style={{
                    transformOrigin: "12px 12px",
                    opacity: open ? 0 : 1,
                    transition: "opacity 200ms ease",
                  }}
                />

                <rect
                  x="3"
                  y="17"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  style={{
                    transformOrigin: "12px 12px",
                    transform: open
                      ? "translateY(-6px) rotate(-45deg)"
                      : "translateY(0)",
                    transition: "transform 200ms ease, opacity 200ms ease",
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile panel (compact under navbar) */}
      <div
        className={`absolute top-full left-0 w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href={localizePath("/", currentLocale)}
                className={`body-base font-khmer ${
                  pathWithoutLocale === "/" ? "text-brand-primary" : "text-brand-dark"
                }`}
              >
                {t("navHome")}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/about", currentLocale)}
                className={`body-base font-khmer ${
                  pathWithoutLocale === "/about" ? "text-brand-primary" : "text-brand-dark"
                }`}
              >
                {t("navAboutUs")}
              </Link>
            </li>

            <li>
              <details className="group">
                <summary className={`body-base flex items-center justify-between cursor-pointer font-khmer ${
                  pathWithoutLocale?.startsWith("/product") ? "text-brand-primary" : "text-brand-dark"
                }`}>
                  {t("navProduct")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform transition-transform duration-150 group-open:rotate-180"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  <li>
                    <Link
                      href={localizePath("/product", currentLocale)}
                      className="block py-2 body-sm text-brand-dark hover-brand-primary font-khmer"
                    >
                      {t("navAllProducts")}
                    </Link>
                  </li>
                  {sortedCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={localizePath(
                          `/products/category/${slugify(
                            getCategoryName(cat.name)
                          )}`,
                          currentLocale
                        )}
                        className="block py-2 body-sm text-brand-dark hover-brand-primary font-khmer"
                      >
                        {getCategoryName(cat.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            <li>
              <div className="mt-2">
                <LanguageSwitcher />
              </div>
            </li>

            <li className="mt-4">
              <ContactButton className="w-full justify-center" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
