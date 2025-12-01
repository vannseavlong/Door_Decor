export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  images: string[]; // Multiple images showing different angles
  categoryId: string;
  price: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
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
