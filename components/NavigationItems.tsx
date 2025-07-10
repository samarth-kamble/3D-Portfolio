// components/ui/navigation-items.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

interface NavigationItemsProps {
  items: NavigationItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const NavigationItems = ({
  items,
  activeSection,
  onSectionChange,
  orientation = "horizontal",
  className = "",
}: NavigationItemsProps) => {
  const containerClass =
    orientation === "horizontal"
      ? "flex items-center space-x-1"
      : "flex flex-col space-y-1";

  return (
    <div className={`${containerClass} ${className}`}>
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;

        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.02,
              y: orientation === "horizontal" ? -2 : 0,
              x: orientation === "vertical" ? 4 : 0,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange(item.id)}
            className={`
              relative group px-4 py-2.5 rounded-xl font-medium transition-all duration-300
              ${orientation === "vertical" ? "w-full justify-start" : ""}
              ${
                isActive
                  ? "text-white dark:text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }
            `}
          >
            {/* Active background with gradient */}
            {isActive && (
              <motion.div
                layoutId={`activeTab-${orientation}`}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {/* Hover background */}
            <motion.div
              className="absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: isActive ? 0 : 1 }}
            />

            {/* Animated glow effect for active item */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Content */}
            <motion.span
              className={`
                relative z-10 flex items-center space-x-2
                ${orientation === "vertical" ? "w-full" : ""}
              `}
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={
                  isActive
                    ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconComponent size={18} />
              </motion.div>
              <span>{item.label}</span>
            </motion.span>

            {/* Particle effects for active item */}
            {isActive && (
              <>
                <motion.div
                  className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
