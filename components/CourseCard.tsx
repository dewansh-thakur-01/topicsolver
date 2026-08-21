'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/coursesData';
import { useStore } from '@/lib/useStore';
import { Coffee, Database, Cpu, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { completedLessons } = useStore();

  const courseLessons = completedLessons.filter(id => id.startsWith(`${course.id}-`));
  const completedCount = courseLessons.length;
  const totalCount = course.totalVideos;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  // Status pill logic
  let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  let statusBg = 'bg-[#F7F9FC] text-[#687385] border-[#DCE5F2]';

  if (completedCount >= totalCount) {
    status = 'Completed';
    statusBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (completedCount > 0) {
    status = 'In Progress';
    statusBg = 'bg-[#2B6FF3]/10 text-[#2B6FF3] border-[#2B6FF3]/30';
  }

  const renderIcon = () => {
    switch (course.id) {
      case 'java':
        return <Coffee className="h-6 w-6 text-amber-600" />;
      case 'sql':
        return <Database className="h-6 w-6 text-[#2B6FF3]" />;
      case 'c':
        return <Cpu className="h-6 w-6 text-slate-700" />;
      default:
        return <Coffee className="h-6 w-6 text-[#2B6FF3]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#DCE5F2] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2B6FF3]/50 hover:shadow-2xl hover:shadow-[#2B6FF3]/15 transform-gpu">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] shadow-inner">
            {renderIcon()}
          </div>
          
          <span className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${statusBg}`}>
            {status === 'Completed' && <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />}
            <span>{status}</span>
          </span>
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-[#16191D] tracking-tight group-hover:text-[#2B6FF3] transition-colors">
          {course.title}
        </h3>
        
        <p className="mt-1 text-xs font-semibold text-[#687385] tracking-wide">
          {course.totalVideos} Video Lessons • {course.level}
        </p>

        <p className="mt-2 text-xs text-[#687385] line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Progress Bar & CTA */}
      <div className="mt-6 pt-4 border-t border-[#DCE5F2] space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#687385]">Completed: {completedCount} / {totalCount} lessons</span>
          <span className="font-bold text-[#16191D]">{progressPct}%</span>
        </div>

        <div className="w-full bg-[#F7F9FC] border border-[#DCE5F2] rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500 bg-[#2B6FF3]"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="mt-2 flex w-full items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] py-2.5 px-4 text-xs font-semibold text-white transition-all shadow-sm hover:shadow-md hover:shadow-[#2B6FF3]/20"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Continue {course.title.split(' ')[0]} Course</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
