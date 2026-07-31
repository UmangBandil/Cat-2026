"use client";

import React from "react";
import { getOverallProgress, getSectionCompletion, getStreak, getCompletedCount } from "@/lib/progress";
import { plan } from "@/data/plan";
import { catSyllabusData } from "@/data/catSyllabus";
import {
  Trophy,
  Flame,
  Brain,
  BookOpen,
  Puzzle,
  RotateCcw,
  Target,
  Award,
  BarChart2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface CourseProgressTabProps {
  onNavigateToCommand: () => void;
}

const sectionConfig = {
  QA: {
    title: "Quantitative Aptitude (QA)",
    subtitle: "22 Questions · Algebra, Arithmetic, Geometry, Modern Math",
    icon: Brain,
    gradient: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/10 border-sky-500/30 text-sky-400",
  },
  VARC: {
    title: "Verbal Ability & RC (VARC)",
    subtitle: "24 Questions · RC Passages, Para Jumbles, Summary, Odd One Out",
    icon: BookOpen,
    gradient: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10 border-violet-500/30 text-violet-400",
  },
  DILR: {
    title: "Data Interpretation & LR (DILR)",
    subtitle: "20 Questions · Seating, Tournaments, Matrix, Charts, Venn",
    icon: Puzzle,
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  Revision: {
    title: "Revision & Error Analysis",
    subtitle: "Daily Formula Journal & Mistake Log Review",
    icon: RotateCcw,
    gradient: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
};

export const CourseProgressTab: React.FC<CourseProgressTabProps> = ({ onNavigateToCommand }) => {
  const { doneTasks, totalTasks, percentage } = getOverallProgress();
  const allDates = plan.map((p) => p.date);
  const streak = getStreak(allDates);
  const completedDays = getCompletedCount();

  const qaStats = getSectionCompletion("QA");
  const varcStats = getSectionCompletion("VARC");
  const dilrStats = getSectionCompletion("DILR");
  const revStats = getSectionCompletion("Revision");

  const milestones = [
    { title: "Day 1 Launch", desc: "First daily study task completed", unlocked: completedDays >= 1, icon: Target },
    { title: "Consistency Champion", desc: "Maintain a 7-day quiz streak", unlocked: streak >= 7, icon: Flame },
    { title: "Arithmetic Ace", desc: "Complete 15 QA arithmetic tasks", unlocked: qaStats.doneTasks >= 10, icon: Brain },
    { title: "99+ Percentile Track", desc: "Complete 50% of the 120-day plan", unlocked: percentage >= 50, icon: Trophy },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Top Banner: Overall CAT 2026 Progress Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-surface-800/90 via-surface-800 to-surface-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-sky-400" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> CAT 2026 Overall Readiness
              </span>
              <span className="text-xs text-slate-400 font-semibold">120-Day Mastery Track</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white">CAT 2026 Preparation Dashboard</h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time tracking of QA, VARC, and DILR task completion, quiz gates, and streak continuity.
              </p>
            </div>

            {/* Main Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                    {percentage}%
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Completed</span>
                </div>
                <span className="text-xs text-slate-300 font-semibold">
                  {doneTasks} / {totalTasks} Tasks Finished
                </span>
              </div>

              <div className="h-4 bg-surface-900 rounded-full overflow-hidden p-1 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-4 border-t border-white/10 relative z-10">
            <div className="bg-surface-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Active Streak
              </div>
              <div className="text-xl font-bold text-amber-400 mt-1">{streak} Days</div>
            </div>

            <div className="bg-surface-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Locked Days
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {completedDays} / 120
              </div>
            </div>

            <div className="bg-surface-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-sky-400" /> Total Curriculum
              </div>
              <div className="text-xl font-bold text-sky-400 mt-1">4 Phases</div>
            </div>
          </div>
        </div>

        {/* Daily Command CTA Card */}
        <div className="bg-surface-800/80 border border-white/10 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase">
              <Flame className="w-4 h-4" /> Today&apos;s Goal
            </div>
            <h3 className="text-lg font-bold text-white">Daily Quiz & Task Lock</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete your daily tasks in QA, VARC, and DILR, then pass the quiz (≥67%) to lock your day into your streak.
            </p>
          </div>

          <button
            onClick={onNavigateToCommand}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-400 hover:to-violet-500 text-white font-bold text-sm transition shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
          >
            <span>Open Daily Study Plan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section-Wise Detailed Breakdown (QA, VARC, DILR, Revision) */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-400" /> Core CAT Section Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            [
              { key: "QA", stats: qaStats },
              { key: "VARC", stats: varcStats },
              { key: "DILR", stats: dilrStats },
              { key: "Revision", stats: revStats },
            ] as const
          ).map(({ key, stats }) => {
            const sec = sectionConfig[key];
            const Icon = sec.icon;

            return (
              <div
                key={key}
                className="bg-surface-800/80 border border-white/10 hover:border-white/20 rounded-3xl p-5 space-y-4 transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${sec.bgColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase">{key}</span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{sec.title}</h4>
                  <div className="flex justify-between items-baseline mt-1 text-xs">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-bold text-slate-200">{stats.percentage}%</span>
                  </div>
                </div>

                <div className="h-2 bg-surface-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${sec.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-white/5">
                  <span>{stats.doneTasks} Completed</span>
                  <span>{stats.totalTasks} Total Tasks</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official CAT Topics Matrix */}
      <div className="bg-surface-800/80 border border-white/10 rounded-3xl p-6 space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-violet-400" /> Topic & Section Mastery Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sectional weightage and core focus topics for CAT 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catSyllabusData.map((sec) => {
            const Icon = sec.section === "QA" ? Brain : sec.section === "VARC" ? BookOpen : Puzzle;

            return (
              <div
                key={sec.section}
                className="bg-surface-900/60 border border-white/5 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="p-2 rounded-xl bg-white/10 text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{sec.title}</h4>
                    <span className="text-[11px] text-slate-400">{sec.subtitle}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {sec.topics.map((t) => (
                    <div key={t.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-200">{t.name}</span>
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {t.weightage}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Milestones */}
      <div className="bg-surface-800/80 border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" /> Key Milestone Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                  m.unlocked
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                    : "bg-surface-900/40 border-white/5 text-slate-500 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2.5 rounded-xl ${
                      m.unlocked ? "bg-amber-500/20 text-amber-400" : "bg-surface-800 text-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider">
                    {m.unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-100">{m.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
