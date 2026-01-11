"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useTranslate } from "@/lib/utils/useTranslate";

type HeroProps = {
  title?: { en: string; km: string };
  description?: { en: string; km: string };
  imageUrl?: string;
};

export default function Hero({ title, description, imageUrl }: HeroProps) {
  const { t, lang } = useTranslate();

  // Use Firebase data if available, otherwise fall back to translations
  // Handle undefined lang by defaulting to "en"
  const currentLocale = lang || "en";

  const displayTitle = title
    ? currentLocale === "kh"
      ? title.km
      : title.en
    : t("heroTitle");

  const displayDescription = description
    ? currentLocale === "kh"
      ? description.km
      : description.en
    : t("heroDescription");

  const displayImage = imageUrl || "/hero_door.png";

  return (
    <section className="w-full py-12 md:py-20">
      <div
        className="mx-auto flex w-full items-center gap-8 md:gap-12 px-4"
        style={{ maxWidth: 1440 }}
      >
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className={`heading-1 text-brand-dark ${
              currentLocale === "kh" ? "font-khmer" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            className={`body-lg text-gray-600 ${
              currentLocale === "kh" ? "font-khmer" : ""
            }`}
            style={{ marginTop: "var(--space-6)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {displayDescription}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex-1 hidden items-center justify-end md:flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-[460px] h-auto">
            <Image
              src={displayImage}
              alt="hero"
              width={920}
              height={600}
              className="object-contain"
              priority
              quality={100}
            />
          </div>
        </motion.div>
      </div>

      {/* mobile image (stacked) */}
      <motion.div
        className="mx-auto mt-8 md:hidden px-4"
        style={{ maxWidth: 720 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src={displayImage}
          alt="hero"
          width={720}
          height={480}
          className="w-full object-contain"
          quality={100}
        />
      </motion.div>
    </section>
  );
}
