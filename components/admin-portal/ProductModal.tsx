"use client";

import React, { useState } from "react";
import { Product, Category } from "@/types";
import { ImageUpload } from "./ImageUpload";
import { Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface ProductModalProps {
  product: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
  onClose: () => void;
  onUpdateProductCode?: (productId: string, productCode: { [key: string]: { en: string; km: string } }) => Promise<void>;
}

export default function ProductModal({
  product,
  categories,
  onSave,
  onClose,
  onUpdateProductCode,
}: ProductModalProps) {
  // Sort categories by sortOrder
  const sortedCategories = [...categories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  
  const [formData, setFormData] = useState<{
    code: string;
    name: { en: string; km: string };
    description: { en: string; km: string };
    price: string;
    categoryId: string;
    imageUrl: string;
    productCode: { [key: string]: { en: string; km: string } };
    features: string[];
  }>({
    code: product?.code || "",
    name:
      typeof product?.name === "string"
        ? { en: product.name, km: "" }
        : product?.name || { en: "", km: "" },
    description:
      typeof product?.description === "string"
        ? { en: product.description, km: "" }
        : product?.description || { en: "", km: "" },
    price: product?.price || "",
    categoryId: product?.categoryId || "",
    imageUrl: product?.imageUrl || "",
    productCode: product?.productCode || {},
    features: product?.features || [],
  });

  const [specKey, setSpecKey] = useState({ en: "", km: "" });
  const [specValue, setSpecValue] = useState({ en: "", km: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    const productData: Product = {
      id: product?.id || Date.now().toString(),
      code: formData.code,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl,
      productCode: formData.productCode,
      features: formData.features,
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(productData);
    onClose(); // Close dialog immediately to prevent duplicate submissions
  };

  const handleAddSpec = () => {
    if (
      (specKey.en.trim() || specKey.km.trim()) &&
      (specValue.en.trim() || specValue.km.trim())
    ) {
      const key = `${specKey.en}/${specKey.km}`;
      setFormData({
        ...formData,
        productCode: {
          ...formData.productCode,
          [key]: { en: specValue.en, km: specValue.km },
        },
      });
      setSpecKey({ en: "", km: "" });
      setSpecValue({ en: "", km: "" });
    }
  };

  const handleRemoveSpec = async (key: string) => {
    const newSpecs = { ...formData.productCode };
    delete newSpecs[key];
    setFormData({ ...formData, productCode: newSpecs });

    // If editing an existing product, immediately save the change to Firebase
    if (product?.id && onUpdateProductCode) {
      try {
        await onUpdateProductCode(product.id, newSpecs);
      } catch (error) {
        console.error("Failed to delete product code:", error);
        // Revert the local state if save failed
        setFormData({ ...formData, productCode: { ...formData.productCode } });
      }
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="block">Product Name (English) *</Label>
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
              <Label className="block">Product Name (Khmer) *</Label>
              <Input
                type="text"
                value={formData.name.km}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, km: e.target.value },
                  })
                }
                required
                className="font-khmer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="block">Product Code</Label>
            <Input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="e.g., 17637318181918"
            />
          </div>
          <div className="space-y-2">
            <Label className="block">Category *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value: string) =>
                setFormData({ ...formData, categoryId: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {sortedCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {typeof category.name === "string"
                      ? category.name
                      : `${category.name?.en || ""}/${category.name?.km || ""}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="block">Description (English)</Label>
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
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label className="block">Description (Khmer)</Label>
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
                rows={4}
                className="font-khmer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="block">Price</Label>
            <Input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="e.g., $999 or Contact for price"
            />
          </div>
          <div className="space-y-2">
            {/* <Label className="block">Product Image *</Label> */}
            <ImageUpload
              label="Product Image"
              currentImage={formData.imageUrl}
              onImageChange={(imageUrl: string) =>
                setFormData({ ...formData, imageUrl })
              }
              required
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="block">Product Code</Label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-orange-100 transition-colors"
                title="Add product code"
              >
                <Plus className="w-5 h-5" style={{ color: "#f97316" }} />
              </button>
            </div>

            {/* Dropdown Select - Full Width */}
            <Select
              value={specKey.en}
              onValueChange={(value) => {
                const predefinedLabels = [
                  { en: "Type", km: "ប្រភេទឥវ៉ាន់" },
                  { en: "Special", km: "លក្ខណៈពិសេស" },
                  { en: "Warranty", km: "ធានាគុណភាព" },
                  { en: "Design", km: "រចនាប័ទ្ម" },
                  { en: "Use Area", km: "តំបន់ប្រើប្រាស់" },
                  { en: "Door Type", km: "ប្រភេទទ្វារ" },
                  { en: "Made of", km: "ផលិតអំពី" },
                ];
                const selected = predefinedLabels.find((l) => l.en === value);
                if (selected) {
                  setSpecKey({ en: selected.en, km: selected.km });
                } else if (value === "custom") {
                  setSpecKey({ en: "", km: "" });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select label or custom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Type">Type / ប្រភេទឥវ៉ាន់</SelectItem>
                <SelectItem value="Special">Special / លក្ខណៈពិសេស</SelectItem>
                <SelectItem value="Warranty">Warranty / ធានាគុណភាព</SelectItem>
                <SelectItem value="Design">Design / រចនាប័ទ្ម</SelectItem>
                <SelectItem value="Use Area">
                  Use Area / តំបន់ប្រើប្រាស់
                </SelectItem>
                <SelectItem value="Door Type">
                  Door Type / ប្រភេទទ្វារ
                </SelectItem>
                <SelectItem value="Made of">Made of / ផលិតអំពី</SelectItem>
                <SelectItem value="custom">Custom Label...</SelectItem>
              </SelectContent>
            </Select>

            {/* Show inputs based on selection */}
            {specKey.en === "" ? (
              // Custom label: 4 inputs in 2 rows
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={specKey.en}
                    onChange={(e) =>
                      setSpecKey({ ...specKey, en: e.target.value })
                    }
                    placeholder="Label (Eng)"
                  />
                  <Input
                    type="text"
                    value={specValue.en}
                    onChange={(e) =>
                      setSpecValue({ ...specValue, en: e.target.value })
                    }
                    placeholder="Value (Eng)"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={specKey.km}
                    onChange={(e) =>
                      setSpecKey({ ...specKey, km: e.target.value })
                    }
                    placeholder="Label (Kh)"
                    className="font-khmer"
                  />
                  <Input
                    type="text"
                    value={specValue.km}
                    onChange={(e) =>
                      setSpecValue({ ...specValue, km: e.target.value })
                    }
                    placeholder="Value (Kh)"
                    className="font-khmer"
                  />
                </div>
              </div>
            ) : (
              // Predefined label: Only 2 value inputs
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={specValue.en}
                  onChange={(e) =>
                    setSpecValue({ ...specValue, en: e.target.value })
                  }
                  placeholder="Value (Eng)"
                />
                <Input
                  type="text"
                  value={specValue.km}
                  onChange={(e) =>
                    setSpecValue({ ...specValue, km: e.target.value })
                  }
                  placeholder="Value (Kh)"
                  className="font-khmer"
                />
              </div>
            )}

            {/* Table Display */}
            {formData.productCode &&
              Object.keys(formData.productCode).length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">
                          Label (En)
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">
                          Value (En)
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">
                          Label (Kh)
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">
                          Value (Kh)
                        </th>
                        <th className="px-3 py-2 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(formData.productCode).map(
                        ([key, value]) => {
                          const [labelEn, labelKm] = key.split("/");
                          return (
                            <tr key={key} className="border-t hover:bg-gray-50">
                              <td className="px-3 py-2">{labelEn || "-"}</td>
                              <td className="px-3 py-2">{value.en || "-"}</td>
                              <td className="px-3 py-2 font-khmer">
                                {labelKm || "-"}
                              </td>
                              <td className="px-3 py-2 font-khmer">
                                {value.km || "-"}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpec(key)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                style={{ borderColor: "#f97316", color: "#f97316" }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              style={{ backgroundColor: "#f97316", color: "white" }}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? product
                  ? "Updating..."
                  : "Adding..."
                : product
                  ? "Update"
                  : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
