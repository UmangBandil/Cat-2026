"use client";

import React from "react";
import { getStreak, getCompletedCount, getOverallProgress } from "@/lib/progress";
import { plan } from "@/data/plan";
import { Flame, Trophy, BookOpen, BarChart3, CheckSquare, Sparkles } from "lucide-react";

interface CourseHeaderProps {
  activeTab: "command" | "progress" | "syllabus";
  onTabChange: (tab: "command" | "progress" | "syllabus") => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ activeTab, onTabChange }) => {
  const allDates = plan.map((p) => p.date);
  const streak = getStreak(allDates);
  const completedDays = getCompletedCount();
  const { percentage } = getOverallProgress();

  return (
    <header className="bg-surface-800/90 border-b border-white/10 backdrop-blur-md sticky top-0 z-30 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
        {/* Header Title & Global Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Target: CAT 2026
              </span>
              <span className="text-xs text-slate-400 font-medium">120-Day Master Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mt-0.5">
              CAT 2026 Command Center
            </h1>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Flame className="w-4 h-4" />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <Trophy className="w-4 h-4" />
              <span>{completedDays} / 120 Days</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-xl border border-sky-500/20">
              <span>{percentage}% Done</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-3">
          <button
            onClick={() => onTabChange("command")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === "command"
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Daily Command Plan</span>
          </button>

          <button
            onClick={() => onTabChange("progress")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === "progress"
                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Progress & Section Analytics</span>
          </button>

          <button
            onClick={() => onTabChange("syllabus")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === "syllabus"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Official Syllabus Breakdown</span>
          </button>
        </div>
      </div>
    </header>
  );
};
