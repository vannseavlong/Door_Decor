"use client";

import React from "react";
import Link from "next/link";
import { useTranslate } from "@/lib/utils/useTranslate";

type FooterData = {
  companyDescription?: { en: string; km: string };
  email?: string;
  phone?: string;
  address?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    line?: string;
    tiktok?: string;
    telegram?: string;
    telegramChannel?: string;
  };
};

type Category = {
  id?: string;
  name: string | { en: string; km: string };
};

type FooterProps = {
  footerData?: FooterData;
  categories?: Category[];
};

export default function Footer({ footerData, categories = [] }: FooterProps) {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "en";

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

  // Get company description based on locale
  const companyDescription = footerData?.companyDescription
    ? currentLocale === "kh"
      ? footerData.companyDescription.km
      : footerData.companyDescription.en
    : "Wonder Door Industrial និងផ្តល់ផលិតផលទ្វារមានគុណភាពខ្ពស់ សម្រាប់ទីផ្សារមន្រ្តីនិង ការរស់នៅស៊ីវិល។ Leading you to the door of the future with modern, contemporary living and international quality standards.";

  return (
    <footer className="mt-12 bg-brand-primary text-white">
      <div className="mx-auto px-6 py-12" style={{ maxWidth: 1440 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="heading-4 mb-4 font-khmer">
              Wonder Door Industrial
            </h3>
            <p
              className={`body-sm text-white/90 leading-relaxed ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
            >
              {companyDescription}
            </p>
          </div>

          <div>
            <h4
              className={`heading-6 mb-4 ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
            >
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 body-sm">
              {categories.slice(0, 3).map((cat) => {
                const categoryName = getCategoryName(cat.name);
                const categorySlug = slugify(categoryName);
                return (
                  <li key={cat.id}>
                    <Link
                      href={`/products/category/${categorySlug}`}
                      className={`text-white/90 hover:underline ${
                        currentLocale === "kh" ? "font-khmer" : ""
                      }`}
                    >
                      {categoryName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4
              className={`heading-6 mb-4 ${
                currentLocale === "kh" ? "font-khmer" : ""
              }`}
            >
              {t("contactUs")}
            </h4>
            <div className="body-sm space-y-3">
              {footerData?.phone && (
                <div className="font-khmer">
                  <span className="font-medium">
                    {currentLocale === "kh" ? "លេខទូរសព្ទ៖ " : "Phone: "}
                  </span>
                  {footerData.phone.split("/").map((num, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && " / "}
                      <a
                        href={`tel:${num.trim().replace(/\s/g, "")}`}
                        className="text-white/90 hover:underline"
                      >
                        {num.trim()}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {footerData?.socialMedia?.facebook && (
                <div>
                  <span className="font-medium">Facebook: </span>
                  <a
                    href={footerData.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:underline"
                  >
                    Facebook
                  </a>
                </div>
              )}

              {footerData?.socialMedia?.tiktok && (
                <div>
                  <span className="font-medium">TikTok: </span>
                  <a
                    href={footerData.socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:underline"
                  >
                    TikTok
                  </a>
                </div>
              )}

              {footerData?.socialMedia?.telegramChannel && (
                <div>
                  <span className="font-medium">Telegram Channel: </span>
                  <a
                    href={footerData.socialMedia.telegramChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:underline"
                  >
                    Telegram
                  </a>
                </div>
              )}

              {footerData?.socialMedia?.telegram && (
                <div>
                  <span className="font-medium">Telegram Account: </span>
                  <a
                    href={footerData.socialMedia.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:underline"
                  >
                    Telegram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 body-sm text-white/80 flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} Wonder Door Industrial. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
