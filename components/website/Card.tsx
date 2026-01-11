"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type CardProps = {
  src: string;
  title?: string;
  alt?: string;
  /** either provide `id` to link to `/product/[id]` or a full `href` */
  id?: string;
  href?: string;
};

export default function Card({
  src,
  title = "WPC Door",
  alt = "product",
  id,
  href,
}: CardProps) {
  const link = href ? href : id ? `/product/${id}` : undefined;

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
