"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query keys for cache management
export const queryKeys = {
  categories: ["categories"] as const,
  installations: ["installations"] as const,
  products: ["products"] as const,
  about: ["about"] as const,
  hero: ["hero"] as const,
  footer: ["footer"] as const,
};

// Hook for categories with caching
export function useCategoriesQuery(fetcher: () => Promise<any[]>) {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetcher,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for installations with caching
export function useInstallationsQuery(fetcher: () => Promise<any[]>) {
  return useQuery({
    queryKey: queryKeys.installations,
    queryFn: fetcher,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for products with caching
export function useProductsQuery(fetcher: () => Promise<any[]>) {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: fetcher,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for about data with caching
export function useAboutQuery(fetcher: () => Promise<any>) {
  return useQuery({
    queryKey: queryKeys.about,
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5 minutes (changes less frequently)
  });
}

// Mutation hooks for invalidating cache after changes
export function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.categories });
}

export function useInvalidateInstallations() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.installations });
}

export function useInvalidateProducts() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.products });
}

export function useInvalidateAbout() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.about });
}
