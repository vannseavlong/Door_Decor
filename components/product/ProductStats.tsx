"use client";

import React, { useEffect, useState, useRef } from "react";
import { Eye } from "lucide-react";

type Props = { productId: string };

type Stats = { views: number; clicks: number };

const STORAGE_KEY = (id: string) => `product-stats-${id}`;

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ProductStats({ productId }: Props) {
  const [stats, setStats] = useState<Stats>({ views: 0, clicks: 0 });
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    if (!productId || hasIncrementedRef.current) return;
    const key = STORAGE_KEY(productId);
    const raw = localStorage.getItem(key);
    let s: Stats;
    if (raw) {
      try {
        s = JSON.parse(raw) as Stats;
      } catch {
        s = { views: 0, clicks: 0 };
      }
    } else {
      s = {
        views: randBetween(120, 2400),
        clicks: randBetween(1, 120),
      };
    }

    // increment view on mount (only once)
    s = { ...s, views: s.views + 1 };
    localStorage.setItem(key, JSON.stringify(s));
    setStats(s);
    hasIncrementedRef.current = true;
  }, [productId]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      const key = STORAGE_KEY(productId);
      if (e.key === key && e.newValue) {
        try {
          setStats(JSON.parse(e.newValue));
        } catch {}
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [productId]);

  return (
    <div className="flex items-center gap-3 text-base text-gray-600 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-gray-500" />
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-800">
            {stats.views.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">Views</span>
        </div>
      </div>
    </div>
  );
}
