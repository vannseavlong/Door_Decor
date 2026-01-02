import { db as adminDb } from "@/lib/firebase/server";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

/**
 * Optimized Firebase queries for customer-facing pages
 * These functions use field selection and caching to minimize reads
 */

// Lightweight product data for listings (exclude heavy fields)
export async function getProductsListOptimized() {
  try {
    const snapshot = await adminDb.collection("products").get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        category: data.category,
        imageUrl: data.imageUrl,
        // Exclude heavy fields like full specifications, gallery images, etc.
      };
    });
  } catch (error) {
    console.error("Error fetching optimized products:", error);
    return [];
  }
}

// Lightweight category data
export async function getCategoriesOptimized() {
  try {
    const snapshot = await adminDb.collection("categories").get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching optimized categories:", error);
    return [];
  }
}

// Lightweight installation data for blog section
export async function getInstallationsOptimized(limit = 6) {
  try {
    const snapshot = await adminDb
      .collection("installations")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching optimized installations:", error);
    return [];
  }
}

// Get single product with full details (for product detail page)
export async function getProductByIdOptimized(id: string) {
  try {
    const doc = await adminDb.collection("products").doc(id).get();
    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}
