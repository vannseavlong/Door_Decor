"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 bg-brand-primary text-white">
      <div className="mx-auto px-6 py-12" style={{ maxWidth: 1440 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="heading-4 mb-4 font-khmer">
              Wonder Door Industrial
            </h3>
            <p className="body-sm text-white/90 leading-relaxed font-khmer">
              Wonder Door Industrial និងផ្តល់ផលិតផលទ្វារមានគុណភាពខ្ពស់
              សម្រាប់ទីផ្សារមន្រ្តីនិង ការរស់នៅស៊ីវិល។ Leading you to the door
              of the future with modern, contemporary living and international
              quality standards.
            </p>
          </div>

          <div>
            <h4 className="heading-6 mb-4">Quick Links</h4>
            <ul className="space-y-2 body-sm">
              <li>
                <Link
                  href="/products/category/interior-doors"
                  className="text-white/90 hover:underline"
                >
                  Interior Doors
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/exterior-doors"
                  className="text-white/90 hover:underline"
                >
                  Exterior Doors
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/hardware"
                  className="text-white/90 hover:underline"
                >
                  Hardware
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="heading-6 mb-4">Contact Us</h4>
            <div className="body-sm space-y-3">
              <div className="font-khmer">
                <span className="font-medium">លេខទូរសព្ទ៖ </span>
                <a
                  href="tel:070943838"
                  className="text-white/90 hover:underline"
                >
                  070 94 38 38
                </a>{" "}
                /
                <a
                  href="tel:060943838"
                  className="text-white/90 hover:underline"
                >
                  060 94 3838
                </a>{" "}
                /
                <a
                  href="tel:017943838"
                  className="text-white/90 hover:underline"
                >
                  017 94 3838
                </a>
              </div>

              <div>
                <span className="font-medium">Facebook Page: </span>
                <a
                  href="https://www.facebook.com/share/1GAKNhff5A/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:underline"
                >
                  Facebook
                </a>
              </div>
              <div>
                <span className="font-medium">TikTok: </span>
                <a
                  href="https://www.tiktok.com/@cwww47?_r=1&_t=ZS-91ismvdbeDQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:underline"
                >
                  TikTok
                </a>
              </div>
              <div>
                <span className="font-medium">Telegram Channel: </span>
                <a
                  href="https://t.me/BNb11342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:underline"
                >
                  BNb11342
                </a>
              </div>
              <div>
                <span className="font-medium">Telegram Account: </span>
                <a
                  href="https://t.me/TC1919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:underline"
                >
                  @TC1919
                </a>
              </div>

              {/* <div className="pt-4">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="facebook"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.1 0-1.45.69-1.45 1.4V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="instagram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 6.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="youtube"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M23.5 7.2a3 3 0 0 0-2.1-2.12C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.4.48A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12C4.5 19.4 12 19.4 12 19.4s7.5 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8zM10 15.5V8.5l6 3.5-6 3.5z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="linkedin"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v1.6a4 4 0 0 1 3.2-1.6zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/85587663168"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="whatsapp"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M20 4.5A10 10 0 0 0 4.5 20L3 21l1-3A10 10 0 1 0 20 4.5zm-5.6 11.1c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.2.1-2.1-.3-1.5-.7-2.6-2.4-2.8-2.6-.2-.1-.4-.3-.4-.6-.2-.3-.7-.7-.5-1 .2-.3.6-.6.9-.9.3-.3.4-.5.6-.8.2-.3 0-.6-.1-.8-.1-.2-1.1-2.6-1.6-3.5-.4-.8-.8-.7-1.1-.7-.3 0-.6 0-.9 0s-.9.4-1.1 1.3c-.2.9-.9 3-1 3.2-.1.2-.2.4 0 .7.2.3 1 1.6 2.1 2.6 1.4 1.4 2.8 1.6 3.3 1.8.5.2 1.2.1 1.6 0 .4-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2z" />
                    </svg>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 body-sm text-white/80 flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} Wonder Door Industrial. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
