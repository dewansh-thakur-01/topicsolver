'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTopicSolverStore, computeSkillInsights } from '@/lib/useTopicSolverStore';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { MasteryBar } from '@/components/MasteryBar';
import { LanguageSelector } from '@/components/LanguageSelector';
import { getTranslation } from '@/lib/translations';
import { toast } from 'sonner';
import { 
  User, 
  Flame, 
  Award, 
  CheckCircle2, 
  Mail, 
  Save, 
  TrendingUp, 
  Terminal, 
  Zap, 
  BookOpen, 
  Compass,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Sparkles,
  Layers,
  Globe,
  Code2,
  Database,
  Cpu
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    profile, 
    activeSubject, 
    completedLessons, 
    practiceStatus, 
    language 
  } = useTopicSolverStore();

  const [name, setName] = useState(profile.name || 'Kailash');
  const [email, setEmail] = useState(profile.email || 'kailash@domain.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(getTranslation(language, 'profile.savedSuccess'));
  };

  const masteries = Object.values(profile.topicMasteries);

  // Compute dynamic strengths, weaknesses, and subject stats based on user problems & quiz data
  const insights = computeSkillInsights(
    completedLessons,
    practiceStatus,
    profile.topicMasteries,
    activeSubject
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Persona Switcher for Quick Demo Testing */}
      <PersonaSwitcher />

      {/* Profile Overview Card */}
      <div className="rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-[#2B6FF3]/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left relative z-10">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-24 w-24 rounded-2xl border-2 border-[#2B6FF3] object-cover ring-4 ring-[#2B6FF3]/20 shadow-xl"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">{name}</h1>
              <span className="rounded-full bg-[#1E293B] px-3 py-0.5 text-xs font-semibold text-[#60A5FA] border border-[#334155]">
                {profile.level} {getTranslation(language, 'profile.level')}
              </span>
              <span className="rounded-full bg-[#78350F]/50 px-3 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span>{profile.streakDays}d {getTranslation(language, 'profile.streak')}</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{email}</span>
            </p>

            <p className="text-xs text-slate-300 pt-1">
              {getTranslation(language, 'profile.activeFocus')}: <span className="text-[#60A5FA] font-semibold">{profile.currentFocusTopicName}</span> • {getTranslation(language, 'profile.difficulty')}: <span className="text-amber-300 font-semibold">{profile.currentDifficulty}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 text-center space-y-1 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="text-xs font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.completedLessons')}
          </div>
          <div className="text-2xl font-extrabold text-[#16191D] font-mono dark:text-white">{completedLessons.length}</div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.completedLessonsDesc')}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 text-center space-y-1 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="text-xs font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.problemsSolved')}
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono dark:text-emerald-400">{insights.totalSolved}</div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.problemsSolvedDesc')}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 text-center space-y-1 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="text-xs font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.learningVelocity')}
          </div>
          <div className="text-2xl font-extrabold text-[#2B6FF3] font-mono dark:text-[#60A5FA]">{profile.learningPace}</div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.learningVelocityDesc')}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 USER PERFORMANCE ANALYTICS: STRENGTHS & WEAKNESSES BASED ON ACTIVITY 🌟 */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#16191D] tracking-tight flex items-center gap-2.5 dark:text-white">
            <Sparkles className="h-5 w-5 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <span>{getTranslation(language, 'analytics.strengthsTitle')} & {getTranslation(language, 'analytics.weaknessesTitle')}</span>
          </h2>
          <p className="text-xs text-[#687385] mt-1 dark:text-[#94A3B8]">
            {getTranslation(language, 'profile.subtitle')}
          </p>
        </div>

        {/* STRENGTHS SECTION */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-4 shadow-xs dark:border-emerald-800/40 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  {getTranslation(language, 'analytics.strengthsTitle')}
                </h3>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-400">
                  {getTranslation(language, 'analytics.strengthsSubtitle')}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300 dark:bg-emerald-900/70 dark:text-emerald-300 dark:border-emerald-700">
              {insights.strengths.length} {getTranslation(language, 'analytics.masteredBadge')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.strengths.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border border-emerald-200/80 bg-white p-4 space-y-3 shadow-xs dark:border-emerald-800/50 dark:bg-[#121622]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                      {skill.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#16191D] dark:text-white">
                      {skill.title}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700">
                      {skill.proficiencyPct}% {getTranslation(language, 'analytics.accuracy')}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#687385] dark:text-[#94A3B8]">
                  <p className="leading-relaxed">
                    <strong className="text-[#16191D] dark:text-slate-200 font-semibold">Evidence:</strong> {skill.reason}
                  </p>
                  <p className="text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40">
                    💡 <strong className="font-semibold">{getTranslation(language, 'analytics.recommendation')}:</strong> {skill.recommendation}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#687385] dark:text-[#94A3B8]">
                    Subject: {skill.subjectName}
                  </span>
                  <Link
                    href={skill.actionLink}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#2B6FF3] hover:underline dark:text-[#60A5FA]"
                  >
                    <span>{skill.actionLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WEAKNESSES / IMPROVEMENT AREAS SECTION */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 space-y-4 shadow-xs dark:border-amber-800/40 dark:bg-amber-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                <AlertTriangle className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                  {getTranslation(language, 'analytics.weaknessesTitle')}
                </h3>
                <p className="text-xs text-amber-800/80 dark:text-amber-400">
                  {getTranslation(language, 'analytics.weaknessesSubtitle')}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300 dark:bg-amber-900/70 dark:text-amber-300 dark:border-amber-700">
              {insights.weaknesses.length} {getTranslation(language, 'analytics.growthBadge')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.weaknesses.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border border-amber-200/80 bg-white p-4 space-y-3 shadow-xs dark:border-amber-800/50 dark:bg-[#121622] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                        {skill.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#16191D] dark:text-white">
                        {skill.title}
                      </h4>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-800 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700 shrink-0">
                      {skill.proficiencyPct}%
                    </span>
                  </div>

                  <p className="text-xs text-[#687385] dark:text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#16191D] dark:text-slate-200 font-semibold">Root Cause:</strong> {skill.reason}
                  </p>

                  <div className="text-[11px] text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/50">
                    🎯 <strong className="font-semibold">{getTranslation(language, 'analytics.recommendation')}:</strong> {skill.recommendation}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DCE5F2] dark:border-[#222B3D]">
                  <Link
                    href={skill.actionLink}
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 text-xs font-bold transition-all shadow-xs"
                  >
                    <span>{skill.actionLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBJECT COMPETENCY MATRIX */}
        <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 space-y-4 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <h3 className="text-sm font-bold text-[#16191D] flex items-center gap-2 dark:text-white">
            <Layers className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <span>{getTranslation(language, 'analytics.subjectBreakdown')}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(insights.subjectSummary).map(([subj, stat]) => {
              const subjNames: Record<string, string> = {
                java: 'Java',
                python: 'Python',
                sql: 'SQL',
                dsa: 'DSA',
                c: 'C Lang'
              };
              return (
                <div 
                  key={subj}
                  className="rounded-2xl border border-[#DCE5F2] p-3 text-center space-y-1 bg-[#F7F9FC] dark:border-[#222B3D] dark:bg-[#0E121C]"
                >
                  <span className="text-[10px] font-mono uppercase font-bold text-[#2B6FF3] dark:text-[#60A5FA]">
                    {subjNames[subj] || subj}
                  </span>
                  <div className="text-lg font-mono font-extrabold text-[#16191D] dark:text-white">
                    {stat.score}%
                  </div>
                  <div className="text-[10px] text-[#687385] dark:text-[#94A3B8]">
                    {stat.completedLessons} Levels Done • {stat.solved} Solved
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌐 LANGUAGE & REGIONAL PREFERENCES (TAMIL, TELUGU, MALAYALAM, HINDI, EN) 🌐 */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 sm:p-8 space-y-5 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2B6FF3]/10 text-[#2B6FF3] dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#16191D] dark:text-white">
              {getTranslation(language, 'lang.settingsTitle')}
            </h3>
            <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
              {getTranslation(language, 'lang.settingsSubtitle')}
            </p>
          </div>
        </div>

        {/* Visual Language Selection Cards */}
        <LanguageSelector variant="cards" />
      </div>

      {/* Topic Mastery Records with OKR Progress Bars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#16191D] tracking-tight flex items-center gap-2 dark:text-white">
              <Award className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
              <span>{name}'s {getTranslation(language, 'okr.title')}</span>
            </h2>
            <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
              {getTranslation(language, 'okr.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {masteries.map((m) => (
            <MasteryBar
              key={m.topicId}
              topicName={m.topicName}
              score={m.score}
              tier={m.tier}
              attempts={m.attempts}
              isDarkTheme={false}
            />
          ))}
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-4 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
        <h3 className="text-sm font-bold text-[#16191D] tracking-tight dark:text-white">
          {getTranslation(language, 'profile.editTitle')}
        </h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#16191D] dark:text-slate-200">
              {getTranslation(language, 'profile.displayName')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-[#F7F9FC] px-4 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:bg-white dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:focus:ring-[#3B82F6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#16191D] dark:text-slate-200">
              {getTranslation(language, 'profile.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-[#F7F9FC] px-4 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:bg-white dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:focus:ring-[#3B82F6]"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{getTranslation(language, 'profile.saveBtn')}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
