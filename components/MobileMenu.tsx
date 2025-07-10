// components/ui/mobile-menu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavigationItems } from "./NavigationItems";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
}

interface MobileMenuProps {
  items: NavigationItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

export const MobileMenu = ({
  items,
  activeSection,
  onSectionChange,
  className = "",
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`md:hidden ${className}`}>
      {/* Menu Button */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          relative p-2.5 rounded-xl transition-all duration-300 group
          bg-gray-100 dark:bg-gray-800 
          hover:bg-gray-200 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-600
        "
      >
        {/* Button background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          {isOpen ? (
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu size={20} className="text-gray-700 dark:text-gray-200" />
          )}
        </motion.div>

        {/* Notification dot for active section */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        )}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="
              absolute top-full right-0 mt-2 w-72 z-50
              bg-white dark:bg-gray-900 
              border border-gray-200 dark:border-gray-700
              rounded-2xl shadow-2xl backdrop-blur-xl
              overflow-hidden
            "
          >
            {/* Menu header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Navigation
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {items.length} items
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Menu items */}
            <div className="py-4 px-2 max-h-96 overflow-y-auto">
              <NavigationItems
                items={items}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                orientation="vertical"
                className="space-y-1"
              />
            </div>

            {/* Menu footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Current:{" "}
                  {items.find((item) => item.id === activeSection)?.label}
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Animated background elements */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.05, 1, 1.05],
                opacity: [0.1, 0.05, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
