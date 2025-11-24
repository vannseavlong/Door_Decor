"use client";

import Image from "next/image";
import React from "react";
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
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full aspect-square bg-gray-100 relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </article>
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
