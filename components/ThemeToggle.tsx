// components/ui/theme-toggle.tsx
"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  size?: number;
  className?: string;
}

export const ThemeToggle = ({
  size = 20,
  className = "",
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative group p-2.5 rounded-xl transition-all duration-500
        bg-gradient-to-br from-amber-100 to-orange-100 dark:from-indigo-900 dark:to-purple-900
        border border-amber-200 dark:border-indigo-700
        hover:shadow-lg hover:shadow-amber-200/25 dark:hover:shadow-purple-500/25
        ${className}
      `}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-200 to-orange-200 dark:from-indigo-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative"
        >
          {theme === "dark" ? (
            <div className="relative">
              <Sun
                size={size}
                className="text-amber-500 group-hover:text-amber-400 transition-colors duration-300"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-amber-400/20 blur-sm"
              />
            </div>
          ) : (
            <div className="relative">
              <Moon
                size={size}
                className="text-indigo-600 group-hover:text-indigo-500 transition-colors duration-300"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-indigo-500/20 blur-sm"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <Sparkles size={12} className="text-amber-400 dark:text-purple-400" />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap"
      >
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </motion.div>
    </motion.button>
  );
};
