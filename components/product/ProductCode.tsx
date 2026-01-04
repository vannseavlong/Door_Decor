"use client";

import React from "react";
import { useTranslate } from "@/lib/utils/useTranslate";

interface ProductCodeRow {
  label: string;
  value: string;
}

interface ProductCodeProps {
  code: string;
  rows: ProductCodeRow[];
}

const ProductCode: React.FC<ProductCodeProps> = ({ code, rows }) => {
  const { lang } = useTranslate();
  const currentLocale = lang || "en";
  const isKhmer = currentLocale === "kh";

  return (
    <div className="w-full">
      <h2 className="text-4xl font-extrabold text-[#f7941d] mb-6">{code}</h2>
      <div className="border-t border-gray-200">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
          >
            <div
              className={`w-1/3 font-semibold text-gray-800 text-lg ${
                isKhmer ? "font-khmer" : ""
              }`}
            >
              {row.label}
            </div>
            <div
              className={`w-2/3 text-gray-700 text-lg ${
                isKhmer ? "font-khmer" : ""
              }`}
            >
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCode;
