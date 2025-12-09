"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // handle form submission logic here
  }

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/1GAKNhff5A/?mibextid=wwXIfr",
      label: "facebook",
      icon: "/icons/fb.svg",
      alt: "Facebook",
    },
    {
      href: "https://www.tiktok.com/@cwww47?_r=1&_t=ZS-91ismvdbeDQ",
      label: "tiktok",
      icon: "/icons/tk.svg",
      alt: "TikTok",
    },
    {
      href: "https://t.me/BNb11342",
      label: "telegram-channel",
      icon: "/icons/telegram.svg",
      alt: "Telegram Channel",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-0">
      <div className=" grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-3 mb-4">Contact Us</h2>
          <p className="body-base mb-6">
            Reach out to us for any inquiries or support.
          </p>
          <motion.div
            className="mt-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              <div className="body-sm font-khmer">
                <span className="font-medium">Phone Number: </span>
                <a
                  href="tel:070943838"
                  className="text-brand-dark hover-brand-primary"
                >
                  070 94 38 38
                </a>{" "}
                /
                <a
                  href="tel:060943838"
                  className="text-brand-dark hover-brand-primary"
                >
                  060 94 3838
                </a>{" "}
                /
                <a
                  href="tel:017943838"
                  className="text-brand-dark hover-brand-primary"
                >
                  017 94 3838
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-white shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={24}
                    height={24}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm"
          >
            <div className="grid gap-3">
              <motion.input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border rounded"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div
                className="flex items-center justify-end"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.button
                  className="px-4 py-2 bg-brand-primary text-white shadow-sm rounded-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary transition-all body-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send message
                </motion.button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
