import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";

/**
 * Upload image to Firebase Storage with high quality
 * @param file - The image file to upload
 * @param path - Storage path (e.g., 'banners/', 'products/')
 * @returns Download URL of the uploaded image
 */
export async function uploadImageToStorage(
  file: File,
  path: string = "images/"
): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, `${path}${fileName}`);

    // Set metadata for better quality and caching
    const metadata = {
      contentType: file.type,
      cacheControl: "public, max-age=31536000", // Cache for 1 year
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
      },
    };

    // Upload the original file without compression
    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}

/**
 * Upload image with optional client-side quality control
 * For hero banners, use high quality settings
 */
export async function uploadImageWithQuality(
  file: File,
  path: string = "images/",
  maxWidth: number = 2560,
  maxHeight: number = 2560,
  quality: number = 0.95
): Promise<string> {
  // If file is WebP or image is already small, upload directly
  if (file.type === "image/webp" || file.size < 2 * 1024 * 1024) {
    return uploadImageToStorage(file, path);
  }

  // Otherwise, compress only if needed
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = async () => {
        let width = img.width;
        let height = img.height;

        // Only resize if image exceeds max dimensions
        if (width <= maxWidth && height <= maxHeight) {
          // Upload original if within limits
          try {
            const url = await uploadImageToStorage(file, path);
            resolve(url);
          } catch (error) {
            reject(error);
          }
          return;
        }

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Use high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with high quality
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }

            // Create a file from blob
            const processedFile = new File([blob], file.name, {
              type: "image/webp", // Use WebP for better quality/size ratio
              lastModified: Date.now(),
            });

            try {
              const url = await uploadImageToStorage(processedFile, path);
              resolve(url);
            } catch (error) {
              reject(error);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
