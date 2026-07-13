import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollTransitions({ children, className = "", offset = ["start end", "end start"] }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll position of the element relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset
  });

  // Create smooth animation values based on scroll progress
  // Opacity: fade in as it enters, stays solid in middle, fades out as it leaves
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.1, 1, 1, 0.1]);

  // Scale: grow slightly as it enters, shrink as it leaves
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.93, 1, 1, 0.93]);

  // Translate Y: parallax slide effect
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Apply spring filter for buttery-smooth movements
  const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 80 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
