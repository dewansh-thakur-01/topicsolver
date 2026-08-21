'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, Share2, Check, Clock, User } from 'lucide-react';
import { soundManager } from '@/lib/soundEffects';

const CATEGORY_STYLES = {
  '🚀 Feature': {
    badge: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_10px_rgba(0,243,255,0.2)]',
    glow: 'rgba(0, 243, 255, 0.15)',
    avatar: 'from-cyan-500 to-blue-600',
  },
  '💡 Idea': {
    badge: 'border-amber-500/40 text-amber-300 bg-amber-950/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    glow: 'rgba(245, 158, 11, 0.15)',
    avatar: 'from-amber-500 to-orange-600',
  },
  '💬 Feedback': {
    badge: 'border-purple-500/40 text-purple-300 bg-purple-950/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    glow: 'rgba(168, 85, 247, 0.15)',
    avatar: 'from-purple-500 to-indigo-600',
  },
  '❤️ Shoutout': {
    badge: 'border-pink-500/40 text-pink-300 bg-pink-950/40 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
    glow: 'rgba(236, 72, 153, 0.15)',
    avatar: 'from-pink-500 to-rose-600',
  },
};

function formatTimeAgo(dateString) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ThoughtCard({ thought, onLike }) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(thought.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  // Framer Motion 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const categoryStyle = CATEGORY_STYLES[thought.category] || CATEGORY_STYLES['🚀 Feature'];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLike = () => {
    soundManager.playHoverSound();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      if (onLike) onLike(thought.id);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    soundManager.playHoverSound();
    navigator.clipboard.writeText(`"${thought.message}" — ${thought.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="relative group rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.25)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${categoryStyle.glow}, transparent 80%)`,
        }}
      />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4" style={{ transform: 'translateZ(20px)' }}>
          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${categoryStyle.avatar} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
              {thought.name ? thought.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1">{thought.name}</h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{formatTimeAgo(thought.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${categoryStyle.badge}`}>
            {thought.category}
          </span>
        </div>

        {/* Message Content */}
        <p
          className="text-slate-200 text-sm leading-relaxed mb-6 font-sans whitespace-pre-wrap break-words"
          style={{ transform: 'translateZ(30px)' }}
        >
          {thought.message}
        </p>
      </div>

      {/* Footer Action Buttons */}
      <div
        className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400 font-mono"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Like / Upvote Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
            hasLiked
              ? 'border-pink-500/50 text-pink-400 bg-pink-950/40 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
              : 'border-slate-800/80 hover:border-slate-700 hover:text-slate-200 bg-slate-950/40'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-pink-500 text-pink-500 animate-pulse' : ''}`} />
          <span>{likes}</span>
        </button>

        {/* Share / Copy Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-slate-700 hover:text-slate-200 bg-slate-950/40 transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
