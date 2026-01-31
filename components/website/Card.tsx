"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslate } from "@/lib/utils/useTranslate";
import { localizePath } from "@/lib/utils/localizePath";
import { Eye } from "lucide-react";

type CardProps = {
  src: string;
  title?: string;
  alt?: string;
  /** either provide `id` to link to `/product/[id]` or a full `href` */
  id?: string;
  href?: string;
};

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Card({
  src,
  title = "WPC Door",
  alt = "product",
  id,
  href,
}: CardProps) {
  const { lang } = useTranslate();
  const link = href
    ? localizePath(href, lang)
    : id
    ? localizePath(`/product/${id}`, lang)
    : undefined;
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    const key = `product-stats-${id}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const stats = JSON.parse(raw);
        setViewCount(stats.views || 0);
      } catch {
        setViewCount(randBetween(120, 2400));
      }
    } else {
      setViewCount(randBetween(120, 2400));
    }
  }, [id]);

  const content = (
    <motion.article
      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full aspect-square bg-gray-100 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 25vw"
          className="object-cover"
          quality={100}
        />
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
        >
          <span className="bg-[#f7941d] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Pre Order
          </span>
        </motion.div>
      </motion.div>

      <div className="p-4">
        <h3 className="body-base font-medium text-brand-dark font-khmer">
          {title}
        </h3>
        {viewCount > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
            <Eye className="w-4 h-4" />
            <span>{viewCount.toLocaleString()} Views</span>
          </div>
        )}
      </div>
    </motion.article>
  );

  if (link) {
    return (
      <Link href={link} aria-label={`Open ${title}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
