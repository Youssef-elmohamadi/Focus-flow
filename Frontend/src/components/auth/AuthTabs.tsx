"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { name: "Sign In", path: "/login" },
  { name: "Sign Up", path: "/register" },
];

export const AuthTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full rounded-md bg-gray-100 p-1 mb-8">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`relative flex flex-1 items-center justify-center rounded py-2 text-sm font-medium transition-colors ${
              isActive ? "text-green-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
