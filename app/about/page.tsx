'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Brain, 
  WifiOff, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Heart 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Remote Learning Engagement Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#16191D] tracking-tight">
          What is TOPIC SOLVER?
        </h1>

        <p className="text-sm text-[#687385] leading-relaxed">
          TOPIC SOLVER is an AI-powered personalized learning platform designed to help students learn according to their actual knowledge level.
        </p>
      </div>

      {/* Problem Statement Card */}
      <div className="rounded-3xl border border-[#DCE5F2] bg-white p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#2B6FF3] uppercase tracking-wider">
          <Target className="h-4 w-4" />
          <span>The Problem We Solve</span>
        </div>

        <p className="text-xs sm:text-sm text-[#687385] leading-relaxed">
          Students in remote and underserved areas often struggle with engagement due to a lack of interactive resources, individualized support, and heavy bandwidth barriers. Traditional online courses deliver the exact same static videos to everyone regardless of prior background.
        </p>

        <div className="rounded-xl bg-[#F7F9FC] p-4 border border-[#DCE5F2] text-xs text-[#16191D] font-semibold italic">
          "TOPIC SOLVER first understands what you know, then builds and continuously adapts your path toward mastery."
        </div>
      </div>

      {/* 4 Pillars of Pedagogical Adaptation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#2B6FF3]/10 text-[#2B6FF3] border border-[#2B6FF3]/20">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#16191D]">Diagnostic Skill Assessment</h3>
          </div>
          <p className="text-xs text-[#687385] leading-relaxed">
            Students take an initial adaptive diagnostic test to identify baseline proficiencies and skip foundational concepts they already understand.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#16191D]">Adaptive Difficulty Engine</h3>
          </div>
          <p className="text-xs text-[#687385] leading-relaxed">
            Content and quiz questions become harder (85%+ accuracy) or easier (&lt;40% accuracy) automatically with transparent conceptual explanations.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <WifiOff className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#16191D]">Low Data Mode Accessibility</h3>
          </div>
          <p className="text-xs text-[#687385] leading-relaxed">
            Strips heavy video payloads into lightweight text notes, code reference cards, and audio transcripts (&lt;50KB) for 2G/3G connectivity.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#16191D]">Continuous Engagement</h3>
          </div>
          <p className="text-xs text-[#687385] leading-relaxed">
            Meaningful mastery badges, learning velocity tracking, and streak counters motivate learners without excessive gamification pressure.
          </p>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl border border-[#DCE5F2] bg-white p-8 text-center space-y-4 shadow-xs">
        <h2 className="text-2xl font-extrabold text-[#16191D]">
          Experience Adaptive Personalized Learning
        </h2>
        <p className="text-xs text-[#687385] max-w-lg mx-auto">
          Start your diagnostic assessment in Java, Python, SQL, or DSA and see your personalized roadmap build in seconds.
        </p>
        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105"
          >
            <span>Explore Subjects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
