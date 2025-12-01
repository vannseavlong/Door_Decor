"use client";

import Image from "next/image";
import React from "react";
import { useTranslate } from "@/lib/utils/useTranslate";

export default function Hero() {
  const { t } = useTranslate();

  return (
    <section className="w-full py-12 md:py-20">
      <div
        className="mx-auto flex w-full items-center gap-8 md:gap-12 px-4"
        style={{ maxWidth: 1440 }}
      >
        <div className="flex-1 max-w-xl">
          <h1 className="heading-1 text-brand-dark font-khmer">
            {t("heroTitle")}
          </h1>

          <p
            className="body-lg text-gray-600 font-khmer"
            style={{ marginTop: "var(--space-6)" }}
          >
            {t("heroDescription")}
          </p>
        </div>

        <div className="flex-1 hidden items-center justify-end md:flex">
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
        </div>
      </div>

      {/* mobile image (stacked) */}
      <div className="mx-auto mt-8 md:hidden px-4" style={{ maxWidth: 720 }}>
        <Image
          src="/hero_door.png"
          alt="hero"
          width={720}
          height={480}
          className="w-full object-contain"
        />
      </div>
    </section>
  );
}
