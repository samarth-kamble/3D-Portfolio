// components/portfolio-navbar.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Home, User, Briefcase, Mail, Code } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { AnimatedLogo } from "./AnimatedLogo";
import { LoadingScreen } from "./LoadingScreen";
import { NavigationItems } from "./NavigationItems";
import { MobileMenu } from "./MobileMenu";

interface PortfolioNavbarProps {
  name?: string;
  loadingDuration?: number;
}

export const PortfolioNavbar = ({
  name = "Samarth Kamble",
  loadingDuration = 4000,
}: PortfolioNavbarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 0.88]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navY = useTransform(scrollY, [0, 100], [0, -2]);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Section detection based on scroll (you can customize this)
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen
        duration={loadingDuration}
        onComplete={handleLoadingComplete}
        title="Welcome"
        subtitle="Crafting Digital Excellence"
      />
    );
  }

  return (
    <motion.div
      style={{ opacity: navOpacity, scale: navScale, y: navY }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="max-w-7xl mx-auto"
      >
        <div
          className="
          relative overflow-hidden rounded-2xl py-4 px-6
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50
          shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20
          transition-all duration-500 ease-out
        "
        >
          {/* Interactive background gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
            }}
          />

          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `conic-gradient(from ${mousePosition.x}deg at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(59, 130, 246, 0.1) 0deg, 
                rgba(168, 85, 247, 0.1) 120deg, 
                rgba(236, 72, 153, 0.1) 240deg, 
                rgba(59, 130, 246, 0.1) 360deg)`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <AnimatedLogo name={name} size="md" className="flex-shrink-0" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <NavigationItems
                items={navItems}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                orientation="horizontal"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <ThemeToggle size={20} />
              <MobileMenu
                items={navItems}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>

          {/* Bottom glow effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.nav>
    </motion.div>
  );
};
