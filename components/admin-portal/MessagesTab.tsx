"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { ContactMessage } from "@/types";

export default function MessagesTab() {
  const [messages] = useState<ContactMessage[]>([]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center">
          <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No messages yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Messages from your contact form will appear here
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{message.name}</h3>
                  <p className="text-sm text-gray-500">{message.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(message.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
