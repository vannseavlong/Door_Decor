"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // handle form submission logic here
  }

  return (
    <section className="py-16 px-4 md:px-0">
      <div className=" grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="heading-3 mb-4">Contact Us</h2>
          <p className="body-base mb-6">
            Reach out to us for any inquiries or support.
          </p>
          <div className="mt-6 flex flex-col gap-4">
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
              <a
                href="https://www.facebook.com/share/1GAKNhff5A/?mibextid=wwXIfr"
                aria-label="facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white shadow-sm"
              >
                <Image
                  src="/icons/fb.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.tiktok.com/@cwww47?_r=1&_t=ZS-91ismvdbeDQ"
                aria-label="tiktok"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white shadow-sm"
              >
                <Image
                  src="/icons/tk.svg"
                  alt="TikTok"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://t.me/BNb11342"
                aria-label="telegram-channel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white shadow-sm"
              >
                <Image
                  src="/icons/telegram.svg"
                  alt="Telegram Channel"
                  width={24}
                  height={24}
                />
              </a>
              {/* <a
                href="https://t.me/TC1919"
                aria-label="telegram-account"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white shadow-sm"
              >
                <Image
                  src="/icons/telegram.svg"
                  alt="Telegram Account"
                  width={24}
                  height={24}
                />
              </a> */}
            </div>
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm"
          >
            <div className="grid gap-3">
              <input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="flex items-center justify-end">
                <button className="px-4 py-2 bg-brand-primary text-white shadow-sm rounded-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary transition-all body-base font-medium">
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
