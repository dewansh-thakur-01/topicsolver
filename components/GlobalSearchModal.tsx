'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { SUBJECT_COURSES, PRACTICE_PROBLEMS } from '@/lib/topicSolverData';
import { Search, X, BookOpen, Terminal, Code2, ArrowRight, Layers } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const router = useRouter();
  const { searchModalOpen, setSearchModalOpen } = useTopicSolverStore();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd + K / Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Aggregate searchable items
  const allSearchItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      category: 'Course' | 'Lesson' | 'Problem';
      subject: string;
      url: string;
      description: string;
    }> = [];

    // Courses & Topics
    Object.values(SUBJECT_COURSES).forEach(course => {
      items.push({
        id: `course-${course.id}`,
        title: `${course.title} Course`,
        category: 'Course',
        subject: course.title,
        url: `/courses/${course.id}`,
        description: course.description
      });

      course.modules.forEach(mod => {
        mod.topics.forEach(topic => {
          items.push({
            id: `topic-${topic.id}`,
            title: `${course.title}: ${topic.title}`,
            category: 'Lesson',
            subject: course.title,
            url: `/lessons/${topic.id}`,
            description: topic.description
          });
        });
      });
    });

    // Practice Problems
    PRACTICE_PROBLEMS.forEach(prob => {
      items.push({
        id: `prob-${prob.id}`,
        title: `${prob.title} (${prob.difficulty})`,
        category: 'Problem',
        subject: prob.subjectId.toUpperCase(),
        url: `/practice/${prob.id}`,
        description: prob.description
      });
    });

    return items;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return allSearchItems.slice(0, 6); // default suggestions
    }
    const q = query.toLowerCase();
    return allSearchItems.filter(
      item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
  }, [query, allSearchItems]);

  if (!searchModalOpen) return null;

  const handleSelect = (url: string) => {
    setSearchModalOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0C0F17] shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3 bg-slate-900/80">
          <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search topics, lessons, courses, or practice problems (e.g. 'arrays', 'loops', 'joins')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-800/40">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.url)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.category === 'Course' ? 'bg-indigo-500/10 text-indigo-400' :
                    item.category === 'Lesson' ? 'bg-cyan-500/10 text-cyan-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {item.category === 'Course' && <BookOpen className="h-4 w-4" />}
                    {item.category === 'Lesson' && <Layers className="h-4 w-4" />}
                    {item.category === 'Problem' && <Terminal className="h-4 w-4" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for "{query}". Try searching for 'variables', 'loops', 'arrays', or 'joins'.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-800 px-4 py-2 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with <b>Tab / Enter</b></span>
          <span>Press <b>ESC</b> to close</span>
        </div>

      </div>
    </div>
  );
};
