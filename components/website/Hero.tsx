"use client";

import Image from "next/image";
import React from "react";
import { useTranslate } from "@/lib/utils/useTranslate";

export default function Hero() {
  const { t } = useTranslate();

  return (
    <section className="w-full py-20">
      <div
        className="mx-auto flex w-full items-center gap-12"
        style={{ maxWidth: 1440 }}
      >
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            {t("heroTitle")}
          </h1>

          <p className="mt-6 text-lg text-gray-600">{t("heroDescription")}</p>
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
      <div className="mx-auto mt-8 md:hidden" style={{ maxWidth: 720 }}>
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
