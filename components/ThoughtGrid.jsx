'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Layers, Sparkles, Inbox } from 'lucide-react';
import ThoughtCard from './ThoughtCard';
import { soundManager } from '@/lib/soundEffects';

const TABS = [
  { id: 'ALL', label: 'All Thoughts' },
  { id: '🚀 Feature', label: '🚀 Feature' },
  { id: '💡 Idea', label: '💡 Idea' },
  { id: '💬 Feedback', label: '💬 Feedback' },
  { id: '❤️ Shoutout', label: '❤️ Shoutout' },
];

export default function ThoughtGrid({ thoughts, onLikeThought }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  // Filter thoughts dynamically
  const filteredThoughts = useMemo(() => {
    return thoughts.filter((item) => {
      const matchesTab = activeTab === 'ALL' || item.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [thoughts, activeTab, searchQuery]);

  return (
    <section id="thoughts-feed" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
      {/* Controls Bar: Search & Category Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-xl shadow-xl">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count =
              tab.id === 'ALL'
                ? thoughts.length
                : thoughts.filter((t) => t.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playCategorySound();
                  setActiveTab(tab.id);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                    : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search thoughts or authors..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 p-0.5 rounded-md text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of 3D Tilt Cards */}
      {filteredThoughts.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredThoughts.map((thought) => (
              <ThoughtCard key={thought.id} thought={thought} onLike={onLikeThought} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-2xl bg-slate-950/40 border border-slate-800/80 backdrop-blur-xl text-center max-w-md mx-auto my-12"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Thoughts Found</h3>
          <p className="text-xs text-slate-400 font-mono mb-4">
            {searchQuery
              ? `No thoughts matched "${searchQuery}". Try a different keyword.`
              : 'Be the first pioneer to drop a thought in this category!'}
          </p>
        </motion.div>
      )}
    </section>
  );
}
