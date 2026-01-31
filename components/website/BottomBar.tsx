"use client";

import Link from "next/link";
import { FaHome, FaInfoCircle, FaPhone, FaDoorOpen } from "react-icons/fa";
import { useTranslate } from "@/lib/utils/useTranslate";
import { localizePath } from "@/lib/utils/localizePath";

const BottomBar = () => {
  const { t, lang } = useTranslate();

  const menu = [
    {
      label: t("navHome"),
      href: localizePath("/", lang),
      icon: <FaHome size={24} />,
    },
    {
      label: t("navProduct"),
      href: localizePath("/product", lang),
      icon: <FaDoorOpen size={24} />,
    },
    {
      label: t("navAboutUs"),
      href: localizePath("/about", lang),
      icon: <FaInfoCircle size={24} />,
    },
    {
      label: t("contactUs"),
      href: localizePath("/contact", lang),
      icon: <FaPhone size={24} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#f7941d] text-white flex justify-around items-center h-16 shadow-md md:hidden">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center justify-center gap-1 hover:text-blue-300 transition-colors"
        >
          {item.icon}
          <span className="text-xs font-semibold font-khmer">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomBar;
