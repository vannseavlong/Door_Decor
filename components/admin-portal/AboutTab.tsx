"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { Loading } from "@/components/ui/spinner";
import {
  getAboutData,
  saveAboutData,
} from "@/app/(admin-portal)/dashboard/about-actions";
import type { CoreValue } from "@/lib/firebase/about";
import { Trash2, Plus, GripVertical } from "lucide-react";

// Predefined icon options for core values
const ICON_OPTIONS = [
  {
    name: "Checkmark Circle",
    path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  { name: "Clock", path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  {
    name: "Heart",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    name: "Shield",
    path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "Star",
    path: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    name: "Lightning",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    name: "Users",
    path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    name: "Globe",
    path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
];

const DEFAULT_CORE_VALUES: CoreValue[] = [
  {
    id: "quality",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: { en: "Quality", km: "គុណភាព" },
    description: {
      en: "Handcrafted with attention to detail",
      km: "ផលិតដោយដៃជាមួយការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត",
    },
  },
  {
    id: "timeliness",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: { en: "Timeliness", km: "ទាន់ពេលវេលា" },
    description: {
      en: "On-schedule delivery every time",
      km: "ដឹកជញ្ជូនទាន់ពេលវេលារាល់ពេល",
    },
  },
  {
    id: "service",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: { en: "Service", km: "សេវាកម្ម" },
    description: {
      en: "Personalized support from start to finish",
      km: "ការគាំទ្រផ្ទាល់ខ្លួនពីដើមដល់ចប់",
    },
  },
  {
    id: "trust",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: { en: "Trust", km: "ទំនុកចិត្ត" },
    description: {
      en: "Reliable and transparent in everything we do",
      km: "គួរឱ្យទុកចិត្តនិងតម្លាភាពក្នុងអ្វីគ្រប់យ៉ាងដែលយើងធ្វើ",
    },
  },
];

export default function AboutTab() {
  const [aboutLandscape, setAboutLandscape] = useState("");
  const [aboutPortrait, setAboutPortrait] = useState("");
  const [additionalImage, setAdditionalImage] = useState("");
  const [coreValues, setCoreValues] = useState<CoreValue[]>(DEFAULT_CORE_VALUES);
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
            description_en: data.description?.en || "",
            description_km: data.description?.km || "",
          });
          setAboutLandscape(data.aboutLandscape || "");
          setAboutPortrait(data.aboutPortrait || "");
          setAdditionalImage(data.additionalImage || "");
          if (data.coreValues && data.coreValues.length > 0) {
            setCoreValues(data.coreValues);
          }
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
        aboutLandscape,
        aboutPortrait,
        additionalImage,
        coreValues,
      });
      toast.success("About page updated successfully!");
    } catch (error) {
      toast.error("Failed to update about page");
      console.error(error);
    }
  };

  const addCoreValue = () => {
    const newValue: CoreValue = {
      id: `value-${Date.now()}`,
      icon: ICON_OPTIONS[0].path,
      title: { en: "", km: "" },
      description: { en: "", km: "" },
    };
    setCoreValues([...coreValues, newValue]);
  };

  const removeCoreValue = (id: string) => {
    setCoreValues(coreValues.filter((v) => v.id !== id));
  };

  const updateCoreValue = (
    id: string,
    field: keyof CoreValue,
    value: string | { en: string; km: string }
  ) => {
    setCoreValues(
      coreValues.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  if (loading) return <Loading text="Loading about data..." />;

  return (
    <div className="space-y-8">
      {/* Main About Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Edit About Us Page
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Banner Images */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hero Banner Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                label="About Landscape Banner (Desktop - 2560x1236)"
                currentImage={aboutLandscape}
                onImageChange={setAboutLandscape}
              />
              <ImageUpload
                label="About Portrait Banner (Mobile - 1080x1920)"
                currentImage={aboutPortrait}
                onImageChange={setAboutPortrait}
              />
            </div>
          </div>

          {/* Description */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About Description
            </h3>
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
          </div>

          {/* Additional Image */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Additional Content Image
            </h3>
            <ImageUpload
              label="Door Detail Image (520x360)"
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

      {/* Core Values Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Core Values</h2>
          <button
            type="button"
            onClick={addCoreValue}
            className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            <Plus size={18} />
            Add Value
          </button>
        </div>

        <div className="space-y-6">
          {coreValues.map((value) => (
            <div
              key={value.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-start gap-4">
                <div className="text-gray-400 cursor-move pt-2">
                  <GripVertical size={20} />
                </div>

                <div className="flex-1 space-y-4">
                  {/* Icon Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ICON_OPTIONS.map((icon) => (
                        <button
                          key={icon.name}
                          type="button"
                          onClick={() => updateCoreValue(value.id, "icon", icon.path)}
                          className={`p-2 rounded-lg border-2 transition-colors ${
                            value.icon === icon.path
                              ? "border-brand-primary bg-brand-primary/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          title={icon.name}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={icon.path}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={
                                value.icon === icon.path
                                  ? "text-brand-primary"
                                  : "text-gray-500"
                              }
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={value.title.en}
                        onChange={(e) =>
                          updateCoreValue(value.id, "title", {
                            ...value.title,
                            en: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="Quality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title (Khmer)
                      </label>
                      <input
                        type="text"
                        value={value.title.km}
                        onChange={(e) =>
                          updateCoreValue(value.id, "title", {
                            ...value.title,
                            km: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
                        placeholder="គុណភាព"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (English)
                      </label>
                      <textarea
                        rows={2}
                        value={value.description.en}
                        onChange={(e) =>
                          updateCoreValue(value.id, "description", {
                            ...value.description,
                            en: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="Handcrafted with attention to detail"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Khmer)
                      </label>
                      <textarea
                        rows={2}
                        value={value.description.km}
                        onChange={(e) =>
                          updateCoreValue(value.id, "description", {
                            ...value.description,
                            km: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
                        placeholder="ផលិតដោយដៃជាមួយការយកចិត្តទុកដាក់"
                      />
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeCoreValue(value.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete this value"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {coreValues.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No core values added. Click &quot;Add Value&quot; to create one.
            </div>
          )}
        </div>

        {/* Save Core Values */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={async () => {
              try {
                await saveAboutData({
                  description: { en: form.description_en, km: form.description_km },
                  aboutLandscape,
                  aboutPortrait,
                  additionalImage,
                  coreValues,
                });
                toast.success("Core values saved successfully!");
              } catch (error) {
                toast.error("Failed to save core values");
                console.error(error);
              }
            }}
            className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            Save Core Values
          </button>
        </div>
      </div>
    </div>
  );
}
