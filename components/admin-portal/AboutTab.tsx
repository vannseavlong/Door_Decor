"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { Loading } from "@/components/ui/spinner";
import {
  getAboutData,
  saveAboutData,
} from "@/app/(admin-portal)/dashboard/about-actions";

export default function AboutTab() {
  const [heroImage, setHeroImage] = useState("");
  const [additionalImage, setAdditionalImage] = useState("");
  const [form, setForm] = useState({
    description_en: "",
    description_km: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAboutData();
        if (data) {
          setForm({
            description_en: data.description.en,
            description_km: data.description.km,
          });
          setHeroImage(data.heroImage);
          setAdditionalImage(data.additionalImage);
        }
      } catch (error) {
        console.error("Error loading about data:", error);
      }
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveAboutData({
        description: { en: form.description_en, km: form.description_km },
        heroImage,
        additionalImage,
      });
      toast.success("About page updated successfully!");
    } catch (error) {
      toast.error("Failed to update about page");
      console.error(error);
    }
  };

  if (loading) return <Loading text="Loading about data..." />;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Edit About Us Page
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <ImageUpload
            label="Hero Banner Image (Team/Group Photo)"
            currentImage={heroImage}
            onImageChange={setHeroImage}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <textarea
              name="description_en"
              rows={6}
              value={form.description_en}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_en: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Door Decor crafts high-quality doors..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Khmer)
            </label>
            <textarea
              name="description_km"
              rows={6}
              value={form.description_km}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_km: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
              placeholder="ពិពណ៌នាជាភាសាខ្មែរ..."
            />
          </div>
        </div>

        <div>
          <ImageUpload
            label="Additional Content Image (Door Detail)"
            currentImage={additionalImage}
            onImageChange={setAdditionalImage}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
