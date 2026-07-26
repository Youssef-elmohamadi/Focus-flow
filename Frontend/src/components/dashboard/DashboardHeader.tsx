"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { getUser, removeToken } from "@/lib/auth";
import { User } from "@/types/auth";

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [greeting, setGreeting] = useState<string>("Good morning");

  useEffect(() => {
    // Get user from cookie/localStorage
    const currentUser = getUser();
    if (currentUser) {
      setUserState(currentUser);
    }

    // Dynamic greeting based on hour
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    } else {
      router.push("/login");
    }
  };

  const username = user?.name || user?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold text-lg tracking-wider">
            FF
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
              FocusFlow
              <Sparkles className="w-4 h-4 text-accent fill-accent animate-pulse" />
            </span>
            <span className="text-xs text-gray-500 font-medium block -mt-1">
              Task Workspace
            </span>
          </div>
        </div>

        {/* Greeting & Logout */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {greeting}
            </p>
            <p className="text-sm font-semibold text-gray-800 tracking-tight">
              {username}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200/60 hover:border-red-200 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-red-500/20"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
