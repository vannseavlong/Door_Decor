"use client";

import Image from "next/image";
import { useTranslate } from "@/lib/utils/useTranslate";
import SecondHero from "@/components/website/SecondHero";
import type { CoreValue } from "@/lib/firebase/about";

type AboutData = {
  heroImage?: string;
  aboutLandscape?: string;
  aboutPortrait?: string;
  description?: {
    en: string;
    km: string;
  };
  additionalImage?: string;
  coreValues?: CoreValue[];
};

// Default core values (fallback if none in database)
const DEFAULT_CORE_VALUES: CoreValue[] = [
  {
    id: "quality",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: { en: "Quality", km: "គុណភាព" },
    description: {
      en: "Handcrafted with attention to detail",
      km: "ផលិតដោយដៃជាមួយការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត",
    },
  },
  {
    id: "timeliness",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: { en: "Timeliness", km: "ទាន់ពេលវេលា" },
    description: {
      en: "On-schedule delivery every time",
      km: "ដឹកជញ្ជូនទាន់ពេលវេលារាល់ពេល",
    },
  },
  {
    id: "service",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: { en: "Service", km: "សេវាកម្ម" },
    description: {
      en: "Personalized support from start to finish",
      km: "ការគាំទ្រផ្ទាល់ខ្លួនពីដើមដល់ចប់",
    },
  },
  {
    id: "trust",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: { en: "Trust", km: "ទំនុកចិត្ត" },
    description: {
      en: "Reliable and transparent in everything we do",
      km: "គួរឱ្យទុកចិត្តនិងតម្លាភាពក្នុងអ្វីគ្រប់យ៉ាងដែលយើងធ្វើ",
    },
  },
];

export default function AboutClient({
  aboutData,
}: {
  aboutData: AboutData | null;
}) {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "kh";

  const description = aboutData?.description
    ? currentLocale === "kh"
      ? aboutData.description.km
      : aboutData.description.en
    : "Door Decor crafts high-quality doors that welcome and protect. Our skilled team combines traditional woodworking techniques with modern production to deliver durable, beautiful doors for homes and businesses.";

  const additionalImage =
    aboutData?.additionalImage || "/product/villa1/3B-01.webp";

  const coreValues = aboutData?.coreValues?.length
    ? aboutData.coreValues
    : DEFAULT_CORE_VALUES;

  return (
    <>
      {/* Hero Banner using SecondHero */}
      <div className="pt-0">
        <SecondHero
          bannerEnLandscape={aboutData?.aboutLandscape}
          bannerEnPortrait={aboutData?.aboutPortrait}
          bannerKmLandscape={aboutData?.aboutLandscape}
          bannerKmPortrait={aboutData?.aboutPortrait}
        />
      </div>

      {/* About section */}
      <section className="w-full py-12 md:py-16">
        <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className={`heading-3 text-brand-dark mb-4 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                {t("aboutUs")}
              </h2>
              <p
                className={`body-base text-gray-600 mb-4 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                {description}
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                src={additionalImage}
                alt="Door detail"
                width={520}
                height={360}
                className="rounded-lg w-full max-w-md object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 md:py-16">
        <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
          <h3
            className={`heading-3 text-center mb-8 text-brand-dark ${
              currentLocale === "kh" ? "font-khmer" : ""
            }`}
          >
            {t("ourValues")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={value.icon}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-primary"
                    />
                  </svg>
                </div>
                <h4
                  className={`heading-6 mb-2 text-brand-dark ${
                    currentLocale === "kh" ? "font-khmer" : ""
                  }`}
                >
                  {currentLocale === "kh" ? value.title.km : value.title.en}
                </h4>
                <p
                  className={`body-sm text-gray-600 ${
                    currentLocale === "kh" ? "font-khmer" : ""
                  }`}
                >
                  {currentLocale === "kh"
                    ? value.description.km
                    : value.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
