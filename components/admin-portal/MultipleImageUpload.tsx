import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface MultipleImageUploadProps {
  label: string;
  currentImages?: string[];
  onImagesChange: (imageUrls: string[]) => void;
  maxImages?: number;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({ 
  label, 
  currentImages = [], 
  onImagesChange,
  maxImages = 4
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
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Each image should be less than 5MB');
        return;
      }
    }

    setUploading(true);

    try {
      const newPreviews: string[] = [];

      for (const file of files) {
        // Create preview
        const result = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
        newPreviews.push(result);
      }

      const updatedPreviews = [...previews, ...newPreviews];
      setPreviews(updatedPreviews);
      onImagesChange(updatedPreviews);

      // In production, upload to Firebase Storage:
      /*
      import { uploadMultipleImages } from '../../utils/uploadImage';
      const downloadURLs = await uploadMultipleImages(files, 'products');
      const updatedPreviews = [...previews, ...downloadURLs];
      setPreviews(updatedPreviews);
      onImagesChange(updatedPreviews);
      */
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onImagesChange(updatedPreviews);
  };

  const canAddMore = previews.length < maxImages;

  return (
    <div>
      <label className="block text-gray-700 mb-2">
        {label} <span className="text-gray-500 text-sm">({previews.length}/{maxImages})</span>
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
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
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
        Upload up to {maxImages} images showing different angles of the product. PNG, JPG, GIF up to 5MB each.
      </p>
    </div>
  );
};
