"use client";

import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface FooterContent {
  companyDescription: { en: string; km: string };
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    line: string;
    tiktok: string;
    telegram: string;
    telegramChannel: string;
  };
}

export default function FooterTab() {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    companyDescription: {
      en: "Wonder Door Industrial takes you to the doors of the future for modern and contemporary living, combined with international standard quality.",
      km: "វ៉ាន់ឌ័រ ដ័រ ឧស្សាហកម្ម នាំអ្នកឆ្ពោះទៅកាន់ទ្វាររបស់អនាគត សម្រាប់ជីវិតសម័យទំនើប និងទំនើបបំផុត រួមផ្សំជាមួយគុណភាពស្តង់ដារអន្តរជាតិ។",
    },
    email: "info@wonderdoor.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      line: "",
      tiktok: "",
      telegram: "",
      telegramChannel: "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedContent: FooterContent = {
      companyDescription: {
        en: formData.get("companyDescription_en") as string,
        km: formData.get("companyDescription_km") as string,
      },
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      socialMedia: {
        facebook: formData.get("facebook") as string,
        instagram: formData.get("instagram") as string,
        youtube: formData.get("youtube") as string,
        linkedin: formData.get("linkedin") as string,
        line: formData.get("line") as string,
        tiktok: formData.get("tiktok") as string,
        telegram: formData.get("telegram") as string,
        telegramChannel: formData.get("telegramChannel") as string,
      },
    };

    setFooterContent(updatedContent);
    // TODO: Save to Firestore
    toast.success("Footer content updated successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Edit Footer Content
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description (English)
            </label>
            <textarea
              name="companyDescription_en"
              rows={4}
              defaultValue={footerContent.companyDescription.en}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description (Khmer)
            </label>
            <textarea
              name="companyDescription_km"
              rows={4}
              defaultValue={footerContent.companyDescription.km}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary font-khmer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={footerContent.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              defaultValue={footerContent.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            defaultValue={footerContent.address}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Links
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                defaultValue={footerContent.socialMedia.facebook}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-600 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <input
                type="text"
                name="tiktok"
                placeholder="TikTok URL"
                defaultValue={footerContent.socialMedia.tiktok}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="telegram"
                placeholder="Telegram URL"
                defaultValue={footerContent.socialMedia.telegram}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="telegramChannel"
                placeholder="Telegram Channel URL"
                defaultValue={footerContent.socialMedia.telegramChannel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                defaultValue={footerContent.socialMedia.instagram}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Youtube className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="youtube"
                placeholder="YouTube URL"
                defaultValue={footerContent.socialMedia.youtube}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                defaultValue={footerContent.socialMedia.linkedin}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-600 shrink-0" />
              <input
                type="text"
                name="line"
                placeholder="Line URL"
                defaultValue={footerContent.socialMedia.line}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
