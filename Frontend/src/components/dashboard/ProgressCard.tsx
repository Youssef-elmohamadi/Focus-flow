"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp } from "lucide-react";

interface ProgressCardProps {
  completed: number;
  total: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  completed,
  total,
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-lg shadow-gray-200/50 transition-all hover:shadow-xl hover:shadow-gray-200/60"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-accent flex items-center justify-center border border-emerald-100/60 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 tracking-tight">
              Daily Progress
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {completed} of {total} {total === 1 ? "task" : "tasks"} completed
            </p>
          </div>
        </div>

        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {percentage}%
          </span>
          {percentage === 100 && total > 0 && (
            <span className="text-xs font-semibold text-accent flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <TrendingUp className="w-3 h-3" /> Done!
            </span>
          )}
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-emerald-500 rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};
