"use client";

import React from "react";
import ImagePreview from "@/components/product/ImagePreview";

type Props = {
  images: string[];
  alt?: string;
};

export default function ProductGallery({ images, alt }: Props) {
  return <ImagePreview images={images} alt={alt} />;
}
