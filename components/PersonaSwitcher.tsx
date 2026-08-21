'use client';

import React from 'react';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { Sparkles, Zap, TrendingUp, Compass } from 'lucide-react';

export const PersonaSwitcher: React.FC = () => {
  const { profile, setPersona } = useTopicSolverStore();

  const personas = [
    {
      id: 'strong' as const,
      label: 'Kailash (Advanced)',
      subtitle: 'Advanced • Skips Basics • Hard Challenges',
      icon: Zap,
      color: 'text-emerald-800 bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500'
    },
    {
      id: 'developing' as const,
      label: 'Kailash (Intermediate)',
      subtitle: 'Intermediate • Targeted Reinforcement',
      icon: TrendingUp,
      color: 'text-amber-800 bg-amber-50 border-amber-300 ring-2 ring-amber-400 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-500'
    },
    {
      id: 'beginner' as const,
      label: 'Kailash (Beginner)',
      subtitle: 'Beginner • Step-by-Step Foundations',
      icon: Compass,
      color: 'text-[#2B6FF3] bg-[#2B6FF3]/10 border-[#2B6FF3]/30 ring-2 ring-[#2B6FF3] dark:text-[#60A5FA] dark:bg-[#3B82F6]/20 dark:border-[#3B82F6]'
    }
  ];

  return (
    <div className="rounded-2xl border border-[#DCE5F2] bg-white p-4 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2B6FF3] shadow-sm shadow-[#2B6FF3]/25 dark:bg-[#3B82F6]">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#16191D] tracking-tight dark:text-white">
                Live Demo: Adaptive Persona Switcher
              </span>
              <span className="rounded-full bg-[#2B6FF3]/10 px-2 py-0.5 text-[10px] font-bold text-[#2B6FF3] font-mono border border-[#2B6FF3]/20 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/30">
                Real-Time Adaptation
              </span>
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
              Switch personas to observe how TOPIC SOLVER dynamically recalibrates starting level, recommendations, and problem difficulty.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = profile.personaType === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`flex items-center space-x-2 rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all ${
                  isSelected
                    ? p.color
                    : 'bg-[#F7F9FC] text-[#687385] border-[#DCE5F2] hover:text-[#16191D] hover:bg-white hover:border-[#2B6FF3] dark:bg-[#0E121C] dark:text-[#94A3B8] dark:border-[#222B3D] dark:hover:text-white dark:hover:bg-[#1E2538]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <div className="text-left">
                  <div className="font-bold leading-none">{p.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
