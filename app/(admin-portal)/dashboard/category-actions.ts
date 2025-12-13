"use server";
import {
  getCategoriesServer,
  addCategoryServer,
  updateCategoryServer,
  deleteCategoryServer,
  CategoryRecord,
} from "@/lib/firebase/category";

export async function getCategories() {
  return getCategoriesServer();
}

export async function addCategory(data: CategoryRecord) {
  return addCategoryServer(data);
}

export async function updateCategory(
  id: string,
  data: Partial<CategoryRecord>
) {
  return updateCategoryServer(id, data);
}

export async function deleteCategory(id: string) {
  return deleteCategoryServer(id);
}
