"use server";
import {
  getProductsServer,
  addProductServer,
  updateProductServer,
  deleteProductServer,
  ProductRecord,
} from "@/lib/firebase/product";

export async function getProducts() {
  return getProductsServer();
}

export async function addProduct(data: ProductRecord) {
  return addProductServer(data);
}

export async function updateProduct(id: string, data: Partial<ProductRecord>) {
  return updateProductServer(id, data);
}

export async function deleteProduct(id: string) {
  return deleteProductServer(id);
}
