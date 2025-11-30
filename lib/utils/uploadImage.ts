import { storage } from '../config/firebase';

/**
 * Upload an image to Firebase Storage
 * @param file - The image file to upload
 * @param path - The storage path (e.g., 'products/image-name.jpg')
 * @returns The download URL of the uploaded image
 * 
 * PRODUCTION SETUP:
 * 1. Uncomment the imports below
 * 2. Uncomment the Firebase Storage code
 * 3. Comment out the mock implementation
 * 4. Make sure Firebase Storage is enabled in your Firebase Console
 * 5. Set up Storage security rules (allow authenticated users to upload)
 */

// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageToStorage = async (file: File, path: string): Promise<string> => {
  try {
    // PRODUCTION CODE (Uncomment when ready):
    /*
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
    */
    
    // Mock implementation for demo
    // This creates a base64 data URL for preview purposes
    // In production, Firebase Storage will store the actual file and return a permanent URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Upload multiple images to Firebase Storage
 * @param files - Array of image files to upload
 * @param folderPath - The storage folder path (e.g., 'products')
 * @returns Array of download URLs
 */
export const uploadMultipleImages = async (files: File[], folderPath: string): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => {
    const fileName = `${Date.now()}-${index}-${file.name}`;
    const path = `${folderPath}/${fileName}`;
    return uploadImageToStorage(file, path);
  });
  
  return Promise.all(uploadPromises);
};
