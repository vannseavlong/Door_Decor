"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/website/LanguageSwitcher";
import ContactButton from "@/components/website/ContactButton";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement | null>(null);

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
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Door-Logo.jpg"
                alt="logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-4 ml-6">
              <Link
                href="/about"
                className="text-base text-[#1A1A1A] font-medium hover:text-[#f7942d]"
              >
                About Us
              </Link>

              <div ref={productRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProductOpen((s) => !s)}
                  aria-haspopup="menu"
                  aria-expanded={productOpen}
                  className="text-base text-[#1A1A1A] font-medium hover:text-[#f7942d] flex items-center gap-2"
                >
                  <span>Product</span>
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
                  className={`absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg transition-opacity ${
                    productOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ul className="py-2" role="none">
                    {[
                      { name: "All Products", href: "/product" },
                      {
                        name: "WPC Doors",
                        href: "/product?category=wpc-doors",
                      },
                      { name: "Flooring", href: "/product?category=flooring" },
                      {
                        name: "Accessories",
                        href: "/product?category=accessories",
                      },
                    ].map((c) => (
                      <li key={c.href} role="none">
                        <Link
                          href={c.href}
                          role="menuitem"
                          tabIndex={productOpen ? 0 : -1}
                          onClick={() => setProductOpen(false)}
                          className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 hover:text-[#f7942d]"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
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
                className="text-[#1A1A1A]"
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
              <Link href="/about" className="text-base">
                About Us
              </Link>
            </li>

            <li>
              <details className="group">
                <summary className="text-base flex items-center justify-between cursor-pointer">
                  Product
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
                  {[
                    { name: "All Products", href: "/product" },
                    { name: "WPC Doors", href: "/product?category=wpc-doors" },
                    { name: "Flooring", href: "/product?category=flooring" },
                    {
                      name: "Accessories",
                      href: "/product?category=accessories",
                    },
                  ].map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="block py-2">
                        {c.name}
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
