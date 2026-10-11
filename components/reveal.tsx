"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { useInDeskWindow } from "@/components/desktop/scroll-root";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewportOptions = { once: true, margin: "-80px" } as const;

/**
 * Fade + rise into view on scroll. Respects reduced-motion automatically via Framer.
 *
 * Inside the desktop window this renders plainly instead: scroll reveals cannot
 * be trusted there (the window is the scroller, and the dock jumps past
 * sections), so content must never depend on an observer firing to become
 * visible. The window has its own CSS entrance animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const inWindow = useInDeskWindow();

  if (inWindow) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its direct Reveal/motion children. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const inWindow = useInDeskWindow();

  if (inWindow) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      transition={{ staggerChildren: stagger }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const childVariants: Variants = variants;
