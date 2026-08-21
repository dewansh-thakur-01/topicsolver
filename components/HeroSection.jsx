'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, MessageSquare, Zap, Lightbulb, Heart, Flame } from 'lucide-react';
import { soundManager } from '@/lib/soundEffects';

export default function HeroSection({ onOpenModal, totalCount, stats }) {
  return (
    <section className="relative z-10 pt-12 pb-8 px-4 max-w-6xl mx-auto text-center">
      {/* Top Cyberpunk Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)] mb-6"
      >
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>CYBERPUNK FEEDBACK WALL &bull; REALTIME 3D FEED</span>
      </motion.div>

      {/* Main Glowing Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-none"
      >
        Drop Your Thoughts <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,243,255,0.4)]">
          in 3D Space
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8"
      >
        Leave your mark on the global cyberpunk feedback wall. Submit your features, ideas, feedback, or shoutouts with real-time 3D tilt cards & neon aesthetics.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-wrap justify-center items-center gap-4 mb-12"
      >
        <button
          onClick={() => {
            soundManager.playCategorySound();
            onOpenModal();
          }}
          className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 transition-all duration-300 shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:shadow-[0_0_35px_rgba(0,243,255,0.8)] active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          <span>Post Your Thought</span>
          <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/40 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </button>

        <a
          href="#thoughts-feed"
          onClick={() => soundManager.playHoverSound()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-cyan-300 bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-cyan-950/30 transition-all duration-300 backdrop-blur-md cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <span>Explore Live Grid ({totalCount})</span>
        </a>
      </motion.div>

      {/* Live Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto"
      >
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-left transition-all duration-300 hover:border-cyan-500/30">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Zap className="w-3.5 h-3.5" /> 🚀 Features
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stats['🚀 Feature'] || 0}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-left transition-all duration-300 hover:border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
            <Lightbulb className="w-3.5 h-3.5" /> 💡 Ideas
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stats['💡 Idea'] || 0}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-left transition-all duration-300 hover:border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-1">
            <MessageSquare className="w-3.5 h-3.5" /> 💬 Feedback
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stats['💬 Feedback'] || 0}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-left transition-all duration-300 hover:border-pink-500/30">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-mono mb-1">
            <Heart className="w-3.5 h-3.5" /> ❤️ Shoutouts
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stats['❤️ Shoutout'] || 0}</div>
        </div>
      </motion.div>
    </section>
  );
}
