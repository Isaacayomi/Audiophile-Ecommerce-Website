"use client";

import {
  MotionConfig,
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { ReactNode } from "react";

// One shared cadence keeps the interface feeling musical instead of random.
const RHYTHM = {
  duration: 0.56,
  stagger: 0.11,
  delay: 0.07,
  ease: [0.16, 1, 0.3, 1] as const,
};

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: RHYTHM.stagger,
      delayChildren: RHYTHM.delay,
    },
  },
};

const itemVariants: Record<"rise" | "soft" | "pop", Variants> = {
  rise: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: RHYTHM.duration, ease: RHYTHM.ease },
    },
  },
  soft: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: RHYTHM.duration, ease: RHYTHM.ease },
    },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: RHYTHM.duration, ease: RHYTHM.ease },
    },
  },
};

type RhythmGroupProps = {
  children: ReactNode;
  className?: string;
  inView?: boolean;
} & HTMLMotionProps<"div">;

export const RhythmProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export const RhythmGroup = ({
  children,
  className,
  inView = true,
  ...props
}: RhythmGroupProps) => {
  const animationProps = inView
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.18 },
      }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const RhythmItem = ({
  children,
  className,
  variant = "rise",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof itemVariants;
} & HTMLMotionProps<"div">) => {
  return (
    <motion.div className={className} variants={itemVariants[variant]} {...props}>
      {children}
    </motion.div>
  );
};

export const RhythmListItem = ({
  children,
  className,
  variant = "rise",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof itemVariants;
} & HTMLMotionProps<"li">) => {
  return (
    <motion.li className={className} variants={itemVariants[variant]} {...props}>
      {children}
    </motion.li>
  );
};
