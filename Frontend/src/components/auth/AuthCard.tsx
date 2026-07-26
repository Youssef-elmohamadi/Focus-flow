"use client";

import { motion } from "framer-motion";
import { AuthTabs } from "./AuthTabs";
import { CheckCircle2 } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Light gray dotted background */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2 text-green-600">
            <CheckCircle2 size={32} strokeWidth={2.5} />
            <span className="text-2xl font-bold tracking-tight text-gray-900">FocusFlow</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        
        <AuthTabs />
        
        <div className="mt-2">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
