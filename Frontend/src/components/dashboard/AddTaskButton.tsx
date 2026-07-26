"use client";

import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddTaskButtonProps {
  onClick: () => void;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full flex items-center justify-start space-x-3 p-4 bg-white/40 backdrop-blur-sm border-2 border-dashed border-accent/40 rounded-2xl text-gray-500 hover:bg-white hover:border-accent hover:text-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 group shadow-sm hover:shadow-md"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
        <Plus className="w-5 h-5" />
      </div>
      <span className="font-medium text-sm">Add a new task...</span>
    </motion.button>
  );
};
