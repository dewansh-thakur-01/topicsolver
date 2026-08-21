'use client';

import React from 'react';
import { AITutorDrawer } from '@/components/AITutorDrawer';
import { Bot, Sparkles, Shield, Zap, Globe, Heart } from 'lucide-react';

export default function AITutorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <Bot className="h-3.5 w-3.5" />
          <span>Remote Learning Engagement Engine (AI Hackathon Prototype)</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI Personalized Learning & Low-Bandwidth Rural Engine
        </h1>

        <p className="text-xs text-slate-300 leading-relaxed">
          Students in remote and underserved areas often struggle with engagement due to a lack of interactive resources and high bandwidth requirements. Leatcode's AI Engine adapts content difficulty, provides instant code feedback, and enables &lt;50KB offline text/audio mode for rural learning access.
        </p>
      </div>

      {/* Main Drawer Component */}
      <AITutorDrawer />

      {/* Architecture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div className="rounded-xl border border-slate-800 bg-[#0E121B] p-5 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
            <Zap className="h-4 w-4" />
            <span>Low-Bandwidth Optimization</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strips heavy 1080p MP4 video streams into audio transcripts and lightweight markdown text blocks (&lt;50KB) designed for 2G/3G networks.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0E121B] p-5 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
            <Sparkles className="h-4 w-4" />
            <span>Adaptive Quiz & Difficulty Tuning</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Monitors real-time post-lesson MCQ assessment accuracy to recommend relevant LeetCode problems or prerequisite revision modules.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0E121B] p-5 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
            <Globe className="h-4 w-4" />
            <span>Accessible Education for Rural Areas</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mitigates the "one-size-fits-all" limitation of traditional remote education with tailored feedback and gamified streak ranks.
          </p>
        </div>

      </div>

    </div>
  );
}
