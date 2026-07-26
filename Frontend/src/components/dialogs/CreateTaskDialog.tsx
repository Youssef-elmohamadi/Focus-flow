"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../common/Modal";

const CreateTaskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  body: z
    .string()
    .min(5, "Body must be at least 5 characters")
    .max(1000, "Body must be at most 1000 characters"),
});

type CreateTaskFormValues = z.infer<typeof CreateTaskFormSchema>;

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { title: string; body: string }) => Promise<void>;
}

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(CreateTaskFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const titleValue = watch("title") || "";
  const bodyValue = watch("body") || "";

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleFormSubmit = async (data: CreateTaskFormValues) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New task" className="max-w-lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* Title Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Title <span className="text-accent">*</span>
            </label>
            <span
              className={`text-xs ${
                titleValue.length > 100 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {titleValue.length}/100
            </span>
          </div>
          <input
            id="title"
            type="text"
            placeholder="e.g. Review pull request"
            {...register("title")}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white transition-all text-sm outline-none focus:ring-2 ${
              errors.title
                ? "border-red-300 focus:border-red-400 focus:ring-red-500/20"
                : "border-gray-200 focus:border-accent focus:ring-accent/20"
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Body Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="body" className="text-sm font-semibold text-gray-700">
              Body <span className="text-accent">*</span>
            </label>
            <span
              className={`text-xs ${
                bodyValue.length > 1000 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {bodyValue.length}/1000
            </span>
          </div>
          <textarea
            id="body"
            placeholder="Describe what needs to be done..."
            rows={4}
            {...register("body")}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white transition-all text-sm outline-none focus:ring-2 resize-none ${
              errors.body
                ? "border-red-300 focus:border-red-400 focus:ring-red-500/20"
                : "border-gray-200 focus:border-accent focus:ring-accent/20"
            }`}
          />
          {errors.body && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.body.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-emerald-500 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:hover:bg-accent disabled:shadow-none"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            Create task
          </button>
        </div>
      </form>
    </Modal>
  );
};
