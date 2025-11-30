export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  images?: string[]; // Multiple images showing different angles
  price?: number;
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
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
