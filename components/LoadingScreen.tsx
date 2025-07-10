// components/ui/loading-screen.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface LoadingScreenProps {
  duration?: number;
  onComplete?: () => void;
  title?: string;
  subtitle?: string;
}

export const LoadingScreen = ({
  duration = 4000,
  onComplete,
  title = "Welcome",
  subtitle = "Crafting Digital Excellence",
}: LoadingScreenProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create enhanced particle systems
    const particleGroups: THREE.Points[] = [];

    // Main particle system
    const createParticleSystem = (
      count: number,
      color: THREE.Color,
      size: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];

      for (let i = 0; i < count; i++) {
        vertices.push(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        );

        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const material = new THREE.PointsMaterial({
        size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // Create multiple particle systems
    const systems = [
      { count: 2000, color: new THREE.Color(0.2, 0.6, 1), size: 0.1 },
      { count: 1500, color: new THREE.Color(0.8, 0.3, 1), size: 0.08 },
      { count: 1000, color: new THREE.Color(1, 0.4, 0.8), size: 0.06 },
    ];

    systems.forEach(({ count, color, size }) => {
      const points = createParticleSystem(count, color, size);
      scene.add(points);
      particleGroups.push(points);
    });

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      particleGroups.forEach((group, index) => {
        group.rotation.x += 0.0005 * (index + 1);
        group.rotation.y += 0.001 * (index + 1);
        group.rotation.z += 0.0003 * (index + 1);

        // Pulsing effect
        if (group.material instanceof THREE.PointsMaterial) {
          group.material.opacity = 0.4 + Math.sin(time * 2 + index) * 0.3;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900"
    >
      {/* Three.js Background */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{
              delay: i * 0.2,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative z-10 text-center"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
            >
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6 text-white">
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {title}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl mb-8 text-gray-300"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="relative"
        >
          <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 2.5,
                duration: duration / 1000 - 2.5,
                ease: "easeInOut",
              }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mt-4 text-sm text-gray-400"
          >
            Loading Portfolio...
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
