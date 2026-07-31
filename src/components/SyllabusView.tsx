"use client";

import React, { useState } from "react";
import { catSyllabusData, SectionSyllabus } from "@/data/catSyllabus";
import {
  Brain,
  BookOpen,
  Puzzle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface SyllabusViewProps {
  onGoToDailyCommand: () => void;
}

const iconMap = {
  Brain,
  BookOpen,
  Puzzle,
};

export const SyllabusView: React.FC<SyllabusViewProps> = ({ onGoToDailyCommand }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    QA: true,
    VARC: true,
    DILR: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4">
      {/* Overview Card */}
      <div className="bg-surface-800/80 border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">CAT 2026 Official Exam Syllabus & Pattern</h2>
          <span className="text-xs text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
            66 Total Questions · 120 Minutes
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The CAT exam consists of 3 sectional time-bound papers: Quantitative Aptitude (22 Qs), Verbal Ability & Reading Comprehension (24 Qs), and Data Interpretation & Logical Reasoning (20 Qs).
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {catSyllabusData.map((sec: SectionSyllabus) => {
          const isExpanded = expandedSections[sec.section] ?? true;
          const Icon = iconMap[sec.iconName];

          return (
            <div
              key={sec.section}
              className="bg-surface-800/80 border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleSection(sec.section)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-surface-700/80 border border-white/10 text-sky-400 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-sky-400">
                        {sec.section} Section
                      </span>
                      <span className="text-xs text-slate-400">· {sec.subtitle}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mt-0.5">{sec.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {sec.topics.length} Core Modules
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 bg-surface-900/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sec.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-surface-800 border border-white/5 rounded-xl p-4 space-y-2 hover:border-white/15 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-bold text-slate-100">{topic.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {topic.weightage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pl-6">
                          {topic.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={onGoToDailyCommand}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 transition"
                    >
                      <span>Practice in Daily Command</span>
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
