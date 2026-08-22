'use client';

import React, { useState, useMemo } from 'react';
import { Problem } from '@/lib/problemsData';
import { useStore } from '@/lib/useStore';
import { SolutionModal } from './SolutionModal';
import { 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Code2, 
  Database, 
  Cpu, 
  Filter, 
  Eye, 
  FileEdit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProblemTableProps {
  problems: Problem[];
}

export const ProblemTable: React.FC<ProblemTableProps> = ({ problems }) => {
  const { problemStatus, toggleProblemSolved } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'Java' | 'Python' | 'SQL' | 'DSA' | 'C'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const [activeProblemModal, setActiveProblemModal] = useState<Problem | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [problems]);

  // Filtered dataset
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      // Language filter
      if (selectedLanguage !== 'All' && p.language !== selectedLanguage) return false;
      
      // Difficulty filter
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
      
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      
      // Status filter
      const pStat = problemStatus[p.id];
      const isSolved = pStat?.solved || false;
      if (selectedStatus === 'Solved' && !isSolved) return false;
      if (selectedStatus === 'Todo' && isSolved) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesId = p.id.toString().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesId && !matchesCat) return false;
      }

      return true;
    });
  }, [problems, selectedLanguage, selectedDifficulty, selectedCategory, selectedStatus, searchQuery, problemStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(start, start + itemsPerPage);
  }, [filteredProblems, currentPage]);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40';
      case 'Medium':
        return 'bg-amber-950/70 text-amber-400 border-amber-500/40';
      case 'Hard':
        return 'bg-rose-950/70 text-rose-400 border-rose-500/40';
      default:
        return 'bg-[#1E293B] text-slate-400 border-[#334155]';
    }
  };

  const renderLangIcon = (lang: string) => {
    if (lang === 'Java') return <Code2 className="h-3.5 w-3.5 text-amber-400" />;
    if (lang === 'Python') return <Code2 className="h-3.5 w-3.5 text-blue-400" />;
    if (lang === 'SQL') return <Database className="h-3.5 w-3.5 text-cyan-400" />;
    if (lang === 'DSA') return <Code2 className="h-3.5 w-3.5 text-emerald-400" />;
    return <Cpu className="h-3.5 w-3.5 text-slate-300" />;
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header Controls - Black & Grey Theme */}
      <div className="rounded-2xl border border-[#2D3748] bg-[#161B26] p-5 shadow-xl space-y-4">
        
        {/* Language Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2D3748] pb-4">
          <div className="flex items-center space-x-1.5 bg-[#121620] p-1.5 rounded-xl border border-[#2D3748]">
            {(['All', 'Java', 'Python', 'SQL', 'DSA', 'C'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setCurrentPage(1);
                }}
                className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#2B6FF3] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E293B]'
                }`}
              >
                {lang !== 'All' && renderLangIcon(lang)}
                <span>
                  {lang === 'All' ? 'All Languages' : lang === 'Java' ? 'Java (600+)' : lang === 'SQL' ? 'SQL / Database (125+)' : 'C Language'}
                </span>
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="font-bold text-white">{filteredProblems.length}</span> / {problems.length} problems
          </div>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem title or #ID..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl bg-[#121620] pl-9 pr-4 py-2 text-xs text-white border border-[#2D3748] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B6FF3]"
            />
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={e => {
              setSelectedDifficulty(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl bg-[#121620] px-3 py-2 text-xs text-slate-200 border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3]"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy (Green)</option>
            <option value="Medium">Medium (Yellow)</option>
            <option value="Hard">Hard (Red)</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl bg-[#121620] px-3 py-2 text-xs text-slate-200 border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3]"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Topic Categories' : c}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={e => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl bg-[#121620] px-3 py-2 text-xs text-slate-200 border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3]"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved ✅</option>
            <option value="Todo">Todo ⏳</option>
          </select>

        </div>
      </div>

      {/* Problems List Table - Black & Grey Theme */}
      <div className="rounded-2xl border border-[#2D3748] bg-[#121620] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2D3748] bg-[#161B26] text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Title & ID</th>
                <th className="py-3.5 px-4">Language</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3748]/60">
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((prob) => {
                  const pStat = problemStatus[prob.id];
                  const isSolved = pStat?.solved || false;
                  const hasNotes = !!pStat?.notes;

                  return (
                    <tr 
                      key={prob.id} 
                      className="group hover:bg-[#161B26] transition-colors"
                    >
                      {/* Checkbox Status */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleProblemSolved(prob.id)}
                          title={isSolved ? 'Mark as Todo' : 'Mark as Solved'}
                          className="inline-flex items-center justify-center"
                        >
                          {isSolved ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Problem Title & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-slate-500 font-semibold">#{prob.id}</span>
                          <button
                            onClick={() => setActiveProblemModal(prob)}
                            className="font-semibold text-white group-hover:text-[#60A5FA] transition-colors text-left"
                          >
                            {prob.title}
                          </button>
                          {hasNotes && (
                            <span title="Contains personal user notes" className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">
                              Notes
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Language */}
                      <td className="py-3.5 px-4 font-medium text-slate-300">
                        <div className="inline-flex items-center space-x-1.5">
                          {renderLangIcon(prob.language)}
                          <span>{prob.language}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        <span className="rounded-md bg-[#1E293B] px-2 py-1 border border-[#334155]">
                          {prob.category}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${getDifficultyBadge(prob.difficulty)}`}>
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setActiveProblemModal(prob)}
                            className="inline-flex items-center space-x-1 rounded-lg bg-[#1E293B] px-2.5 py-1 text-[11px] font-semibold text-[#60A5FA] border border-[#334155] hover:bg-[#2B6FF3] hover:text-white transition-colors"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Solution</span>
                          </button>

                          <a
                            href={prob.leetCodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 rounded-lg bg-[#161B26] px-2.5 py-1 text-[11px] font-semibold text-slate-400 border border-[#2D3748] hover:text-white hover:border-slate-500 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">LeetCode</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No problems match your current search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#2D3748] px-6 py-3 bg-[#161B26]">
            <span className="text-xs text-slate-400 font-mono">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="flex items-center space-x-1 rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-semibold text-slate-300 border border-[#334155] disabled:opacity-40 hover:bg-[#2D3748]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="flex items-center space-x-1 rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-semibold text-slate-300 border border-[#334155] disabled:opacity-40 hover:bg-[#2D3748]"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Solution Modal Trigger */}
      {activeProblemModal && (
        <SolutionModal
          problem={activeProblemModal}
          onClose={() => setActiveProblemModal(null)}
        />
      )}

    </div>
  );
};
