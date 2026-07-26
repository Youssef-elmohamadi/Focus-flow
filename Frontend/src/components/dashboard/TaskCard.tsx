"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, Edit3, Trash2, Calendar, Clock, MoreVertical, CheckCircle2, Circle } from "lucide-react";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleExecute: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleExecute,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), "MMM d, yyyy • h:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: task.isExecuted ? 0.75 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 border transition-all shadow-sm hover:shadow-md",
        task.isExecuted
          ? "border-emerald-200/50 bg-emerald-50/20"
          : "border-gray-200/70 hover:border-emerald-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Status circle & Title */}
        <div className="flex items-start space-x-3.5 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onToggleExecute(task.id)}
            className={cn(
              "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-accent/50",
              task.isExecuted
                ? "bg-accent text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-600"
                : "border-2 border-gray-300 text-transparent hover:border-accent hover:text-accent/40 bg-white"
            )}
            aria-label={task.isExecuted ? "Mark as uncompleted" : "Mark as completed"}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                "text-base font-semibold tracking-tight transition-colors break-words",
                task.isExecuted ? "line-through text-gray-400" : "text-gray-900 group-hover:text-emerald-800"
              )}
            >
              {task.title}
            </h4>

            <p
              className={cn(
                "text-sm mt-1 leading-relaxed break-words whitespace-pre-wrap transition-opacity",
                task.isExecuted ? "text-gray-400 opacity-80" : "text-gray-600"
              )}
            >
              {task.body}
            </p>

            {/* Dates */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-gray-100/80 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Created: {formatDate(task.createdAt)}
              </span>
              {task.updatedAt && (
                <span className="flex items-center gap-1 text-emerald-600/80">
                  <Clock className="w-3.5 h-3.5" />
                  Updated: {formatDate(task.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative shrink-0 flex items-center space-x-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
