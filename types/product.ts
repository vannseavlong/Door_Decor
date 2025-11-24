export type Product = {
  id?: string;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
  description?: string;
  specifications?: { label: string; value: string }[];
  createdAt?: number;
};
