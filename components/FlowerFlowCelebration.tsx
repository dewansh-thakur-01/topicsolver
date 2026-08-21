'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

interface FlowerFlowCelebrationProps {
  show: boolean;
  onClose: () => void;
  completedTopicTitle: string;
  nextTopicId?: string | null;
  nextTopicTitle?: string | null;
  score?: { correct: number; total: number };
}

interface Petal {
  id: number;
  flower: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  rotation: number;
}

const FLOWERS = ['🌸', '🌺', '🌻', '🌷', '🌼', '🌹', '💐', '✨', '🍃', '🏵️'];

export const FlowerFlowCelebration: React.FC<FlowerFlowCelebrationProps> = ({
  show,
  onClose,
  completedTopicTitle,
  nextTopicId,
  nextTopicTitle,
  score
}) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!show) {
      setPetals([]);
      return;
    }

    // Generate 50 flowing flower petals with randomized physics
    const generatedPetals: Petal[] = Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      flower: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      left: Math.random() * 100, // percentage across screen
      size: Math.floor(Math.random() * 20) + 20, // 20px - 40px
      duration: Math.random() * 3 + 3.5, // 3.5s - 6.5s fall duration
      delay: Math.random() * 2, // 0s - 2s delay
      swayDuration: Math.random() * 2 + 2, // 2s - 4s horizontal sway
      rotation: Math.floor(Math.random() * 360)
    }));

    setPetals(generatedPetals);

    // Trigger canvas confetti bursts with pastel floral colors
    const colors = ['#f472b6', '#fb7185', '#fbbf24', '#34d399', '#818cf8', '#c084fc', '#fbcfe8'];
    
    // Left cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors
    });

    // Right cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors
    });

    // Mid burst after delay
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Flowing Flower Petals Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute select-none will-change-transform"
            style={{
              left: `${p.left}%`,
              top: '-50px',
              fontSize: `${p.size}px`,
              animation: `flowerFall ${p.duration}s linear ${p.delay}s infinite, flowerSway ${p.swayDuration}s ease-in-out infinite alternate`,
              transform: `rotate(${p.rotation}deg)`
            }}
          >
            {p.flower}
          </div>
        ))}
      </div>

      {/* Celebration Modal Card */}
      <div className="relative z-20 w-full max-w-md rounded-3xl border border-pink-500/30 bg-gradient-to-b from-[#161022] via-[#0E0C17] to-[#0A0D14] p-8 text-center shadow-2xl shadow-pink-500/20 space-y-6 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close celebration"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Celebration Header Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 shadow-xl shadow-pink-500/30 ring-4 ring-pink-500/20 animate-bounce">
          <span className="text-4xl select-none">🌸</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-300 border border-pink-500/30">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <span>LEVEL COMPLETED!</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Congratulations! 🎉
          </h3>

          <p className="text-xs text-slate-300">
            You successfully mastered: <br />
            <strong className="text-white font-semibold">{completedTopicTitle}</strong>
          </p>
        </div>

        {/* Score Summary if available */}
        {score && (
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex items-center justify-around text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Quiz Accuracy</span>
              <div className="text-base font-bold text-emerald-400">
                {score.correct} / {score.total} Correct
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Level Status</span>
              <div className="text-base font-bold text-pink-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Unlocked</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-3">
          {nextTopicId && nextTopicTitle ? (
            <Link
              href={`/lessons/${nextTopicId}`}
              onClick={onClose}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-pink-600/30 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Continue to Next Level</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-pink-600/30 hover:opacity-95 transition-all"
            >
              <span>Continue Learning</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Review Current Lesson
          </button>
        </div>

      </div>

      {/* Flower Keyframes Styles */}
      <style jsx global>{`
        @keyframes flowerFall {
          0% {
            top: -10%;
            opacity: 0;
            transform: translateY(0) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes flowerSway {
          0% {
            margin-left: -25px;
          }
          100% {
            margin-left: 25px;
          }
        }
      `}</style>
    </div>
  );
};
