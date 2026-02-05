"use client";

import React, { useState } from "react";
import { Category } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CategoryModalProps {
  category: Category | null;
  onSave: (category: Category) => void;
  onClose: () => void;
}

export default function CategoryModal({
  category,
  onSave,
  onClose,
}: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name:
      typeof category?.name === "string"
        ? { en: category.name, km: "" }
        : category?.name || { en: "", km: "" },
    description:
      typeof category?.description === "string"
        ? { en: category.description, km: "" }
        : category?.description || { en: "", km: "" },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData: Category = {
      id: category?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      sortOrder: category?.sortOrder ?? 0,
      createdAt: category?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(categoryData);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category Name (English) *</Label>
              <Input
                type="text"
                value={formData.name.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, en: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category Name (Khmer) *</Label>
              <Input
                type="text"
                value={formData.name.km}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, km: e.target.value },
                  })
                }
                className="font-khmer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Description (English)</Label>
              <Textarea
                value={formData.description.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      en: e.target.value,
                    },
                  })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Description (Khmer)</Label>
              <Textarea
                value={formData.description.km}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      km: e.target.value,
                    },
                  })
                }
                rows={3}
                className="font-khmer"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                style={{ borderColor: "#f97316", color: "#f97316" }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              style={{ backgroundColor: "#f97316", color: "white" }}
            >
              {category ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
