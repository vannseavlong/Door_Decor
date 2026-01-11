import { storage } from "../firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Upload an image to Firebase Storage
 * @param file - The image file to upload
 * @param path - The storage path (e.g., 'products/image-name.jpg')
 * @returns The download URL of the uploaded image
 */

export const uploadImageToStorage = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);

    // Provide more specific error messages
    if (error.code === "storage/unauthorized") {
      throw new Error("Unauthorized: Check Firebase Storage rules");
    } else if (error.code === "storage/canceled") {
      throw new Error("Upload canceled");
    } else if (error.code === "storage/unknown") {
      throw new Error(
        "Unknown error: " +
          (error.message || "Check Firebase Storage configuration")
      );
    } else if (error.message?.includes("storage")) {
      throw new Error("Storage error: " + error.message);
    }

    throw new Error(
      "Failed to upload image: " + (error.message || error.toString())
    );
  }
};

/**
 * Upload multiple images to Firebase Storage
 * @param files - Array of image files to upload
 * @param folderPath - The storage folder path (e.g., 'products')
 * @returns Array of download URLs
 */
export const uploadMultipleImages = async (
  files: File[],
  folderPath: string
): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => {
    const fileName = `${Date.now()}-${index}-${file.name}`;
    const path = `${folderPath}/${fileName}`;
    return uploadImageToStorage(file, path);
  });

  return Promise.all(uploadPromises);
};
