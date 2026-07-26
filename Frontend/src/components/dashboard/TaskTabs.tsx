"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "done";

interface TaskTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    done: number;
  };
}

export const TaskTabs: React.FC<TaskTabsProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const tabs: { id: FilterType; label: string; count: number }[] = [
    { id: "all", label: "All Tasks", count: counts.all },
    { id: "active", label: "Active", count: counts.active },
    { id: "done", label: "Completed", count: counts.done },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-md p-1 rounded-2xl border border-gray-200/60 shadow-inner">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              "relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              isActive ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-700 hover:bg-white/40"
            )}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200/50 -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span>{tab.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 text-xs rounded-full font-semibold transition-colors",
                isActive
                  ? "bg-emerald-100/80 text-emerald-700"
                  : "bg-gray-200/70 text-gray-600"
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
