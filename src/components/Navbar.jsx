import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <nav className="px-4 sm:px-6 py-3 flex items-center gap-3 max-w-5xl mx-auto w-full">
        <Link 
          to="/" 
          className="flex items-center gap-2.5 mr-auto group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-lg p-1"
          aria-label="Raze Homepage"
        >
          <img 
            src="/logo.svg" 
            alt="Raze" 
            className="w-7 h-7 rounded-lg transition-transform group-hover:scale-105 shadow-xs" 
          />
          <span className="font-bold text-slate-900 text-sm tracking-wide group-hover:text-indigo-600 transition-colors">
            Raze
          </span>
        </Link>
        
        <a 
          href="#exam-guides" 
          onClick={(e) => { e.preventDefault(); }}
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-2.5 py-1 font-medium"
        >
          Exam guides
        </a>
        
        <a 
          href="#signin" 
          onClick={(e) => { e.preventDefault(); }}
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-2.5 py-1 font-medium"
        >
          Sign in
        </a>
        
        <a 
          href="#pricing" 
          onClick={(e) => { e.preventDefault(); }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 transition-all rounded-full px-3 py-1 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Pro →
        </a>
      </nav>
    </header>
  );
}
