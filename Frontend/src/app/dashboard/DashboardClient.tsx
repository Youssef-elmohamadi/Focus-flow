"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { AddTaskButton } from "@/components/dashboard/AddTaskButton";
import { TaskTabs } from "@/components/dashboard/TaskTabs";
import { TaskList } from "@/components/dashboard/TaskList";
import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { EditTaskDialog } from "@/components/dialogs/EditTaskDialog";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";

export function DashboardClient() {
  const {
    tasks,
    loading,
    filter,
    setFilter,
    counts,
    create,
    update,
    remove,
    toggleExecuted,
  } = useTasks();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Edit State
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenEdit = (task: Task) => {
    setEditTask(task);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-dotted bg-gray-50/50">
      <DashboardHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <ProgressCard completed={counts.completed} total={counts.total} />

        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm space-y-6">
          <AddTaskButton onClick={() => setIsCreateOpen(true)} />

          <TaskTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={{ all: counts.total, active: counts.total - counts.completed, done: counts.completed }}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onToggleExecute={toggleExecuted}
            onAddTask={() => setIsCreateOpen(true)}
          />
        </div>
      </main>

      {/* Dialogs */}
      <CreateTaskDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={create}
      />

      <EditTaskDialog
        isOpen={isEditOpen}
        task={editTask}
        onClose={() => {
          setIsEditOpen(false);
          setEditTask(null);
        }}
        onSubmit={update}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
