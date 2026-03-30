"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export function Skeleton({ className = "", variant = "rect" }: SkeletonProps) {
  const baseClasses = "relative overflow-hidden bg-white/10";

  const variantClasses = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md h-4 w-full",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}
