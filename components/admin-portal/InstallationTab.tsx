"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Loading } from "@/components/ui/spinner";
import InstallationModal from "./InstallationModal";
import { InstallationRecord } from "@/lib/firebase/installations";
import {
  getInstallations,
  addInstallation,
  updateInstallation,
  deleteInstallation,
} from "@/app/(admin-portal)/dashboard/installation-actions";
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
import {
  useInstallationsQuery,
  useInvalidateInstallations,
} from "@/lib/react-query/useFirebaseQuery";

export default function InstallationTab() {
  const [editingInstallation, setEditingInstallation] =
    useState<InstallationRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Use React Query for caching
  const { data: installations = [], isLoading: loading } =
    useInstallationsQuery(getInstallations);
  const invalidateInstallations = useInvalidateInstallations();

  const handleAddInstallation = () => {
    setEditingInstallation(null);
    setShowModal(true);
  };

  const handleEditInstallation = (installation: InstallationRecord) => {
    setEditingInstallation(installation);
    setShowModal(true);
  };

  const handleDeleteInstallation = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteInstallation(deleteId);
      invalidateInstallations(); // Refresh cache
      toast.success("Installation deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete installation");
    }
  };

  const handleSaveInstallation = async (
    installation: Omit<InstallationRecord, "id">,
  ) => {
    try {
      if (editingInstallation) {
        await updateInstallation(editingInstallation.id, installation);
        toast.success("Installation updated successfully");
      } else {
        await addInstallation(installation);
        toast.success("Installation added successfully");
      }
      invalidateInstallations(); // Refresh cache
      setShowModal(false);
      setEditingInstallation(null);
    } catch {
      toast.error("Failed to save installation");
    }
  };

  if (loading) return <Loading text="Loading installations..." />;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Manage Installations
          </h2>
          <button
            onClick={handleAddInstallation}
            className="bg-brand-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center justify-center transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Add Installation
          </button>
        </div>

        {installations.length === 0 ? (
          <div className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No installations yet</p>
            <button
              onClick={handleAddInstallation}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
              Add your first installation
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Tag
                  </th>
                  <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {installations.map((installation) => (
                  <tr key={installation.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      {installation.image && (
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden">
                          <Image
                            src={installation.image}
                            alt={installation.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                      {installation.title}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] sm:text-xs">
                        {installation.tag}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {installation.location || "-"}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {installation.date || "-"}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-32 sm:w-40"
                          >
                            <DropdownMenuItem
                              onSelect={() =>
                                handleEditInstallation(installation)
                              }
                              className="text-xs sm:text-sm"
                            >
                              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />{" "}
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() =>
                                handleDeleteInstallation(installation.id)
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
        <InstallationModal
          installation={editingInstallation}
          onSave={handleSaveInstallation}
          onClose={() => {
            setShowModal(false);
            setEditingInstallation(null);
          }}
          open={showModal}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Installation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this installation? This action
              cannot be undone.
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
