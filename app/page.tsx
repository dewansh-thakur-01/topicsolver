'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { Hero3DVisual } from '@/components/Hero3DVisual';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { getTranslation } from '@/lib/translations';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  Brain, 
  Lightbulb, 
  WifiOff, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Database, 
  Cpu, 
  BookOpen, 
  Zap,
  TrendingUp,
  Compass,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Award,
  BarChart3
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setActiveSubject, language } = useTopicSolverStore();

  const handleStartSubject = (subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c') => {
    setActiveSubject(subjectId);
    router.push(`/assessment/${subjectId}`);
  };

  const featureCards = [
    {
      icon: Target,
      title: getTranslation(language, 'features.feat1Title'),
      subtitle: getTranslation(language, 'features.feat1Sub'),
      description: getTranslation(language, 'features.feat1Desc'),
      iconBg: 'bg-[#2B6FF3]/10 text-[#2B6FF3] dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]'
    },
    {
      icon: Brain,
      title: getTranslation(language, 'features.feat2Title'),
      subtitle: getTranslation(language, 'features.feat2Sub'),
      description: getTranslation(language, 'features.feat2Desc'),
      iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
    },
    {
      icon: Lightbulb,
      title: getTranslation(language, 'features.feat3Title'),
      subtitle: getTranslation(language, 'features.feat3Sub'),
      description: getTranslation(language, 'features.feat3Desc'),
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
    },
    {
      icon: WifiOff,
      title: getTranslation(language, 'features.feat4Title'),
      subtitle: getTranslation(language, 'features.feat4Sub'),
      description: getTranslation(language, 'features.feat4Desc'),
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Judge Persona Switcher Bar */}
      <PersonaSwitcher />

      {/* 1. 3D Hero Section with 3D Typography & Interactive Holographic Matrix */}
      <section className="relative overflow-hidden rounded-3xl border border-[#DCE5F2] bg-white p-8 sm:p-12 lg:p-16 shadow-xl text-center space-y-8 dark:border-[#222B3D] dark:bg-[#121622]">
        
        {/* 3D Radiant Ambient Background Glows & Laser Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC] pointer-events-none dark:from-[#0E121C] dark:via-[#121622] dark:to-[#0E121C]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2B6FF3]/10 rounded-full blur-3xl pointer-events-none dark:bg-[#3B82F6]/15" />
        <div className="absolute -bottom-24 left-1/4 w-[400px] h-[250px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none dark:bg-purple-600/15" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          
          {/* Floating 3D Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-4 py-1.5 text-xs font-extrabold text-[#2B6FF3] border border-[#2B6FF3]/25 shadow-xs dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] animate-float-3d">
            <Sparkles className="h-3.5 w-3.5 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <span className="font-3d-badge">{getTranslation(language, 'hero.badge')}</span>
          </div>

          {/* Bold 3D Hero Font Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none font-3d-hero">
            TOPIC <span className="font-3d-highlight">SOLVER</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16191D] font-3d-sub dark:text-slate-100">
            {getTranslation(language, 'hero.tagline')}
          </h2>

          <p className="text-sm sm:text-base text-[#687385] leading-relaxed max-w-2xl mx-auto font-medium dark:text-[#94A3B8]">
            {getTranslation(language, 'hero.description')}
          </p>

          <div className="inline-block px-4 py-1 rounded-full bg-[#F7F9FC] border border-[#DCE5F2] text-xs text-[#16191D] font-semibold dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-300">
            {getTranslation(language, 'hero.quote')}
          </div>

          {/* Primary & Secondary 3D Styled Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => handleStartSubject('java')}
              className="inline-flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] hover:to-[#0D44B8] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#2B6FF3]/30 transition-all hover:scale-105 active:scale-95 dark:from-[#3B82F6] dark:to-[#1D4ED8]"
            >
              <span>{getTranslation(language, 'hero.btnDiagnostic')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              href="/practice"
              className="inline-flex items-center space-x-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#2B6FF3] transition-all shadow-md dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200 dark:hover:bg-[#1E2538] dark:hover:border-[#3B82F6] dark:hover:text-white"
            >
              <Terminal className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
              <span>{getTranslation(language, 'hero.btnPractice')}</span>
            </Link>
          </div>
        </div>

        {/* 3D Holographic Topic Matrix & Interactive Graphic Core */}
        <div className="relative z-10 pt-4 pb-2">
          <Hero3DVisual />
        </div>

        {/* 3D Visual Flow Diagram: 4-Stage Continuous Loop */}
        <div className="relative z-10 pt-4">
          <div className="text-xs font-extrabold text-[#687385] uppercase tracking-wider mb-5 dark:text-[#94A3B8]">
            {getTranslation(language, 'hero.loopTitle')}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto card-3d-perspective">
            <div className="card-3d-tilt rounded-2xl bg-[#F7F9FC] p-4 border border-[#DCE5F2] text-center space-y-2 shadow-sm dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2B6FF3] to-[#1557D6] text-white mx-auto font-mono text-xs font-extrabold shadow-md shadow-[#2B6FF3]/25">
                01
              </div>
              <h4 className="text-xs font-bold text-[#16191D] dark:text-white">{getTranslation(language, 'hero.loop1Title')}</h4>
              <p className="text-[11px] text-[#687385] dark:text-[#94A3B8] leading-tight">{getTranslation(language, 'hero.loop1Desc')}</p>
            </div>

            <div className="card-3d-tilt rounded-2xl bg-[#F7F9FC] p-4 border border-[#DCE5F2] text-center space-y-2 shadow-sm dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white mx-auto font-mono text-xs font-extrabold shadow-md shadow-purple-500/25">
                02
              </div>
              <h4 className="text-xs font-bold text-[#16191D] dark:text-white">{getTranslation(language, 'hero.loop2Title')}</h4>
              <p className="text-[11px] text-[#687385] dark:text-[#94A3B8] leading-tight">{getTranslation(language, 'hero.loop2Desc')}</p>
            </div>

            <div className="card-3d-tilt rounded-2xl bg-[#F7F9FC] p-4 border border-[#DCE5F2] text-center space-y-2 shadow-sm dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white mx-auto font-mono text-xs font-extrabold shadow-md shadow-amber-500/25">
                03
              </div>
              <h4 className="text-xs font-bold text-[#16191D] dark:text-white">{getTranslation(language, 'hero.loop3Title')}</h4>
              <p className="text-[11px] text-[#687385] dark:text-[#94A3B8] leading-tight">{getTranslation(language, 'hero.loop3Desc')}</p>
            </div>

            <div className="card-3d-tilt rounded-2xl bg-[#F7F9FC] p-4 border border-[#DCE5F2] text-center space-y-2 shadow-sm dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white mx-auto font-mono text-xs font-extrabold shadow-md shadow-emerald-500/25">
                04
              </div>
              <h4 className="text-xs font-bold text-[#16191D] dark:text-white">{getTranslation(language, 'hero.loop4Title')}</h4>
              <p className="text-[11px] text-[#687385] dark:text-[#94A3B8] leading-tight">{getTranslation(language, 'hero.loop4Desc')}</p>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Choose Your Subject Area with 3D Isometric Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#F7F9FC] border border-[#DCE5F2] px-3.5 py-1 text-xs font-bold text-[#16191D] dark:bg-[#121622] dark:border-[#222B3D] dark:text-white">
            <Layers className="h-3.5 w-3.5 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <span>{getTranslation(language, 'home.tracksBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight font-3d-sub dark:text-white">
            {getTranslation(language, 'home.tracksTitle')}
          </h2>
          <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
            {getTranslation(language, 'home.tracksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 card-3d-perspective">
          {Object.values(SUBJECT_COURSES).map((course) => {
            return (
              <div
                key={course.id}
                className="card-3d-tilt group relative flex flex-col justify-between rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-sm hover:border-[#2B6FF3]/50 transition-all duration-300 dark:border-[#222B3D] dark:bg-[#121622] dark:hover:border-[#3B82F6]/50"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] shadow-inner mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform dark:bg-[#0E121C] dark:border-[#222B3D]">
                    {course.id === 'java' && <Code2 className="h-6 w-6 text-amber-500" />}
                    {course.id === 'python' && <Sparkles className="h-6 w-6 text-[#2B6FF3] dark:text-[#60A5FA]" />}
                    {course.id === 'sql' && <Database className="h-6 w-6 text-cyan-500" />}
                    {course.id === 'dsa' && <Cpu className="h-6 w-6 text-emerald-500" />}
                    {course.id === 'c' && <Terminal className="h-6 w-6 text-purple-500" />}
                  </div>

                  <h3 className="text-base font-extrabold text-[#16191D] group-hover:text-[#2B6FF3] transition-colors dark:text-white dark:group-hover:text-[#60A5FA]">
                    {getTranslation(language, `subject.${course.id}`, course.title)}
                  </h3>

                  <p className="text-xs text-[#687385] mt-2 line-clamp-3 leading-relaxed dark:text-[#94A3B8]">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5F2] space-y-3 dark:border-[#222B3D]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
                    <span className="font-bold">{course.totalTopics} {getTranslation(language, 'courses.levels')}</span>
                    <span className="text-emerald-700 font-bold dark:text-emerald-400">All Levels</span>
                  </div>

                  <button
                    onClick={() => handleStartSubject(course.id)}
                    className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white py-2.5 px-3 text-xs font-bold transition-all shadow-md shadow-[#2B6FF3]/20 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                  >
                    <span>{getTranslation(language, 'home.takeAssessment')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 4 Major Features Grid with 3D Tilt Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#F7F9FC] border border-[#DCE5F2] px-3.5 py-1 text-xs font-bold text-[#16191D] dark:bg-[#121622] dark:border-[#222B3D] dark:text-white">
            <Sparkles className="h-3.5 w-3.5 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <span>{getTranslation(language, 'features.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight font-3d-sub dark:text-white">
            {getTranslation(language, 'features.title')}
          </h2>
          <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
            {getTranslation(language, 'features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-3d-perspective">
          {featureCards.map((card, idx) => {
            return (
              <div
                key={idx}
                className="card-3d-tilt rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-sm space-y-3 dark:border-[#222B3D] dark:bg-[#121622]"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl ${card.iconBg} border border-[#DCE5F2] shadow-inner dark:border-[#222B3D]`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#16191D] dark:text-white">{card.title}</h3>
                    <p className="text-xs font-semibold text-[#687385] dark:text-[#94A3B8]">{card.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-[#687385] leading-relaxed pl-1 dark:text-[#94A3B8]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Product Differentiation Comparison Card */}
      <section className="rounded-3xl border border-[#DCE5F2] bg-[#F7F9FC] p-8 sm:p-10 shadow-sm space-y-6 dark:border-[#222B3D] dark:bg-[#0E121C]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight font-3d-sub dark:text-white">
            "We don't teach every student the same way."
          </h2>
          <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
            Compare a static traditional course with TOPIC SOLVER's adaptive engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 card-3d-perspective">
          {/* Traditional Platform */}
          <div className="card-3d-tilt rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-4 dark:border-[#222B3D] dark:bg-[#121622]">
            <div className="text-xs font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">
              Traditional Platform (One-Size-Fits-All)
            </div>
            <ul className="space-y-2.5 text-xs text-[#687385] dark:text-[#94A3B8]">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Fixed sequential curriculum for all students</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Identical difficulty regardless of prior experience</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Generic "Wrong" messages without concept explanations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Requires high-bandwidth video streams to proceed</span>
              </li>
            </ul>
          </div>

          {/* TOPIC SOLVER */}
          <div className="card-3d-tilt rounded-2xl border border-[#2B6FF3]/30 bg-white p-6 space-y-4 shadow-sm dark:border-[#3B82F6]/40 dark:bg-[#121622]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#2B6FF3] uppercase tracking-wider dark:text-[#60A5FA]">
                TOPIC SOLVER (Adaptive Engine)
              </div>
              <span className="rounded-full bg-[#2B6FF3]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                AI Driven
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#16191D] font-semibold dark:text-slate-200">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 dark:text-emerald-400" />
                <span>Diagnostic assessment skips what you already know</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 dark:text-emerald-400" />
                <span>Real-time question difficulty adjustment (Easy/Med/Hard)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 dark:text-emerald-400" />
                <span>Explainable recommendations detailing why topics are assigned</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 dark:text-emerald-400" />
                <span>Low Data Mode (&lt;50KB text/audio) for rural accessibility</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Bottom 3D CTA Banner */}
      <section className="rounded-3xl border border-[#DCE5F2] bg-white p-8 sm:p-12 text-center space-y-4 shadow-xl dark:border-[#222B3D] dark:bg-[#121622]">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16191D] tracking-tight font-3d-sub dark:text-white">
          {getTranslation(language, 'cta.title')}
        </h2>
        <p className="text-xs sm:text-sm text-[#687385] max-w-xl mx-auto font-medium dark:text-[#94A3B8]">
          {getTranslation(language, 'cta.subtitle')}
        </p>
        <div className="pt-2">
          <button
            onClick={() => handleStartSubject('java')}
            className="inline-flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] hover:to-[#0D44B8] px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-[#2B6FF3]/25 transition-all hover:scale-105 active:scale-95 dark:from-[#3B82F6] dark:to-[#1D4ED8]"
          >
            <span>{getTranslation(language, 'cta.btn')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
