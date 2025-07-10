// components/ui/animated-logo.tsx
"use client";

import { motion } from "framer-motion";
import { Code, Sparkles } from "lucide-react";

interface AnimatedLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AnimatedLogo = ({
  name,
  size = "md",
  className = "",
}: AnimatedLogoProps) => {
  const sizeConfig = {
    sm: { icon: 24, text: "text-lg", container: "w-8 h-8" },
    md: { icon: 32, text: "text-xl", container: "w-10 h-10" },
    lg: { icon: 40, text: "text-2xl", container: "w-12 h-12" },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-3 cursor-pointer group ${className}`}
    >
      {/* Animated Icon Container */}
      <div className="relative">
        <motion.div
          className={`
            ${config.container} rounded-xl flex items-center justify-center
            bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
            group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400
            transition-all duration-500 relative overflow-hidden
          `}
        >
          {/* Animated background layers */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-50 rounded-xl"
          />

          <motion.div
            animate={{
              rotate: -360,
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity },
            }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 opacity-30 rounded-xl"
          />

          {/* Main Icon */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Code
              size={config.icon * 0.6}
              className="text-white drop-shadow-lg"
            />
          </motion.div>

          {/* Sparkle Effects */}
          <motion.div
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles size={8} className="text-white" />
          </motion.div>

          <motion.div
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.5,
            }}
            className="absolute -bottom-1 -left-1"
          >
            <Sparkles size={6} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated Text */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col"
      >
        <motion.span
          className={`
            font-bold ${config.text} 
            text-gray-900 dark:text-white 
            group-hover:text-transparent group-hover:bg-clip-text 
            group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500
            transition-all duration-500
          `}
        >
          {name}
        </motion.span>

        <motion.div
          className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
