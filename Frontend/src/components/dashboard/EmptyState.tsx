"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onAddTask?: () => void;
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddTask,
  title = "No tasks found here",
  description = "You're all caught up! Add a new task to stay productive and keep your workflow flowing.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-md rounded-2xl border border-dashed border-gray-300/80 shadow-xs text-center my-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50/80 text-accent flex items-center justify-center mb-4 shadow-inner border border-emerald-100/50">
        <ClipboardList className="w-8 h-8 stroke-[1.5]" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-md mt-1.5 leading-relaxed">
        {description}
      </p>

      {onAddTask && (
        <button
          type="button"
          onClick={onAddTask}
          className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Task</span>
        </button>
      )}
    </motion.div>
  );
};
