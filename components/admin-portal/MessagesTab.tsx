"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { MoreVertical, CheckCircle2, Clock } from "lucide-react";
import { Loading } from "@/components/ui/spinner";
import {
  getMessages,
  updateMessage,
  deleteMessage,
  MessageRecord,
} from "@/lib/firebase/messages";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MessagesTab() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleCalled = async (message: MessageRecord) => {
    try {
      await updateMessage(message.id, { isCalled: !message.isCalled });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, isCalled: !m.isCalled } : m,
        ),
      );
      toast.success(
        message.isCalled
          ? "Marked as not called"
          : "Marked as called successfully",
      );
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteMessage(deleteId);
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      toast.success("Message deleted successfully");
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch {
      return "Invalid date";
    }
  };

  if (loading) return <Loading text="Loading messages..." />;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-brand-dark">
              Quote Requests
            </h2>
            <p className="text-gray-600 mt-1 text-xs sm:text-sm">
              Manage customer quote requests and follow-ups
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span className="font-semibold">{messages.length}</span>
            <span>Total Requests</span>
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No quote requests yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Quote requests from customers will appear here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="hidden lg:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submit Date
                </th>
                <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message, index) => (
                <tr
                  key={message.id}
                  className={`transition-colors ${
                    message.isCalled ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  {/* No */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium">
                    {index + 1}
                  </td>

                  {/* Image */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
                      {message.productImage ? (
                        <Image
                          src={message.productImage}
                          alt={message.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-[10px] sm:text-xs">
                          No image
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Product */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 font-medium max-w-[100px] sm:max-w-xs">
                    <div className="truncate">{message.productName}</div>
                  </td>

                  {/* ID */}
                  <td className="hidden lg:table-cell px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-mono">
                    {message.productId.length > 12
                      ? `${message.productId.substring(0, 12)}...`
                      : message.productId}
                  </td>

                  {/* Customer Name */}
                  <td className="hidden md:table-cell px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {message.customerName}
                  </td>

                  {/* Phone */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <a
                      href={`tel:${message.phoneNumber}`}
                      className="text-brand-primary hover:underline font-medium"
                    >
                      {message.phoneNumber}
                    </a>
                  </td>

                  {/* Submit Date */}
                  <td className="hidden sm:table-cell px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {formatDate(message.createdAt)}
                  </td>

                  {/* Status */}
                  <td className="hidden md:table-cell px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    {message.isCalled ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Called
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 sm:w-48">
                        <DropdownMenuItem
                          onClick={() => handleToggleCalled(message)}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          {message.isCalled
                            ? "Mark as Pending"
                            : "Mark as Called"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteId(message.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quote request? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
