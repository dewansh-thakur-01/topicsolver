'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { SUPPORTED_LANGUAGES, Language, getTranslation } from '@/lib/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full' | 'cards';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { language, setLanguage } = useTopicSolverStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
    const selected = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    toast.success(`${getTranslation(langCode, 'lang.changeSuccess')} ${selected?.nativeName || langCode}`);
  };

  // Card Grid Variant (Ideal for Profile Settings)
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between group ${
                isSelected
                  ? 'border-[#2B6FF3] bg-[#2B6FF3]/5 shadow-sm ring-1 ring-[#2B6FF3] dark:bg-[#3B82F6]/10 dark:border-[#3B82F6] dark:ring-[#3B82F6]'
                  : 'border-[#DCE5F2] bg-white hover:border-[#2B6FF3]/50 hover:bg-[#F7F9FC] dark:border-[#222B3D] dark:bg-[#121622] dark:hover:bg-[#181F30]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label={lang.name}>{lang.flag}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#2B6FF3] dark:text-[#60A5FA]' : 'text-[#16191D] dark:text-white'}`}>
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] font-mono text-[#687385] dark:text-[#94A3B8]">
                      ({lang.name})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
                    Script: {lang.script}
                  </span>
                </div>
              </div>

              {isSelected ? (
                <div className="h-6 w-6 rounded-full bg-[#2B6FF3] text-white flex items-center justify-center dark:bg-[#3B82F6]">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border border-[#DCE5F2] group-hover:border-[#2B6FF3] dark:border-[#222B3D]" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Compact Header / Nav Dropdown Variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 rounded-xl bg-[#F7F9FC] px-2.5 py-1.5 text-xs text-[#687385] border border-[#DCE5F2] hover:border-[#2B6FF3] hover:text-[#16191D] transition-all shadow-xs group dark:bg-[#121622] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:border-[#3B82F6] dark:hover:text-white"
        title="Change Platform Language (English, Tamil, Telugu, Malayalam, Hindi)"
      >
        <Globe className="h-3.5 w-3.5 text-[#687385] group-hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:group-hover:text-[#60A5FA]" />
        <span className="text-xs">{currentLangInfo.flag}</span>
        <span className="hidden sm:inline font-bold text-[11px] text-[#16191D] dark:text-white">
          {currentLangInfo.nativeName}
        </span>
        <ChevronDown className="h-3 w-3 text-[#687385] group-hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#DCE5F2] bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 dark:border-[#222B3D] dark:bg-[#0E121C]">
          <div className="px-2.5 py-1.5 border-b border-[#DCE5F2]/60 mb-1 dark:border-[#222B3D]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#687385] dark:text-[#94A3B8]">
              {getTranslation(language, 'lang.settingsTitle')}
            </span>
          </div>

          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#2B6FF3]/10 text-[#2B6FF3] dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]'
                      : 'text-[#16191D] hover:bg-[#F7F9FC] dark:text-[#CBD5E1] dark:hover:bg-[#181F30] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span className="font-bold">{lang.nativeName}</span>
                    <span className="text-[10px] text-[#687385] font-normal dark:text-[#94A3B8]">
                      ({lang.name})
                    </span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#2B6FF3] dark:text-[#60A5FA]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
