# Firebase Storage Setup Guide

## ✅ Changes Made

All image upload components now use **Firebase Storage** instead of base64 encoding. This fixes the "Failed to fetch" error caused by oversized data.

## 🔧 Required Firebase Setup

### 1. Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **Get Started**
5. Choose your security rules (start in test mode for development)
6. Select a Cloud Storage location (choose one close to your users)

### 2. Update Storage Security Rules

In the Firebase Console, go to **Storage** → **Rules** and replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload and read images
    match /hero/{allPaths=**} {
      allow read: if true;  // Anyone can read hero images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
    
    match /products/{allPaths=**} {
      allow read: if true;  // Anyone can read product images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
    
    match /installations/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /categories/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Verify Environment Variable

Make sure your `.env.local` file includes the storage bucket:

```env
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

You can find this in Firebase Console → Project Settings → General

## 📝 What Was Fixed

### Before (Base64 - Broken ❌)
- Images were converted to base64 strings
- Stored directly in Firestore documents
- Large images caused "Failed to fetch" errors
- Not persistent (lost on refresh)

### After (Firebase Storage - Working ✅)
- Images uploaded to Firebase Storage
- Only URLs stored in Firestore
- No size limits causing errors
- Persistent and globally accessible
- Proper CDN delivery

## 🧪 Testing

1. Open admin panel
2. Try uploading an image in Hero Section
3. The image should upload successfully
4. Refresh the page - image should still be there
5. The image URL should look like: `https://firebasestorage.googleapis.com/...`

## ⚠️ Important Notes

- Images are now stored permanently in Firebase Storage
- Old base64 images (if any) will still display but won't be editable
- You may want to re-upload images for consistency
- Firebase Storage has generous free tier: 5GB storage, 1GB/day download
