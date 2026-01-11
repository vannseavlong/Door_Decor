import React, { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { compressImage } from "@/lib/utils/imageCompression";

interface MultipleImageUploadProps {
  label: string;
  currentImages?: string[];
  onImagesChange: (imageUrls: string[]) => void;
  maxImages?: number;
  /** Maximum width for images (default: 1200) */
  maxWidth?: number;
  /** Maximum height for images (default: 1200) */
  maxHeight?: number;
  /** Image quality 0-1 (default: 0.82) */
  quality?: number;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  label,
  currentImages = [],
  onImagesChange,
  maxImages = 4,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82,
}) => {
  const [previews, setPreviews] = useState<string[]>(currentImages);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check if adding these files exceeds max limit
    if (previews.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert("Please select only image files");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Each image should be less than 10MB");
        return;
      }
    }

    setUploading(true);

    try {
      const newPreviews: string[] = [];

      for (const file of files) {
        // Compress image with improved quality
        const compressedBase64 = await compressImage(
          file,
          maxWidth,
          maxHeight,
          quality
        );
        newPreviews.push(compressedBase64);
      }

      const updatedPreviews = [...previews, ...newPreviews];
      setPreviews(updatedPreviews);
      onImagesChange(updatedPreviews);
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Failed to process images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onImagesChange(updatedPreviews);
  };

  const handleReplace = async (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Image should be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const compressedBase64 = await compressImage(
        file,
        maxWidth,
        maxHeight,
        quality
      );
      const updatedPreviews = [...previews];
      updatedPreviews[index] = compressedBase64;
      setPreviews(updatedPreviews);
      onImagesChange(updatedPreviews);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const canAddMore = previews.length < maxImages;

  return (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}{" "}
        <span className="text-gray-500 text-sm">
          ({previews.length}/{maxImages})
        </span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        {/* Existing images */}
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
              <label
                className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Replace image"
              >
                <Upload className="w-3 h-3" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReplace(index, file);
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              Image {index + 1}
            </div>
          </div>
        ))}

        {/* Upload button */}
        {canAddMore && (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center">
              {uploading ? (
                <div className="text-gray-500 text-sm">Uploading...</div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Add Image</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Upload up to {maxImages} images showing different angles of the product.
        PNG, JPG, GIF up to 5MB each.
      </p>
    </div>
  );
};
