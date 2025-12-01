"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt?: string;
};

export default function ImagePreview({ images, alt }: Props) {
  const imgs = images && images.length ? images : [];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden border">
        {imgs.length ? (
          <Image
            src={imgs[index]}
            alt={alt ?? "product"}
            fill
            priority={true}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {imgs.length > 1 && (
        <div
          className="mt-3 flex gap-2"
          role="list"
          aria-label="Product thumbnails"
        >
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setIndex((v) => Math.max(0, v - 1));
                if (e.key === "ArrowRight")
                  setIndex((v) => Math.min(imgs.length - 1, v + 1));
                if (e.key === "Home") setIndex(0);
                if (e.key === "End") setIndex(imgs.length - 1);
              }}
              className={`w-16 h-16 rounded-md overflow-hidden border focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all ${
                i === index ? "ring-2 ring-brand-primary" : ""
              }`}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            >
              <Image
                src={src}
                alt={alt ? `${alt} ${i + 1}` : `thumb ${i + 1}`}
                width={64}
                height={64}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
