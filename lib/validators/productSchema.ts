import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.number().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
