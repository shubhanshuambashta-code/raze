import React from 'react';
import { Link } from 'react-router-dom';

export default function SimulatorHeader({ scenario }) {
  return (
    <header className="border-b border-slate-200/90 px-4 sm:px-6 py-3 flex items-center gap-4 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-xs">
      <Link 
        to="/" 
        className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-semibold flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-2 py-1 hover:bg-slate-50"
        aria-label="Back to Homepage"
      >
        ← Back
      </Link>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xl select-none" role="img" aria-label={scenario.title}>
          {scenario.icon}
        </span>
        <h1 className="font-bold text-slate-900 truncate text-base sm:text-lg">
          {scenario.title}
        </h1>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200 select-none font-mono">
          {scenario.difficulty || 'Beginner'}
        </span>
      </div>
    </header>
  );
}
