// components/Navbar.tsx
'use client';

import React, { useState, useEffect } from "react";
import { Menu, X, User, Mail, Code, Briefcase, Home, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Types
interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface NameLogoProps {
  name?: string;
}

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (itemName: string) => void;
  index: number;
}

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined);

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme}>
          {children}
        </div>
      </ThemeContext.Provider>
  );
};

// Name Logo Component
const NameLogo: React.FC<NameLogoProps> = ({ name = "Alex Smith" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
      <Link href="/" className="block">
        <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:from-purple-300 hover:to-purple-700">
              {name}
            </h1>
            {/* Animated underline */}
            <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ${
                    isHovered ? 'w-full' : 'w-0'
                }`}
            />
            {/* Glow effect */}
            <div
                className={`absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 blur-md transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </div>
        </div>
      </Link>
  );
};

// Theme Toggle Component
const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
      <button
          onClick={onToggle}
          className="relative p-2 rounded-xl bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg"
      >
        <div className="relative w-5 h-5">
          <Sun className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
              theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} />
          <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
              theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} />
        </div>
      </button>
  );
};

// Navigation Item Component
const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick, index }) => {
  const Icon = item.icon;

  return (
      <Link href={item.href}>
        <button
            onClick={() => onClick(item.name)}
            className={`relative font-medium transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-xl group backdrop-blur-md border shadow-lg ${
                isActive
                    ? 'text-purple-600 dark:text-purple-400 bg-white/20 dark:bg-white/10 border-white/30 dark:border-white/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/10 dark:hover:bg-white/5 border-transparent hover:border-white/20 dark:hover:border-white/10'
            }`}
            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
        >
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm">{item.name}</span>
          {/* Glassmorphism active indicator */}
          {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl blur-sm" />
          )}
        </button>
      </Link>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

  useEffect(() => {
    // Set active section based on pathname
    const currentPath = pathname.split('/')[1] || 'home';
    setActiveSection(currentPath);
  }, [pathname]);

  const navItems: NavItem[] = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'About', icon: User, href: '/about' },
    { name: 'Projects', icon: Briefcase, href: '/projects' },
    { name: 'Skills', icon: Code, href: '/skills' },
    { name: 'Contact', icon: Mail, href: '/contact' }
  ];

  const handleNavClick = (itemName: string) => {
    setActiveSection(itemName.toLowerCase());
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
      <ThemeProvider>
        <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
          {/* Glassmorphism container */}
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 px-4 py-2">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <NameLogo name="Alex Smith" />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                    <NavItem
                        key={item.name}
                        item={item}
                        isActive={activeSection === item.name.toLowerCase()}
                        onClick={handleNavClick}
                        index={index}
                    />
                ))}
              </div>

              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-3">
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
                <Link href="/contact">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-700/80 hover:from-purple-600/90 hover:to-purple-800/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm backdrop-blur-md border border-white/20">
                    Hire Me
                  </button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden mt-3 pt-3 border-t border-white/20 dark:border-white/10">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                        <NavItem
                            key={item.name}
                            item={item}
                            isActive={activeSection === item.name.toLowerCase()}
                            onClick={handleNavClick}
                            index={index}
                        />
                    ))}
                    <div className="pt-3 mt-3 border-t border-white/20 dark:border-white/10">
                      <Link href="/contact">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-700/80 text-white font-semibold rounded-xl shadow-lg text-sm backdrop-blur-md border border-white/20">
                          Hire Me
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </nav>
      </ThemeProvider>
  );
};

export default Navbar;