"use client";

import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface FooterContent {
  companyDescription: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    line: string;
  };
}

export default function FooterTab() {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    companyDescription:
      "Wonder Door Industrial takes you to the doors of the future for modern and contemporary living, combined with international standard quality.",
    email: "info@wonderdoor.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      line: "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedContent: FooterContent = {
      companyDescription: formData.get("companyDescription") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      socialMedia: {
        facebook: formData.get("facebook") as string,
        instagram: formData.get("instagram") as string,
        youtube: formData.get("youtube") as string,
        linkedin: formData.get("linkedin") as string,
        line: formData.get("line") as string,
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Description
          </label>
          <textarea
            name="companyDescription"
            rows={4}
            defaultValue={footerContent.companyDescription}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Links
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                defaultValue={footerContent.socialMedia.facebook}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                defaultValue={footerContent.socialMedia.instagram}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <Youtube className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                name="youtube"
                placeholder="YouTube URL"
                defaultValue={footerContent.socialMedia.youtube}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                defaultValue={footerContent.socialMedia.linkedin}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                name="line"
                placeholder="Line URL"
                defaultValue={footerContent.socialMedia.line}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
