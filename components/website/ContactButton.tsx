"use client";

import React from "react";
import { useTranslate } from "@/lib/utils/useTranslate";

interface ContactButtonProps {
  href?: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  text?: string;
  hoverText?: string;
}

export default function ContactButton({
  href = "/contact",
  className = "",
  onClick,
  text,
  hoverText,
}: ContactButtonProps) {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "en";

  const displayText = text || t("contactUs");
  const displayHoverText = hoverText || t("getInTouch");

  const inner = (
    <span className="relative inline-flex items-center justify-center overflow-hidden">
      <span
        className={`inline-block transition-transform duration-300 translate-y-0 group-hover:-translate-y-[110%] ${
          currentLocale === "kh" ? "font-khmer" : ""
        }`}
      >
        {displayText}
      </span>
      <span
        className={`absolute left-0 top-[110%] inline-block transition-transform duration-300 group-hover:translate-y-[-110%] ${
          currentLocale === "kh" ? "font-khmer" : ""
        }`}
      >
        {displayHoverText}
      </span>
    </span>
  );

  const handleClick = (e?: React.MouseEvent) => {
    try {
      onClick?.(e);
    } catch {
      // ignore
    }

    if (e) e.preventDefault();

    // Safe navigation fallback
    try {
      if (typeof window !== "undefined") {
        window.location.href = href || "/contact";
      }
    } catch {
      // ignore
    }
  };

  return (
    <a
      href={href}
      onClick={onClick ? onClick : handleClick}
      className={`group inline-flex items-center justify-center leading-7 px-4 py-2 bg-brand-primary text-white border border-transparent hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary transition-all body-base font-medium font-khmer ${className}`}
    >
      {inner}
    </a>
  );
}
