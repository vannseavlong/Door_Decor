"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState(
    "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // TODO: Save to Firestore
    console.log({
      title: formData.get("title"),
      description: formData.get("description"),
      imageUrl: heroImage,
    });

    toast.success("Hero section updated successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Edit Hero Section
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue="Welcome to Our Company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue="Wonder Door Industrial takes you to the doors of the future for modern and contemporary living, combined with international standard quality."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <ImageUpload
          label="Hero Section Image"
          currentImage={heroImage}
          onImageChange={setHeroImage}
          required
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
