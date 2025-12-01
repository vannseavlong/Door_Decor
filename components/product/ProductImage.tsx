"use client";

import React from "react";
import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function ProductImage({
  src,
  alt = "product",
  className = "",
}: Props) {
  const imageSrc = src ?? "/imageStock/img1.jpg";

  return (
    <div
      className={`relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden border ${className}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image
        </div>
      )}
    </div>
  );
}
