import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Move, Eye, Layers, Settings, Maximize2 } from 'lucide-react';

export default function FigmaCanvas() {
  const constraintsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Layer list representing MSME components
  const [layers, setLayers] = useState([
    {
      id: 'layer-1',
      name: 'Directory_Card',
      title: 'Local Business Directory 🌐',
      description: "India's AI directory. List MSMEs free, boost Google Maps, and rank higher locally.",
      x: 40,
      y: 60,
      width: 320,
      color: '#EA6113', // Orange
      icon: '🏪',
    },
    {
      id: 'layer-2',
      name: 'WhatsApp_Bot_Pro',
      title: 'WhatsApp Automation 💬',
      description: 'Auto-replies, product catalogs, and campaigns starting at just ₹129 setup.',
      x: 390,
      y: 120,
      width: 300,
      color: '#34d399', // Green
      icon: '🤖',
    },
    {
      id: 'layer-3',
      name: 'GMB_Verification_Module',
      title: 'Google My Business (GMB) 🔗',
      description: 'Verified Map listings and local keyword optimizations to drive local traffic.',
      x: 100,
      y: 280,
      width: 310,
      color: '#38bdf8', // Blue
      icon: '🗺️',
    },
  ]);

  const [activeLayerId, setActiveLayerId] = useState('layer-1');
  const [hoveredLayerId, setHoveredLayerId] = useState(null);

  // Drag coordinates map
  const [coords, setCoords] = useState({});

  const handleDrag = (id, info) => {
    // Round to keep it pixel-perfect like Figma
    const newX = Math.round(info.point.x);
    const newY = Math.round(info.point.y);
    setCoords(prev => ({
      ...prev,
      [id]: { x: newX, y: newY }
    }));
  };

  const selectLayer = (id) => {
    setActiveLayerId(id);
  };

  return (
    <section id="figma-canvas" className="relative py-16 px-4 md:px-8 border-t border-white/10 bg-[#070A13]">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-white/[0.04] px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-purple-200/90 mb-4">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span>Design-First Vyapari Canvas</span>
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Interactive Figma-Inspired Workspace
          </h2>
          <p className="text-white/60 text-sm md:text-base mt-2 max-w-2xl">
            Click, drag, and explore the modular components of our AI Growth Stack. Just like Figma, highlight layers to inspect their coordinates and properties.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] bg-[#0c101d] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Left Panel: Figma Layers */}
          <div className="border-b lg:border-b-0 lg:border-r border-white/10 bg-[#090d16] p-4 flex flex-col gap-4 select-none">
            <div className="flex items-center justify-between text-xs font-bold tracking-wider text-white/50 uppercase pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> Layers</span>
              <span className="text-[10px]">Canvas v3</span>
            </div>
            
            <div className="flex flex-col gap-1">
              {layers.map(layer => {
                const isActive = activeLayerId === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => selectLayer(layer.id)}
                    onMouseEnter={() => setHoveredLayerId(layer.id)}
                    onMouseLeave={() => setHoveredLayerId(null)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono text-left transition ${
                      isActive 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span style={{ color: layer.color }}>◆</span>
                      {layer.name}
                    </span>
                    <span className="text-[9px] opacity-40">FRAME</span>
                  </button>
                );
              })}
            </div>

            {/* Properties Panel Simulator */}
            <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
              <div className="text-[10px] font-bold tracking-wider text-white/40 uppercase">Properties</div>
              {layers.map(layer => {
                if (activeLayerId !== layer.id) return null;
                const currentCoord = coords[layer.id] || { x: layer.x, y: layer.y };
                return (
                  <div key={layer.id} className="space-y-2 text-xs font-mono text-white/75 bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between">
                      <span className="text-white/40">X Coordinate</span>
                      <span className="text-purple-400">{currentCoord.x}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Y Coordinate</span>
                      <span className="text-purple-400">{currentCoord.y}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Scale</span>
                      <span>100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Visible</span>
                      <span className="text-emerald-400 flex items-center gap-1"><Eye className="h-3 w-3" /> True</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Infinite Grid Canvas */}
          <div 
            ref={constraintsRef}
            className="relative h-[480px] bg-[#0A0D15] overflow-hidden cursor-crosshair"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Canvas Coordinates HUD Overlay */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-4 text-[10px] font-mono text-white/60">
              <span className="flex items-center gap-1"><Settings className="h-3 w-3" /> Mode: Inspect</span>
              <span>Grid: 20px</span>
            </div>

            {/* Draggable layers mapping */}
            {layers.map(layer => {
              const isActive = activeLayerId === layer.id;
              const isHovered = hoveredLayerId === layer.id;
              const currentCoord = coords[layer.id] || { x: layer.x, y: layer.y };

              return (
                <motion.div
                  key={layer.id}
                  drag={!shouldReduceMotion}
                  dragConstraints={constraintsRef}
                  dragElastic={0.05}
                  dragMomentum={false}
                  onDragStart={() => selectLayer(layer.id)}
                  onDrag={(e, info) => handleDrag(layer.id, info)}
                  onClick={() => selectLayer(layer.id)}
                  onMouseEnter={() => setHoveredLayerId(layer.id)}
                  onMouseLeave={() => setHoveredLayerId(null)}
                  style={{
                    x: layer.x,
                    y: layer.y,
                    width: layer.width,
                  }}
                  className={`absolute p-5 rounded-2xl bg-slate-950/90 border select-none cursor-grab active:cursor-grabbing shadow-lg backdrop-blur-xs group transition-colors duration-200 ${
                    isActive 
                      ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                      : isHovered 
                        ? 'border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.1)]'
                        : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Coordinate tag indicator */}
                  {(isActive || isHovered) && (
                    <div 
                      className="absolute -top-6 left-0 bg-purple-500 text-black text-[9px] font-bold font-mono px-2 py-0.5 rounded-t-md flex items-center gap-1 shadow-sm select-none"
                    >
                      <span>{layer.name}</span>
                      <span className="opacity-60">{currentCoord.x}, {currentCoord.y}</span>
                    </div>
                  )}

                  {/* Layer bounding border line handles for Figma design feel */}
                  {isActive && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white border border-purple-600 rounded-sm" />
                      <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 bg-white border border-purple-600 rounded-sm" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 bg-white border border-purple-600 rounded-sm" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 bg-white border border-purple-600 rounded-sm" />
                    </>
                  )}

                  {/* Card Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{layer.icon}</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="h-2 w-2 rounded-full" 
                          style={{ backgroundColor: layer.color }} 
                        />
                        <span className="text-[10px] font-mono text-white/40 tracking-wider">
                          {layer.id.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white font-sans">
                        {layer.title}
                      </h4>
                      <p className="text-white/60 text-xs mt-1 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-white/50 font-mono">
                      <span className="flex items-center gap-1">
                        <Move className="h-3 w-3 opacity-60" /> Drag to arrange
                      </span>
                      <span className="group-hover:text-purple-400 transition">
                        Active Layer
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tip for Mobile / Touch screens */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40 font-mono">
          <Maximize2 className="h-3.5 w-3.5" />
          <span>Note: Dragging is optimized for screens, on mobile tap layers in list to inspect.</span>
        </div>

      </div>
    </section>
  );
}
