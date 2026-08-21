'use client';

import React from 'react';
import { MasteryTier, getOkrProgressColor } from '@/lib/adaptiveEngine';

interface MasteryBarProps {
  topicName: string;
  score: number;
  tier?: MasteryTier;
  attempts?: number;
  isDarkTheme?: boolean;
}

export const MasteryBar: React.FC<MasteryBarProps> = ({ 
  topicName, 
  score, 
  attempts,
  isDarkTheme = false 
}) => {
  const okr = getOkrProgressColor(score);

  return (
    <div className={`rounded-xl border p-4 shadow-xs space-y-2.5 transition-all ${
      isDarkTheme 
        ? 'border-[#2D3748] bg-[#121620]' 
        : 'border-[#DCE5F2] bg-white dark:border-[#222B3D] dark:bg-[#121622]'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-bold ${isDarkTheme ? 'text-white' : 'text-[#16191D] dark:text-white'}`}>
            {topicName}
          </span>
          {attempts !== undefined && (
            <span className="text-[10px] font-mono text-[#687385] dark:text-[#94A3B8]">
              ({attempts} {attempts === 1 ? 'attempt' : 'attempts'})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* OKR Status Badge */}
          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold border ${okr.badgeBg}`}>
            {okr.statusLabel}
          </span>
          <span className={`font-mono text-xs font-bold ${isDarkTheme ? 'text-white' : 'text-[#16191D] dark:text-white'}`}>
            {score}%
          </span>
        </div>
      </div>

      {/* OKR Progress Track with dynamic fill color */}
      <div className={`w-full rounded-full h-2 overflow-hidden ${
        isDarkTheme 
          ? 'bg-[#1E293B]' 
          : 'bg-[#F7F9FC] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D]'
      }`}>
        <div
          className={`h-2 rounded-full transition-all duration-700 ${okr.barBg}`}
          style={{ width: `${Math.max(3, score)}%` }}
        />
      </div>
    </div>
  );
};
