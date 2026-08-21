'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '@/lib/useThemeStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync html class on initial client mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-[#DCE5F2] bg-[#F7F9FC] dark:border-[#222B3D] dark:bg-[#121622]" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE5F2] bg-[#F7F9FC] text-[#687385] transition-all duration-300 hover:border-[#2B6FF3] hover:text-[#16191D] hover:scale-105 active:scale-95 shadow-xs dark:border-[#222B3D] dark:bg-[#121622] dark:text-[#94A3B8] dark:hover:border-[#3B82F6] dark:hover:text-white"
    >
      <div className="relative h-4.5 w-4.5">
        {/* Sun Icon (for Dark Mode -> Switch to Light) */}
        <Sun
          className={`absolute inset-0 h-4.5 w-4.5 text-amber-500 transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />

        {/* Moon Icon (for Light Mode -> Switch to Dark) */}
        <Moon
          className={`absolute inset-0 h-4.5 w-4.5 text-[#2B6FF3] transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>
    </button>
  );
};
