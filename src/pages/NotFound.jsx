import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles, AlertTriangle, Compass } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Page Not Found | vyapai.in";
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans antialiased flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Bar / Header */}
      <header className="w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
            <Sparkles className="h-6 w-6 text-emerald-400" />
            <span>vyapai<span className="text-white">.in</span></span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
            <div className="relative h-24 w-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
              <AlertTriangle className="h-12 w-12 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Error 404
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Page Not Found
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              The page you are looking for doesn't exist or has been moved. Explore our MSME digital growth packages below or head back to the main page.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
            >
              <ArrowLeft className="h-4 w-4" /> Go to Homepage
            </Link>
            <a
              href="https://wa.me/917388833006?text=Hi%20vyapai.in,%20I%20came%20across%20a%20missing%20page%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 font-semibold text-sm hover:bg-slate-800 hover:text-white transition"
            >
              <Compass className="h-4 w-4 text-emerald-400" /> Contact Support
            </a>
          </div>

          {/* Quick links to popular service pages */}
          <div className="pt-8 border-t border-slate-800/80 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Popular Services
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/services/TechSwarajPack"
                className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              >
                🌱 Swaraj Tech Pack @ ₹89
              </Link>
              <Link
                to="/services/KickStartPack"
                className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              >
                🚀 Prarambh Pack @ ₹499
              </Link>
              <Link
                to="/services/TezRaftarBooster"
                className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              >
                ⚡ Raftar Booster @ ₹1899
              </Link>
              <Link
                to="/services/WhatsAppBusinessBot"
                className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              >
                💬 WhatsApp Bot Setup
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} vyapai.in | Sudarshan AI Labs Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
