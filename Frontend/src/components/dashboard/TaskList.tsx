"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleExecute: (id: string) => void;
  onAddTask?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggleExecute,
  onAddTask,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-32 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleExecute={onToggleExecute}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
