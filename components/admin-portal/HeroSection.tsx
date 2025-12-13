"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import {
  getHeroSection,
  saveHeroSection,
} from "@/app/(admin-portal)/dashboard/hero-section-actions";

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState("");
  const [form, setForm] = useState({
    title_en: "",
    title_km: "",
    description_en: "",
    description_km: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getHeroSection();
        if (data) {
          setForm({
            title_en: data.title.en,
            title_km: data.title.km,
            description_en: data.description.en,
            description_km: data.description.km,
          });
          setHeroImage(data.imageUrl);
        }
      } catch (error) {
        console.error("Error loading hero section:", error);
        // Allow form to display with empty fields for first-time setup
      }
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveHeroSection({
      title: { en: form.title_en, km: form.title_km },
      description: { en: form.description_en, km: form.description_km },
      imageUrl: heroImage,
    });
    toast.success("Hero section updated successfully!");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Edit Hero Section
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English)
            </label>
            <input
              type="text"
              name="title_en"
              value={form.title_en}
              onChange={(e) =>
                setForm((f) => ({ ...f, title_en: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Khmer)
            </label>
            <input
              type="text"
              name="title_km"
              value={form.title_km}
              onChange={(e) =>
                setForm((f) => ({ ...f, title_km: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <textarea
              name="description_en"
              rows={4}
              value={form.description_en}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_en: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Khmer)
            </label>
            <textarea
              name="description_km"
              rows={4}
              value={form.description_km}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_km: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
            />
          </div>
        </div>
        <ImageUpload
          label="Hero Section Image"
          currentImage={heroImage}
          onImageChange={setHeroImage}
          required
        />
        <button
          type="submit"
          className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
