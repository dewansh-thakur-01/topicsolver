'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '@/lib/soundEffects';

const CATEGORIES = [
  { id: '🚀 Feature', label: '🚀 Feature', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' },
  { id: '💡 Idea', label: '💡 Idea', color: 'border-amber-500/40 text-amber-300 bg-amber-950/40' },
  { id: '💬 Feedback', label: '💬 Feedback', color: 'border-purple-500/40 text-purple-300 bg-purple-950/40' },
  { id: '❤️ Shoutout', label: '❤️ Shoutout', color: 'border-pink-500/40 text-pink-300 bg-pink-950/40' },
];

export default function ThoughtFormModal({ isOpen, onClose, onSubmitThought }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('🚀 Feature');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name/alias');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please write your thought or feedback');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await onSubmitThought({
        name: name.trim(),
        message: message.trim(),
        category,
      });

      // Futuristic Sci-Fi Sound
      soundManager.playSuccessSound();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f3ff', '#ff007f', '#7000ff', '#39ff14'],
      });

      // Reset form
      setName('');
      setMessage('');
      setCategory('🚀 Feature');
      onClose();
    } catch (err) {
      setErrorMsg('Failed to post thought. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] backdrop-blur-xl text-left overflow-hidden z-10"
        >
          {/* Neon Top Bar Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Drop Your Thought in 3D</h2>
              <p className="text-xs text-slate-400 font-mono">Your message will instantly appear on the public wall</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
                Your Name / Alias *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CyberNinja, Sarah, Alex..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
                Select Category *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playCategorySound();
                      setCategory(cat.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      category === cat.id
                        ? 'border-cyan-400 text-cyan-200 bg-cyan-950/80 shadow-[0_0_15px_rgba(0,243,255,0.3)] scale-[1.02]'
                        : 'border-slate-800 text-slate-400 bg-slate-900/40 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                  Your Thought / Message *
                </label>
                <span className="text-[10px] font-mono text-slate-500">
                  {message.length}/280
                </span>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <textarea
                  rows={4}
                  maxLength={280}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your feedback, feature request, or shoutout here..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.7)] active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Broadcasting to 3D Space...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span>Publish Thought to Wall</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
