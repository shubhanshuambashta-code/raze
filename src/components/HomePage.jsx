import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import CardThumbnail from './CardThumbnail';
import { HOMEPAGE_LESSONS } from '../data/scenarios';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Hero Section */}
        <div className="mb-12 relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/50">
          {/* Delicate Pastel Constellation Mesh Background */}
          <svg 
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="hero-glow-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F0F9FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="500" cy="200" r="300" fill="url(#hero-glow-core)" />
            
            {/* Constellation nodes & links */}
            <g stroke="#CBD5E1" strokeWidth="1" opacity="0.7">
              <line x1="150" y1="120" x2="300" y2="80" />
              <line x1="300" y1="80" x2="450" y2="180" />
              <line x1="450" y1="180" x2="600" y2="110" />
              <line x1="600" y1="110" x2="850" y2="160" />
              <line x1="300" y1="80" x2="350" y2="280" />
              <line x1="350" y1="280" x2="520" y2="310" />
              <line x1="520" y1="310" x2="680" y2="240" />
              <line x1="680" y1="240" x2="850" y2="160" />
            </g>
            <g fill="#6366F1">
              <circle cx="150" cy="120" r="3.5" fill="#38BDF8" />
              <circle cx="300" cy="80" r="4.5" fill="#6366F1" />
              <circle cx="450" cy="180" r="3.5" fill="#A855F7" />
              <circle cx="600" cy="110" r="4.5" fill="#10B981" />
              <circle cx="850" cy="160" r="3.5" fill="#6366F1" />
              <circle cx="350" cy="280" r="3.5" fill="#F59E0B" />
              <circle cx="520" cy="310" r="4.5" fill="#38BDF8" />
              <circle cx="680" cy="240" r="3.5" fill="#EC4899" />
            </g>
          </svg>

          {/* Hero Content */}
          <div className="relative z-10 text-center py-12 px-4 sm:px-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4 bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-full border border-indigo-200/80 shadow-xs">
              🌐 Interactive · Visual · Start free
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
              How Networks Work
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Watch packets fly, inspect headers, and understand networking — from raw electrical signals to BGP routing, DDoS attacks, and Zero Trust.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Studying for an exam?{' '}
              <a href="#exam-netplus" onClick={(e) => e.preventDefault()} className="text-indigo-600 hover:text-indigo-800 transition-colors font-semibold">
                Network+
              </a>{' '}
              ·{' '}
              <a href="#exam-secplus" onClick={(e) => e.preventDefault()} className="text-indigo-600 hover:text-indigo-800 transition-colors font-semibold">
                Security+
              </a>{' '}
              ·{' '}
              <a href="#exam-ccna" onClick={(e) => e.preventDefault()} className="text-indigo-600 hover:text-indigo-800 transition-colors font-semibold">
                CCNA
              </a>
            </p>

            {/* Counts / stats */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 text-xs flex-wrap font-mono">
              <span className="bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-semibold">
                16 beginner
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                100 simple
              </span>
              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                146 medium
              </span>
              <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-semibold">
                63 complex
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Groups */}
        <div className="space-y-12">
          {/* Beginner — Start here */}
          <section aria-labelledby="beginner-heading">
            <h2 id="beginner-heading" className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center justify-between">
              <span>Beginner — Start here</span>
              <span className="text-xs text-slate-400 font-mono font-normal">Foundation Concepts</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOMEPAGE_LESSONS.beginner
                .filter((l) => !l.level.toLowerCase().includes('pro'))
                .map((lesson) => {
                const CardWrapper = lesson.isRoute ? Link : 'div';
                const wrapperProps = lesson.isRoute 
                  ? { to: lesson.href, 'aria-label': `${lesson.title} - ${lesson.level}` }
                  : { tabIndex: 0, role: 'article', 'aria-label': `${lesson.title} - ${lesson.level} (Placeholder)` };

                return (
                  <div key={lesson.slug} className="h-full">
                    <CardWrapper
                      {...wrapperProps}
                      className="block h-full rounded-xl border border-slate-200/90 bg-white transition-all duration-200 group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50"
                    >
                      <CardThumbnail
                        type={lesson.thumbType}
                        icon={lesson.icon}
                        level={lesson.level}
                        badgeColor={lesson.badgeColor}
                      />

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1.5 transition-colors group-hover:text-indigo-600 text-base">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>

                        {lesson.prereq && (
                          <p className="mt-3 text-[11px] text-slate-400 font-mono">
                            Prereq: <span className="text-slate-600 font-medium">{lesson.prereq}</span>
                          </p>
                        )}
                        {lesson.isRoute && (
                          <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-indigo-600 font-semibold group-hover:text-indigo-700">
                            <span>Open interactive simulator →</span>
                          </div>
                        )}
                      </div>
                    </CardWrapper>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Simple — Build on the basics */}
          <section aria-labelledby="simple-heading">
            <h2 id="simple-heading" className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center justify-between">
              <span>Simple — Build on the basics</span>
              <span className="text-xs text-slate-400 font-mono font-normal">Next Level</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOMEPAGE_LESSONS.simple
                .filter((l) => !l.level.toLowerCase().includes('pro'))
                .map((lesson) => {
                const CardWrapper = lesson.isRoute ? Link : 'div';
                const wrapperProps = lesson.isRoute 
                  ? { to: lesson.href, 'aria-label': `${lesson.title} - ${lesson.level}` }
                  : { tabIndex: 0, role: 'article', 'aria-label': `${lesson.title} - ${lesson.level} (Placeholder)` };

                return (
                  <div key={lesson.slug} className="h-full">
                    <CardWrapper
                      {...wrapperProps}
                      className="block h-full rounded-xl border border-slate-200/90 bg-white transition-all duration-200 group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50"
                    >
                      <CardThumbnail
                        type={lesson.thumbType}
                        icon={lesson.icon}
                        level={lesson.level}
                        badgeColor={lesson.badgeColor}
                      />

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1.5 transition-colors group-hover:text-indigo-600 text-base">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>

                        {lesson.prereq && (
                          <p className="mt-3 text-[11px] text-slate-400 font-mono">
                            Prereq: <span className="text-slate-600 font-medium">{lesson.prereq}</span>
                          </p>
                        )}
                        {lesson.isRoute && (
                          <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-indigo-600 font-semibold group-hover:text-indigo-700">
                            <span>Open interactive simulator →</span>
                          </div>
                        )}
                      </div>
                    </CardWrapper>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="w-5 h-5 rounded" />
            <span className="font-semibold text-slate-900">Raze</span>
            <span>— Interactive Network Simulator</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>325+ interactive simulations</span>
            <span>·</span>
            <span>Self-paced learning</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
