"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden border cursor-pointer group ${className}`}
        onClick={() => setOpen(true)}
      >
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                View Image
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imageSrc }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </>
  );
}
