"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productImage: string;
};

export default function RequestQuoteDialog({
  open,
  onClose,
  productId,
  productName,
  productImage,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim() || "Not provided",
          phoneNumber: phoneNumber.trim(),
          productId,
          productName,
          productImage,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Failed to submit quote request");
      }

      // Show appropriate message based on Telegram status
      if (result.ok) {
        toast.success("Quote request submitted! We'll contact you soon.");
      } else {
        toast.success(
          "Quote request saved! (Notification pending - we'll still contact you)"
        );
        console.warn("Telegram notification failed but request was saved");
      }

      setCustomerName("");
      setPhoneNumber("");
      onClose();
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-dark">
            Request a Quote
          </DialogTitle>
          <DialogDescription>
            Interested in <span className="font-semibold">{productName}</span>?
            Enter your details and we&apos;ll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phone" className="font-semibold">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="012 345 678"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="name" className="font-semibold">
              Your Name <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
              className="mt-1.5"
            />
          </div>
        </form>

        <DialogFooter className="border-t pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
