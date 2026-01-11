import React, { useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { compressImage } from "@/lib/utils/imageCompression";

interface ImageUploadProps {
  label: string;
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  required?: boolean;
  /** Maximum width for the image (default: 1800 for banners, 1200 for others) */
  maxWidth?: number;
  /** Maximum height for the image (default: 1800 for banners, 1200 for others) */
  maxHeight?: number;
  /** Image quality 0-1 (default: 0.85 for better quality) */
  quality?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  currentImage,
  onImageChange,
  required = false,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);

  // Update preview when currentImage changes
  useEffect(() => {
    if (currentImage) {
      setPreview(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10MB");
      return;
    }

    setUploading(true);

    try {
      // Compress image with improved quality
      const compressedBase64 = await compressImage(
        file,
        maxWidth,
        maxHeight,
        quality
      );

      // Check size after compression
      const sizeInBytes = (compressedBase64.length * 3) / 4;
      const sizeInKB = Math.round(sizeInBytes / 1024);
      console.log(`Compressed image size: ${sizeInKB}KB (quality: ${quality})`);

      // Firestore limit is 1MB per document, but banners might be the only large field
      if (sizeInBytes > 800000) {
        alert(
          `Image is still large (${sizeInKB}KB). For best results, try reducing the original image size or use a lower resolution.`
        );
      }

      setPreview(compressedBase64);
      onImageChange(compressedBase64);
      setUploading(false);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange("");
  };

  return (
    <div>
      <label className="block text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <label
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title="Replace image"
            >
              <Upload className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="text-gray-500">Processing...</div>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WebP up to 10MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};
