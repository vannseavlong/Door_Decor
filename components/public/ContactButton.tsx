"use client";

import React from "react";

export default function ContactButton({
  href = "/contact",
}: {
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-block bg-white text-black border border-gray-200 px-4 py-2 rounded-md shadow-sm hover:shadow-md"
    >
      Contact Us
    </a>
  );
}
