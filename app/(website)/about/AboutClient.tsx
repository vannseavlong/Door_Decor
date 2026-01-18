"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslate } from "@/lib/utils/useTranslate";
import { useState, useEffect } from "react";

type AboutData = {
  heroImage?: string;
  description?: {
    en: string;
    km: string;
  };
  additionalImage?: string;
};

export default function AboutClient({
  aboutData,
}: {
  aboutData: AboutData | null;
}) {
  const { lang } = useTranslate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLocale = mounted ? lang || "en" : "en";

  const heroImage = aboutData?.heroImage || "/about.jpg";
  const description = aboutData?.description
    ? currentLocale === "kh"
      ? aboutData.description.km
      : aboutData.description.en
    : "Door Decor crafts high-quality doors that welcome and protect. Our skilled team combines traditional woodworking techniques with modern production to deliver durable, beautiful doors for homes and businesses.";

  const additionalImage =
    aboutData?.additionalImage || "/product/villa1/3B-01.webp";

  return (
    <>
      {/* Full-height hero banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden shadow-lg pt-16 md:pt-20"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          height: "100vh",
          minHeight: "600px",
        }}
      >
        <Image
          src={heroImage}
          alt="Our team banner"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.section>

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
                About Door Decor
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
            Our Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                Quality
              </h4>
              <p
                className={`body-sm text-gray-600 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                Handcrafted with attention to detail
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
                Timeliness
              </h4>
              <p
                className={`body-sm text-gray-600 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                On-schedule delivery every time
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
                Service
              </h4>
              <p
                className={`body-sm text-gray-600 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                Personalized support from start to finish
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
                Trust
              </h4>
              <p
                className={`body-sm text-gray-600 ${
                  currentLocale === "kh" ? "font-khmer" : ""
                }`}
              >
                Reliable and transparent in everything we do
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
