import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AmbientBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0A0E1A]">
      {/* Background Dot Matrix pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Fluid Mesh lines */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA6113" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7F00FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path 
          d="M-100,200 Q200,300 400,100 T900,400 T1400,200" 
          fill="none" 
          stroke="url(#grid-grad)" 
          strokeWidth="1.5" 
        />
        <path 
          d="M-50,400 Q300,100 600,500 T1200,300 T1600,600" 
          fill="none" 
          stroke="url(#grid-grad)" 
          strokeWidth="1" 
        />
      </svg>

      {/* Cursor tracking radial glow blob */}
      <motion.div
        className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.12)_0%,rgba(0,241,160,0.06)_40%,rgba(10,14,26,0)_70%)] blur-3xl"
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      {/* Secondary accent glow blobs */}
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#EA6113]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-[#00FFFF]/10 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
