import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagnetButton({ children, className = "", onClick, href }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate the center point of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate proximity
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Proximity threshold (pull towards cursor within a certain distance)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance < 120) {
      setIsHovered(true);
      // Magnetic pull: pull button towards cursor by a fraction of the distance
      x.set(deltaX * 0.35);
      y.set(deltaY * 0.35);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative cursor-pointer transition-shadow duration-300 ${className} ${
        isHovered ? 'shadow-[0_0_30px_rgba(52,211,153,0.4)]' : ''
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover border glow expansions */}
      <span 
        className={`absolute inset-0 rounded-full border border-emerald-400/50 opacity-0 transition-all duration-300 pointer-events-none scale-100 ${
          isHovered ? 'opacity-100 scale-105 border-emerald-400' : ''
        }`}
      />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block w-full sm:w-auto" onClick={onClick}>
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
