"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useTranslate } from "@/lib/utils/useTranslate";

export default function Hero() {
  const { t } = useTranslate();

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
            className="heading-1 text-brand-dark font-khmer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p
            className="body-lg text-gray-600 font-khmer"
            style={{ marginTop: "var(--space-6)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("heroDescription")}
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
              src="/hero_door.png"
              alt="hero"
              width={920}
              height={600}
              className="object-contain"
              priority
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
          src="/hero_door.png"
          alt="hero"
          width={720}
          height={480}
          className="w-full object-contain"
        />
      </motion.div>
    </section>
  );
}
