"use client";

import React from "react";

export default function LocationSection() {
  // Google Maps embed for Wonder Door Industrial, Phnom Penh.
  // If you prefer a different place or API key usage, we can switch to
  // the Maps JS API later.
  // Full Google Maps embed URL (copied from Google Maps "Share → Embed a map").
  // This URL pins the place and is embeddable in an iframe without an API key.
  const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4441395021795!2d104.8736046!3d11.591650999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095220b7c25069%3A0xaf27fb690e4a86f4!2sGlolink%20International%20School!5e0!3m2!1sen!2skh!4v1763398544513!5m2!1sen!2skh";

  return (
    <section className="w-full py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Our Location
        </h2>

        <div className="rounded-lg overflow-hidden shadow-sm">
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "40%",
            }}
          >
            <iframe
              src={src}
              title="Wonder Door Industrial - Map"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
