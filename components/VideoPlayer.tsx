'use client';

import React, { useState } from 'react';
import { Lesson } from '@/lib/coursesData';
import { useStore } from '@/lib/useStore';
import { toast } from 'sonner';
import { CheckCircle2, Play, Zap, FileText, Download, Code, Sparkles, Volume2 } from 'lucide-react';

interface VideoPlayerProps {
  lesson: Lesson;
  onComplete?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, onComplete }) => {
  const { markLessonComplete, completedLessons, lowBandwidthMode, toggleLowBandwidthMode } = useStore();
  const isCompleted = completedLessons.includes(lesson.id);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'code'>('video');

  const handleMarkWatched = () => {
    markLessonComplete(lesson.id);
    toast.success(`Lesson marked as completed! Progress updated.`);
    if (onComplete) onComplete();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0C0F17] overflow-hidden shadow-2xl">
      
      {/* Video Container / Low-Bandwidth Mode */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center border-b border-slate-800">
        {!lowBandwidthMode ? (
          <iframe
            src={`${lesson.videoUrl}?autoplay=0&modestbranding=1&rel=0`}
            title={lesson.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Rural Low Bandwidth Text/Audio Mode */
          <div className="h-full w-full p-6 sm:p-8 overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-[#0A0D14] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Low-Bandwidth Mode Active (&lt;35KB Payload)</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">Duration: {lesson.duration}</span>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">{lesson.title}</h2>
              
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
                  <Volume2 className="h-4 w-4" />
                  <span>Audio Lesson Transcript & Key Points:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {lesson.notes}
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/90 p-4 border border-slate-800 font-mono text-xs text-emerald-400">
                <div className="text-[11px] text-slate-500 mb-2">// Code Reference Snippet</div>
                <pre className="overflow-x-auto whitespace-pre">{lesson.codeSnippet}</pre>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <span className="text-xs text-slate-400">Saved ~45MB video data transfer</span>
              <button
                onClick={toggleLowBandwidthMode}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
              >
                Switch to Full Video Stream
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls & Meta Bar */}
      <div className="p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-400">
              <span>Lesson ID: {lesson.id}</span>
              <span>•</span>
              <span className="font-mono text-indigo-400">{lesson.duration}</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-white tracking-tight">{lesson.title}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleMarkWatched}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-md shadow-indigo-600/20'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? 'Marked Complete' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'video' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Notes & Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'code' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Code Snippet</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'video' && (
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>{lesson.notes}</p>
            <div className="inline-flex items-center space-x-2 pt-2 text-indigo-400 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scroll down to solve the interactive 3-question MCQ assessment!</span>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.notes}</p>
            <div className="pt-2">
              <button 
                onClick={() => toast.success('Downloaded lesson cheatsheet PDF')}
                className="inline-flex items-center space-x-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700"
              >
                <Download className="h-3.5 w-3.5 text-indigo-400" />
                <span>Download Lesson Handout (PDF)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="rounded-xl bg-[#080A10] p-4 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 border-b border-slate-800/80 pb-2">
              <span>Code Reference</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(lesson.codeSnippet);
                  toast.success('Code copied to clipboard!');
                }}
                className="hover:text-slate-300 text-indigo-400"
              >
                Copy Code
              </button>
            </div>
            <pre className="whitespace-pre">{lesson.codeSnippet}</pre>
          </div>
        )}

      </div>
    </div>
  );
};
