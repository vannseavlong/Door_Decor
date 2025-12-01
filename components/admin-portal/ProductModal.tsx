"use client";

import React, { useState } from "react";
import { Product, Category } from "@/types";
import { MultipleImageUpload } from "./MultipleImageUpload";
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
}

export default function ProductModal({
  product,
  categories,
  onSave,
  onClose,
}: ProductModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
    categoryId: string;
    images: string[];
    specifications: { [key: string]: string };
    features: string[];
  }>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    categoryId: product?.categoryId || "",
    images: product?.images || [],
    specifications: product?.specifications || {},
    features: product?.features || [],
  });

  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: product?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId,
      images: formData.images,
      specifications: formData.specifications,
      features: formData.features,
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(productData);
  };

  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: specValue,
        },
      });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="block">Product Name *</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
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
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="block">Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="block">Price *</Label>
            <Input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="e.g., $999 or Contact for price"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="block">Product Images *</Label>
            <MultipleImageUpload
              label="Product Images"
              currentImages={formData.images}
              onImagesChange={(images: string[]) =>
                setFormData({ ...formData, images })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="block">Specifications</Label>
            <div className="space-y-2">
              {formData.specifications &&
                Object.keys(formData.specifications).length > 0 && (
                  <ul className="space-y-1">
                    {Object.entries(formData.specifications).map(
                      ([key, value]) => (
                        <li key={key} className="flex items-center gap-2">
                          <span className="font-semibold text-xs bg-gray-100 px-2 py-1 rounded">
                            {key}:
                          </span>
                          <span className="text-xs">{value}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveSpec(key)}
                          >
                            Remove
                          </Button>
                        </li>
                      )
                    )}
                  </ul>
                )}
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Label (e.g. Material)"
                />
                <Input
                  type="text"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Value (e.g. WPC)"
                />
                <Button type="button" size="sm" onClick={handleAddSpec}>
                  Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              {product ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
