"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { Loading } from "@/components/ui/spinner";
import {
  getHeroSection,
  saveHeroSection,
} from "@/app/(admin-portal)/dashboard/hero-section-actions";

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState("");
  const [bannerEnLandscape, setBannerEnLandscape] = useState("");
  const [bannerEnPortrait, setBannerEnPortrait] = useState("");
  const [bannerKmLandscape, setBannerKmLandscape] = useState("");
  const [bannerKmPortrait, setBannerKmPortrait] = useState("");

  const [form, setForm] = useState({
    title_en: "",
    title_km: "",
    description_en: "",
    description_km: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getHeroSection();
        if (data) {
          setForm({
            title_en: data.title?.en || "",
            title_km: data.title?.km || "",
            description_en: data.description?.en || "",
            description_km: data.description?.km || "",
          });
          setHeroImage(data.imageUrl || "");
          setBannerEnLandscape(data.bannerEnLandscape || "");
          setBannerEnPortrait(data.bannerEnPortrait || "");
          setBannerKmLandscape(data.bannerKmLandscape || "");
          setBannerKmPortrait(data.bannerKmPortrait || "");
        }
      } catch (error) {
        console.error("Error loading hero section:", error);
        toast.error("Failed to load hero section data");
        // Allow form to display with empty fields for first-time setup
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading text="Loading hero section..." />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        title: { en: form.title_en, km: form.title_km },
        description: { en: form.description_en, km: form.description_km },
        imageUrl: heroImage,
        bannerEnLandscape,
        bannerEnPortrait,
        bannerKmLandscape,
        bannerKmPortrait,
      };

      console.log("📤 Saving hero section data:");
      console.log("- Title EN:", dataToSave.title.en);
      console.log("- Title KM:", dataToSave.title.km);
      console.log("- Hero Image length:", heroImage?.length || 0);
      console.log(
        "- Banner EN Landscape length:",
        bannerEnLandscape?.length || 0,
      );
      console.log(
        "- Banner EN Portrait length:",
        bannerEnPortrait?.length || 0,
      );
      console.log(
        "- Banner KM Landscape length:",
        bannerKmLandscape?.length || 0,
      );
      console.log(
        "- Banner KM Portrait length:",
        bannerKmPortrait?.length || 0,
      );

      // Save directly to Firestore (images are already base64 strings)
      await saveHeroSection(dataToSave);

      console.log("✅ Save successful!");
      toast.success("Hero section updated successfully!");
    } catch (error: any) {
      console.error("❌ Error saving hero section:", error);
      const errorMessage = error?.message || "Unknown error occurred";
      toast.error(`Failed to save: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
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
          maxWidth={1600}
          maxHeight={1600}
          quality={0.88}
          required
        />

        {/* Banner Images Section */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Full Banner Images (for SecondHero component)
          </h3>
          {/* <p className="text-sm text-gray-600 mb-4">
            📌 For best quality: Upload at 1800px width, quality 85%. Images are
            automatically compressed to fit in database.
          </p> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="Banner English (Landscape)"
              currentImage={bannerEnLandscape}
              onImageChange={setBannerEnLandscape}
              maxWidth={1800}
              maxHeight={1800}
              quality={0.85}
            />
            <ImageUpload
              label="Banner English (Portrait)"
              currentImage={bannerEnPortrait}
              onImageChange={setBannerEnPortrait}
              maxWidth={1800}
              maxHeight={1800}
              quality={0.85}
            />
            <ImageUpload
              label="Banner Khmer (Landscape)"
              currentImage={bannerKmLandscape}
              onImageChange={setBannerKmLandscape}
              maxWidth={1800}
              maxHeight={1800}
              quality={0.85}
            />
            <ImageUpload
              label="Banner Khmer (Portrait)"
              currentImage={bannerKmPortrait}
              onImageChange={setBannerKmPortrait}
              maxWidth={1800}
              maxHeight={1800}
              quality={0.85}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
