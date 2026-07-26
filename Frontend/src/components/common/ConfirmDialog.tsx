"use client";

import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  isDestructive = true,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-md">
      <div className="flex items-start space-x-4 mb-6">
        <div className={`p-3 rounded-full ${isDestructive ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"} shrink-0`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50 ${
            isDestructive
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-red-200"
              : "bg-accent hover:bg-accent/90 focus:ring-accent shadow-emerald-200"
          }`}
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};
