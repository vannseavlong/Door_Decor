"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderTree, MoreVertical } from "lucide-react";
import { Category } from "@/types";
import { toast } from "sonner";
import { Loading } from "@/components/ui/spinner";
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CategoryModal from "./CategoryModal";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/app/(admin-portal)/dashboard/category-actions";
import {
  useCategoriesQuery,
  useInvalidateCategories,
} from "@/lib/react-query/useFirebaseQuery";

export default function CategoriesTab() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Use React Query for caching
  const { data: categories = [], isLoading: loading } = useCategoriesQuery(
    async () => {
      const data = await getCategories();
      return data.map((d) => ({ ...d, id: d.id || "" })) as Category[];
    },
  );

  const invalidateCategories = useInvalidateCategories();

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setDeleteId(categoryId);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCategory(deleteId);
      invalidateCategories(); // Refresh cache
      toast.success("Category deleted successfully");
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleSaveCategory = async (category: Category) => {
    // Ensure name/description are always { en, km }
    const safeCategory = {
      ...category,
      name:
        typeof category.name === "string"
          ? { en: category.name, km: "" }
          : category.name,
      description:
        typeof category.description === "string"
          ? { en: category.description, km: "" }
          : (category.description ?? { en: "", km: "" }),
    };

    try {
      if (editingCategory) {
        // Use firestoreId as the document ID
        const docId = editingCategory.firestoreId || editingCategory.id;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, firestoreId, ...categoryData } = safeCategory; // Remove both id fields from update data
        await updateCategory(docId, categoryData);
        toast.success("Category updated successfully");
      } else {
        await addCategory(safeCategory);
        toast.success("Category added successfully");
      }
      invalidateCategories(); // Refresh cache
      setShowModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category");
    }
  };

  if (loading) return <Loading text="Loading categories..." />;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Manage Categories
          </h2>
          <button
            onClick={handleAddCategory}
            className="bg-brand-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center justify-center transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Add Category
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <FolderTree className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No categories yet</p>
            <button
              onClick={handleAddCategory}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
              Add your first category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Name (English)
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Name (Khmer)
                  </th>
                  <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Description (English)
                  </th>
                  <th className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Description (Khmer)
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                      {typeof category.name === "string"
                        ? category.name
                        : category.name?.en}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 font-khmer">
                      {typeof category.name === "string"
                        ? "-"
                        : category.name?.km}
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {typeof category.description === "string"
                        ? category.description
                        : category.description?.en || "-"}
                    </td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 font-khmer">
                      {typeof category.description === "string"
                        ? "-"
                        : category.description?.km || "-"}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-32 sm:w-40"
                          >
                            <DropdownMenuItem
                              onSelect={() => handleEditCategory(category)}
                              className="text-xs sm:text-sm"
                            >
                              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />{" "}
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() =>
                                handleDeleteCategory(
                                  category.firestoreId || category.id,
                                )
                              }
                              className="text-xs sm:text-sm"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-red-600" />{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
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
