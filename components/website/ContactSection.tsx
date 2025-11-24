"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website contact from ${name || "Visitor"}`
    );
    const body = encodeURIComponent(`${message}

From: ${name}
Email: ${email}`);
    // Opens user's mail client with prefilled subject/body
    window.location.href = `mailto:info@yourcompany.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="w-full py-16">
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="mt-2 text-gray-600">
              Get in touch for orders, enquiries or support.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded shadow-sm hover:shadow"
                href="tel:+85587663168"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.11 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.05.36 2.08.72 3.06a2 2 0 0 1-.45 2.11L9.91 10.91a16 16 0 0 0 6 6l1 1a2 2 0 0 1 2.11-.45c.98.36 2.01.6 3.06.72A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">+855 87 663 168</span>
              </a>

              <a
                className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded shadow-sm hover:shadow"
                href="mailto:info@yourcompany.com"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 4h16v16H4z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6l-10 7L2 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">info@yourcompany.com</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="facebook"
                className="p-2 rounded bg-white shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.1 0-1.45.69-1.45 1.4V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="instagram"
                className="p-2 rounded bg-white shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
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
                href="#"
                aria-label="linkedin"
                className="p-2 rounded bg-white shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v1.6a4 4 0 0 1 3.2-1.6zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                </svg>
              </a>
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
                  <button className="px-4 py-2 bg-[#f7942d] text-white shadow-sm rounded-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f7942d]">
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
