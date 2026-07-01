import React from 'react';
import { ArrowLeft, Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-50 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand/Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-300">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-800">Sudarshan AI Labs</p>
            <p className="text-xs font-semibold text-slate-500">Lucknow • MSME Growth Engine</p>
          </div>
        </a>

        {/* Back Link */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all duration-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </a>

      </div>
    </header>
  );
};

export default Header;
