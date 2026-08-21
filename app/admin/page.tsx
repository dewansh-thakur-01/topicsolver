'use client';

import React, { useState } from 'react';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { toast } from 'sonner';
import { 
  ShieldCheck, 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Video, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Save 
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons' | 'questions' | 'youtube'>('courses');
  const [selectedSubject, setSelectedSubject] = useState<'java' | 'python' | 'sql' | 'dsa' | 'c'>('java');

  const course = SUBJECT_COURSES[selectedSubject];
  const allTopics = course.modules.flatMap(m => m.topics);

  const [customVideoId, setCustomVideoId] = useState('eIrMbAQSU34');
  const [videoTitle, setVideoTitle] = useState('JVM Memory & Variables Deep Dive');
  const [videoDuration, setVideoDuration] = useState('10:45');

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Updated YouTube mapping for ${videoTitle} (ID: ${customVideoId})`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Curriculum & Question Management
          </h1>
          <p className="text-xs text-slate-400">
            Manage subject modules, lesson content, adaptive question banks, and YouTube IDs.
          </p>
        </div>

        {/* Subject Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['java', 'python', 'sql', 'dsa'] as const).map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1 text-xs font-bold rounded-xl uppercase transition-colors ${
                selectedSubject === subj ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'courses' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Course Modules</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'lessons' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Topics & Lessons ({allTopics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'questions' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Adaptive Question Bank</span>
        </button>

        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'youtube' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video className="h-3.5 w-3.5" />
          <span>YouTube Embed Manager</span>
        </button>
      </div>

      {/* Tab 1: Course Modules */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {course.title} — Modules Overview
            </h3>
            <button 
              onClick={() => toast.success('Module added (Admin Simulator)')}
              className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.modules.map((mod, idx) => (
              <div key={mod.id} className="rounded-2xl border border-slate-800 bg-[#0C0F17] p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-bold">Module {idx + 1}</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    Published
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                <p className="text-xs text-slate-400">{mod.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{mod.topics.length} Lessons</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-indigo-400 hover:underline">Edit</button>
                    <button className="text-rose-400 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Topics & Lessons */}
      {activeTab === 'lessons' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0C0F17] overflow-hidden shadow-lg">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Lesson Inventory ({course.title})</span>
            <button 
              onClick={() => toast.success('Lesson draft created')}
              className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white"
            >
              <Plus className="h-3 w-3" />
              <span>Add Topic</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {allTopics.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-900/40">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{t.title}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                      {t.difficulty}
                    </span>
                    <span className="text-[10px] text-emerald-400">✓ Published</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.description}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-[11px]">
                  <span className="text-slate-500">{t.estimatedMinutes} min</span>
                  <button className="p-1.5 rounded-lg bg-slate-800 text-indigo-400 hover:bg-slate-700">
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Adaptive Question Bank */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Diagnostic & Lesson Questions ({selectedSubject.toUpperCase()})
            </h3>
            <button 
              onClick={() => toast.success('Question added to adaptive pool')}
              className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {allTopics.flatMap(t => t.adaptiveQuestions).map((q) => (
              <div key={q.id} className="rounded-xl border border-slate-800 bg-[#0C0F17] p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-indigo-300 border border-indigo-500/20">
                    Type: {q.type} • {q.difficulty}
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px]">Active in Adaptive Engine</span>
                </div>
                <h4 className="font-bold text-white">{q.question}</h4>
                <p className="text-slate-400 text-[11px]"><b>Explanation:</b> {q.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: YouTube Embed Manager */}
      {activeTab === 'youtube' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0C0F17] p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white">YouTube Supplementary Video Manager</h3>
            <p className="text-xs text-slate-400">
              Attach optional YouTube learning resources. Videos load lazily and are stripped in Low Data Mode.
            </p>
          </div>

          <form onSubmit={handleSaveVideo} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">YouTube Video ID / URL</label>
              <input
                type="text"
                value={customVideoId}
                onChange={(e) => setCustomVideoId(e.target.value)}
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Video Title</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Duration (MM:SS)</label>
              <input
                type="text"
                value={videoDuration}
                onChange={(e) => setVideoDuration(e.target.value)}
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Video Metadata</span>
              </button>
            </div>
          </form>

          {/* Video Preview */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300">Live Video Preview:</span>
            <div className="aspect-video max-w-lg rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <iframe
                src={`https://www.youtube.com/embed/${customVideoId}?rel=0`}
                title="Preview"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
