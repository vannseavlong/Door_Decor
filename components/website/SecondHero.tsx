"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useTranslate } from "@/lib/utils/useTranslate";

type SecondHeroProps = {
  bannerEnLandscape?: string;
  bannerEnPortrait?: string;
  bannerKmLandscape?: string;
  bannerKmPortrait?: string;
};

export default function SecondHero({
  bannerEnLandscape,
  bannerEnPortrait,
  bannerKmLandscape,
  bannerKmPortrait,
}: SecondHeroProps) {
  const { lang } = useTranslate();

  // Handle undefined lang by defaulting to "en"
  const currentLocale = lang || "en";

  // Select the appropriate images based on language
  const landscapeImage =
    currentLocale === "kh" ? bannerKmLandscape : bannerEnLandscape;
  const portraitImage =
    currentLocale === "kh" ? bannerKmPortrait : bannerEnPortrait;

  // Fallback images if none provided
  const displayLandscapeImage = landscapeImage || "/hero_door.png";
  const displayPortraitImage = portraitImage || "/hero_door.png";

  return (
    <section className="w-full">
      {/* Desktop/Tablet - Landscape Banner */}
      <motion.div
        className="hidden md:block w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={displayLandscapeImage}
          alt="Hero Banner"
          width={2560}
          height={1236}
          className="w-full h-auto"
          priority
          sizes="100vw"
          quality={100}
        />
      </motion.div>

      {/* Mobile - Portrait Banner */}
      <motion.div
        className="block md:hidden w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={displayPortraitImage}
          alt="Hero Banner"
          width={1080}
          height={1920}
          className="w-full h-auto"
          priority
          sizes="100vw"
          quality={100}
        />
      </motion.div>
    </section>
  );
}
