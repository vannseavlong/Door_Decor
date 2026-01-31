"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useTranslate } from "@/lib/utils/useTranslate";

type ContactData = {
  phone?: string;
  socialMedia?: {
    facebook?: string;
    tiktok?: string;
    telegram?: string;
    telegramChannel?: string;
  };
};

const DEFAULT_CONTACTS = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1GAKNhff5A/?mibextid=wwXIfr",
    bg: "#4267B2",
  },
  {
    label: "TikTok",
    icon: SiTiktok,
    href: "https://www.tiktok.com/@cwww47?_r=1&_t=ZS-91ismvdbeDQ",
    bg: "#010101",
  },
  {
    label: "Telegram",
    icon: FaTelegramPlane,
    href: "https://t.me/BNb11342",
    bg: "#229ED9",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function NewContactUs({
  contactData,
}: {
  contactData?: ContactData;
}) {
  const { t } = useTranslate();

  // Build contacts array from Firebase data or use defaults
  const contacts = contactData?.socialMedia
    ? [
        ...(contactData.socialMedia.facebook
          ? [
              {
                label: "Facebook",
                icon: FaFacebookF,
                href: contactData.socialMedia.facebook,
                bg: "#4267B2",
              },
            ]
          : []),
        ...(contactData.socialMedia.tiktok
          ? [
              {
                label: "TikTok",
                icon: SiTiktok,
                href: contactData.socialMedia.tiktok,
                bg: "#010101",
              },
            ]
          : []),
        ...(contactData.socialMedia.telegram
          ? [
              {
                label: "Telegram",
                icon: FaTelegramPlane,
                href: contactData.socialMedia.telegram,
                bg: "#229ED9",
              },
            ]
          : []),
      ]
    : DEFAULT_CONTACTS;

  const phoneNumber =
    contactData?.phone || "070 94 38 38 / 060 94 3838 / 017 94 3838";

  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center justify-center">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <motion.h2
          className="heading-3 text-brand-dark font-khmer mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t("getInTouch")}
        </motion.h2>
        <motion.div
          className="flex flex-row gap-6 md:gap-32 lg:gap-64 justify-center items-center mb-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 w-24 sm:w-32"
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: c.bg,
                    width: "3.5rem",
                    height: "3.5rem",
                    minWidth: "2.5rem",
                    minHeight: "2.5rem",
                    maxWidth: "4.5rem",
                    maxHeight: "4.5rem",
                  }}
                >
                  <Icon
                    size={32}
                    className="text-white w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <span className="body-base text-brand-secondary text-center font-khmer">
                  {c.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
        <motion.div
          className="flex flex-col items-center gap-2 text-brand-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-brand-primary shrink-0" />
            <span className="body-lg font-medium font-khmer max-[439px]:text-sm max-[439px]:leading-tight">
              {phoneNumber}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
