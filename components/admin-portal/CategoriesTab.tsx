"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderTree, MoreVertical } from "lucide-react";
import { Category } from "@/types";
import { toast } from "sonner";
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

  // Use React Query for caching
  const { data: categories = [], isLoading: loading } = useCategoriesQuery(
    async () => {
      const data = await getCategories();
      return data.map((d) => ({ ...d, id: d.id || "" })) as Category[];
    }
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
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
        invalidateCategories(); // Refresh cache
        toast.success("Category deleted successfully");
      } catch {
        toast.error("Failed to delete category");
      }
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
          : category.description ?? { en: "", km: "" },
    };

    try {
      if (editingCategory) {
        await updateCategory(safeCategory.id, safeCategory);
        toast.success("Category updated successfully");
      } else {
        await addCategory(safeCategory);
        toast.success("Category added successfully");
      }
      invalidateCategories(); // Refresh cache
      setShowModal(false);
      setEditingCategory(null);
    } catch {
      toast.error("Failed to save category");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Manage Categories</h2>
          <button
            onClick={handleAddCategory}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name (English)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name (Khmer)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description (English)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description (Khmer)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {typeof category.name === "string"
                        ? category.name
                        : category.name?.en}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 font-khmer">
                      {typeof category.name === "string"
                        ? "-"
                        : category.name?.km}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {typeof category.description === "string"
                        ? category.description
                        : category.description?.en || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-khmer">
                      {typeof category.description === "string"
                        ? "-"
                        : category.description?.km || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onSelect={() => handleEditCategory(category)}
                            >
                              <Edit2 className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2 text-red-600" />{" "}
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
    </>
  );
}
