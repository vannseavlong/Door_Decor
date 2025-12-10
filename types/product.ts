export type Product = {
  id?: string;
  name: string;
  price: number;
  category?: ProductCategory;
  imageUrl?: string;
  description?: string;
  /**
   * Flexibly support either an array of labeled specifications or a simple record.
   * - Common shape: [{ label, value }]
   * - Alternate shape: { Material: 'WPC', Dimensions: '...' }
   */
  specifications?: { label: string; value: string }[] | Record<string, string>;
  /**
   * Product code for display in ProductCode component
   */
  code?: string;
  /**
   * Rows for ProductCode component (fully independent from specifications)
   */
  productCodeRows?: { label: string; value: string }[];
  /** Multiple images (optional). If present, prefer this over `imageUrl`. */
  images?: string[];
  /** Optional feature list used by the richer product detail UI */
  features?: string[];
  createdAt?: number;
};

export type ProductCategory =
  | "Interior Doors"
  | "Exterior Doors"
  | "Hardware"
  | "Accessories";

export const CATEGORIES: ProductCategory[] = [
  "Interior Doors",
  "Exterior Doors",
  "Hardware",
  "Accessories",
];

/**
 * Route params used by category pages in the app router.
 * `slug` may be a string or an array of strings (when Next passes multiple segments).
 */
export type RouteParams = {
  slug?: string | string[];
};

/**
 * Route params used by product pages in the app router.
 * `id` may be a string or an array of strings (when Next passes multiple segments).
 */
export type ProductRouteParams = {
  id?: string | string[];
};
