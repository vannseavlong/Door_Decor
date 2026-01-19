export interface Product {
  id: string;
  code?: string; // Product code for display
  name: string | { en: string; km: string };
  description: string | { en: string; km: string };
  imageUrl: string; // Single product image
  categoryId: string;
  price: string;
  features: string[];
  productCode: {
    [key: string]: { en: string; km: string };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  firestoreId?: string; // Firestore document ID (different from internal id)
  name: string | { en: string; km: string };
  description?: string | { en: string; km: string };
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface HeroContent {
  title: string;
  description: string;
  imageUrl: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
