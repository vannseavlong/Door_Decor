"use client";

import React, { useState, useEffect } from "react";
import { Plus, Package, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Product, Category } from "@/types";
import { toast } from "sonner";
import { Loading } from "@/components/ui/spinner";
import ProductModal from "./ProductModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/app/(admin-portal)/dashboard/product-actions";
import { getCategories } from "@/app/(admin-portal)/dashboard/category-actions";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(
          productsData.map((p) => ({ ...p, id: p.id || "" })) as Product[],
        );
        setCategories(
          categoriesData.map((c) => ({ ...c, id: c.id || "" })) as Category[],
        );
      } catch {
        toast.error("Failed to load data");
      }
      setLoading(false);
    })();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeleteId(productId);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct(deleteId);
      // Refresh products from server
      const productsData = await getProducts();
      setProducts(
        productsData.map((p) => ({ ...p, id: p.id || "" })) as Product[],
      );
      toast.success("Product deleted successfully");
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleSaveProduct = async (product: Product) => {
    // Ensure name/description are always { en, km }
    const safeProduct = {
      ...product,
      name:
        typeof product.name === "string"
          ? { en: product.name, km: "" }
          : product.name,
      description:
        typeof product.description === "string"
          ? { en: product.description, km: "" }
          : product.description,
    };

    try {
      if (editingProduct) {
        // When updating, remove id from the data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...productData } = safeProduct;
        await updateProduct(id, productData);
        // Refresh products from server to get the latest data
        const productsData = await getProducts();
        setProducts(
          productsData.map((p) => ({ ...p, id: p.id || "" })) as Product[],
        );
        toast.success("Product updated successfully");
      } else {
        await addProduct(safeProduct);
        // Refresh products from server after adding
        const productsData = await getProducts();
        setProducts(
          productsData.map((p) => ({ ...p, id: p.id || "" })) as Product[],
        );
        toast.success("Product added successfully");
      }
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return categoryId;
    return typeof category.name === "string" ? category.name : category.name.en;
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  // Debug: Check for duplicate IDs
  useEffect(() => {
    const ids = products.map((p) => p.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.error("Duplicate product IDs found:", duplicates);
      console.error("All products:", products);
    }
  }, [products]);

  if (loading) return <Loading text="Loading products..." />;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Manage Products
            </h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px] text-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {typeof category.name === "string"
                        ? category.name
                        : category.name.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="default"
                onClick={handleAddProduct}
                className="text-sm px-3 sm:px-4 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">
              {products.length === 0
                ? "No products yet"
                : "No products in this category"}
            </p>
            <Button
              variant="link"
              onClick={handleAddProduct}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
              Add your first product
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Image</TableHead>
                  <TableHead className="text-xs sm:text-sm">Name</TableHead>
                  <TableHead className="hidden lg:table-cell text-xs sm:text-sm">
                    Description
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">Category</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                    Code
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-xs sm:text-sm">
                    Price
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={
                            typeof product.name === "string"
                              ? product.name
                              : product.name.en
                          }
                          width={48}
                          height={48}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                          <Package className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      {typeof product.name === "string"
                        ? product.name
                        : product.name.en}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                      {typeof product.description === "string"
                        ? product.description.substring(0, 50)
                        : product.description?.en?.substring(0, 50)}
                      ...
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {product.categoryId
                        ? getCategoryName(product.categoryId)
                        : "Uncategorized"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.productCode &&
                      typeof product.productCode === "object" &&
                      Object.keys(product.productCode).length > 0 ? (
                        <ul className="text-xs text-gray-600 space-y-1">
                          {Object.entries(product.productCode).map(
                            ([key, value]) => {
                              const [labelEn] = key.split("/");
                              return (
                                <li key={key}>
                                  <span className="font-semibold">
                                    {labelEn}:
                                  </span>{" "}
                                  {value.en}
                                </li>
                              );
                            },
                          )}
                        </ul>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                      {product.price}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                          >
                            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product)}
                            className="text-xs sm:text-sm"
                          >
                            <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />{" "}
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-xs sm:text-sm"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />{" "}
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className="mb-8 text-xs sm:text-sm">
                List of all products
              </TableCaption>
            </Table>
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
