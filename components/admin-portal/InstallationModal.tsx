"use client";

import React, { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { InstallationRecord } from "@/lib/firebase/installations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  installation: InstallationRecord | null;
  onSave: (installation: Omit<InstallationRecord, "id">) => void;
  onClose: () => void;
  open: boolean;
};

export default function InstallationModal({
  installation,
  onSave,
  onClose,
  open,
}: Props) {
  const getInitialFormData = (): Omit<InstallationRecord, "id"> => {
    if (installation) {
      return {
        title: installation.title,
        title_km: installation.title_km || "",
        description: installation.description,
        description_km: installation.description_km || "",
        image: installation.image,
        tag: installation.tag,
        href: installation.href || "",
        location: installation.location || "",
        date: installation.date || "",
      };
    }
    return {
      title: "",
      title_km: "",
      description: "",
      description_km: "",
      image: "",
      tag: "",
      href: "",
      location: "",
      date: "",
    };
  };

  const [formData, setFormData] =
    useState<Omit<InstallationRecord, "id">>(getInitialFormData);

  // Reset form when modal opens with different installation or when switching between add/edit
  useEffect(() => {
    if (open) {
      setFormData(getInitialFormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, installation?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-dark">
            {installation ? "Edit Installation" : "Add Installation"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the customer installation showcase.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto scrollbar-hide px-1"
        >
          <div className="space-y-6 pb-4">
            {/* Bilingual Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="Enter title in English"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (Khmer) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title_km}
                  onChange={(e) =>
                    setFormData({ ...formData, title_km: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="បញ្ចូលចំណងជើងជាភាសាខ្មែរ"
                  required
                />
              </div>
            </div>

            {/* Bilingual Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (English) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none"
                  placeholder="Enter description in English"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Khmer) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description_km}
                  onChange={(e) =>
                    setFormData({ ...formData, description_km: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none"
                  placeholder="បញ្ចូលការពណ៌នាជាភាសាខ្មែរ"
                  required
                />
              </div>
            </div>

            {/* Installation Image */}
            <div>
              <ImageUpload
                label="Installation Image"
                currentImage={formData.image}
                onImageChange={(url) =>
                  setFormData({ ...formData, image: url })
                }
                required
              />
            </div>

            {/* Tag and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tag/Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select a tag</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Customer Review">Customer Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="Phnom Penh, Cambodia"
                />
              </div>
            </div>

            {/* Date and Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="January 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(e) =>
                    setFormData({ ...formData, href: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="/products/..."
                />
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors font-medium shadow-sm"
          >
            {installation ? "Update" : "Add"} Installation
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
