'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { useAuthStore } from '@/lib/useAuthStore';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation } from '@/lib/translations';
import { 
  Sparkles, 
  Flame, 
  Search, 
  Zap, 
  BookOpen, 
  Terminal, 
  Compass, 
  Map, 
  LayoutDashboard, 
  Info, 
  Menu, 
  X,
  ChevronDown,
  Bot,
  LogOut,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, lowBandwidthMode, toggleLowBandwidthMode, setSearchModalOpen, language } = useTopicSolverStore();
  const { user, signOut } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: getTranslation(language, 'nav.home'), icon: Sparkles },
    { href: '/courses', label: getTranslation(language, 'nav.courses'), icon: BookOpen },
    { href: '/practice', label: getTranslation(language, 'nav.practice'), icon: Terminal },
    { href: '/mentor', label: getTranslation(language, 'nav.mentor'), icon: Bot, badge: 'AI' },
    { href: '/my-path', label: getTranslation(language, 'nav.myPath'), icon: Compass, badge: 'Adaptive' },
    { href: '/roadmap', label: getTranslation(language, 'nav.roadmap'), icon: Map },
    { href: '/dashboard', label: getTranslation(language, 'nav.dashboard'), icon: LayoutDashboard },
    { href: '/about', label: getTranslation(language, 'nav.about'), icon: Info }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#DCE5F2] bg-white/95 backdrop-blur-xl transition-colors duration-200 shadow-xs dark:border-[#222B3D] dark:bg-[#090C12]/95">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-3 sm:px-5 lg:px-6 gap-2">
          
          {/* LEFT: Brand Logo & Left-Aligned Desktop Navigation */}
          <div className="flex items-center space-x-3 lg:space-x-4 shrink-0 min-w-0">
            <Link href="/" className="group flex items-center space-x-2 shrink-0 transition-opacity hover:opacity-95">
              <div className="relative flex h-8 w-12 sm:w-14 items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/topic_solver_logo.png"
                  alt="TOPIC SOLVER"
                  width={56}
                  height={28}
                  className="object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(43, 111, 243, 0.75))'
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm font-extrabold tracking-tight text-[#16191D] font-sans whitespace-nowrap dark:text-white">
                    TOPIC <span className="text-[#2B6FF3] dark:text-[#3B82F6]">SOLVER</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#2B6FF3]/10 px-1.5 py-0.2 text-[8px] font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
                    <span className="h-1 w-1 rounded-full bg-[#2B6FF3] dark:bg-[#3B82F6] animate-pulse" />
                    AI Engine
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Menubar (Left-Aligned next to Logo) */}
            <nav className="hidden lg:flex items-center space-x-0.5 rounded-2xl bg-[#F7F9FC] p-0.5 border border-[#DCE5F2] shadow-xs dark:bg-[#121622] dark:border-[#222B3D]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-center space-x-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold transition-all duration-150 whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#2B6FF3] text-white shadow-xs border border-[#1557D6] dark:bg-[#3B82F6] dark:border-[#2563EB]' 
                        : 'text-[#687385] hover:text-[#16191D] hover:bg-white dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-[#1E2538]'
                    }`}
                  >
                    <Icon className={`h-3 w-3 transition-colors ${isActive ? 'text-white' : 'text-[#687385] group-hover:text-[#2B6FF3] dark:text-[#94A3B8] dark:group-hover:text-[#60A5FA]'}`} />
                    <span>{link.label}</span>
                    {link.badge && !isActive && (
                      <span className="rounded-full bg-[#2B6FF3]/10 px-1 py-0.2 text-[7.5px] font-bold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: Action Controls (Optimized & Compact) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Global Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center space-x-1.5 rounded-xl bg-[#F7F9FC] px-2.5 py-1.5 text-xs text-[#687385] border border-[#DCE5F2] hover:border-[#2B6FF3] hover:text-[#16191D] transition-all shadow-xs group dark:bg-[#121622] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:border-[#3B82F6] dark:hover:text-white"
              title="Search topics, lessons, and practice problems (Cmd + K)"
            >
              <Search className="h-3.5 w-3.5 text-[#687385] group-hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:group-hover:text-[#60A5FA]" />
              <span className="hidden sm:inline font-medium text-[11px]">{getTranslation(language, 'nav.search')}</span>
              <kbd className="hidden sm:inline-flex items-center rounded-md bg-white px-1 py-0.2 text-[8.5px] font-mono text-[#687385] border border-[#DCE5F2] dark:bg-[#1E2538] dark:border-[#222B3D] dark:text-[#94A3B8]">
                ⌘K
              </kbd>
            </button>

            {/* Low Data Mode Toggle */}
            <button
              onClick={toggleLowBandwidthMode}
              title={lowBandwidthMode ? 'Switch to Standard Video Mode' : 'Enable Low Data Mode (<50KB Payload)'}
              className={`flex items-center space-x-1 rounded-full px-2 sm:px-2.5 py-1 text-xs font-semibold border transition-all ${
                lowBandwidthMode 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-300 ring-1 ring-emerald-400/30 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-600/40' 
                  : 'bg-[#F7F9FC] text-[#687385] border-[#DCE5F2] hover:border-[#2B6FF3] hover:text-[#16191D] dark:bg-[#121622] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:border-[#3B82F6] dark:hover:text-white'
              }`}
            >
              <Zap className={`h-3 w-3 ${lowBandwidthMode ? 'text-emerald-600 animate-pulse' : 'text-[#687385]'}`} />
              <span className="hidden md:inline text-[10.5px]">
                {lowBandwidthMode ? getTranslation(language, 'nav.lowDataOn') : getTranslation(language, 'nav.lowData')}
              </span>
            </button>

            {/* Streak Counter */}
            <div 
              title="Active Daily Learning Streak"
              className="flex items-center space-x-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 border border-amber-200 shadow-xs dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40"
            >
              <Flame className="h-3 w-3 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="font-mono text-[10.5px]">{profile.streakDays}d</span>
            </div>

            {/* Language Switcher Dropdown (Tamil, Telugu, Malayalam, Hindi, English) */}
            <LanguageSelector variant="compact" />

            {/* TOP RIGHT: Light / Dark Mode Toggle Button */}
            <ThemeToggle />

            {/* Separator */}
            <div className="hidden sm:block h-4 w-px bg-[#DCE5F2] dark:bg-[#222B3D]" />

            {/* Student Profile Avatar & Quick Sign Out */}
            <div className="flex items-center space-x-1.5">
              <Link
                href="/profile"
                className="relative flex items-center space-x-1.5 rounded-full p-0.5 hover:ring-2 hover:ring-[#2B6FF3]/40 transition-all group"
                title={`${user?.name || profile.name} (${user?.email || profile.level})`}
              >
                <img
                  src={profile.avatar}
                  alt={user?.name || profile.name}
                  className="h-7.5 w-7.5 rounded-full border border-[#DCE5F2] object-cover ring-1 ring-[#DCE5F2] shadow-xs dark:border-[#222B3D] dark:ring-[#3B82F6]/30"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#090C12]" />
              </Link>

              <button
                onClick={() => signOut()}
                className="flex items-center space-x-1 px-2 py-1 rounded-xl text-[#687385] hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-200 dark:text-[#94A3B8] dark:hover:text-rose-400 dark:hover:bg-rose-950/40 dark:hover:border-rose-800"
                title="Sign Out of Topic Solver"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-[10.5px] font-bold">{getTranslation(language, 'nav.signOut')}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle (for screen widths < xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden rounded-xl p-1.5 text-[#687385] bg-[#F7F9FC] border border-[#DCE5F2] hover:text-[#16191D] transition-colors dark:bg-[#121622] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Navigation Drawer (visible on < xl screens) */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#DCE5F2] bg-white px-4 py-3 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-200 dark:border-[#222B3D] dark:bg-[#090C12]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#2B6FF3] text-white dark:bg-[#3B82F6]' 
                      : 'text-[#687385] hover:bg-[#F7F9FC] hover:text-[#16191D] dark:text-[#94A3B8] dark:hover:bg-[#121622] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#687385] dark:text-[#94A3B8]'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-[#2B6FF3]/10 px-2 py-0.5 text-[9px] font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal />
    </>
  );
};
