"use client";

import { useEffect, useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  CheckCircle2,
  Circle,
  Brain,
  BookOpen,
  Puzzle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  Sparkles,
  Calendar,
  Trophy,
  Flame,
} from "lucide-react";
import { plan, DayPlan, getAllDates } from "@/data/plan";
import {
  loadProgress,
  markTask,
  markQuizPassed,
  getStreak,
  getCompletedCount,
  getOverallProgress,
  DayProgress,
} from "@/lib/progress";
import { CourseHeader } from "@/components/CourseHeader";
import { CourseProgressTab } from "@/components/CourseProgressTab";
import { SyllabusView } from "@/components/SyllabusView";

const sectionIcon = { QA: Brain, VARC: BookOpen, DILR: Puzzle, Revision: RotateCcw };
const sectionColor = {
  QA: "from-sky-500/20 to-sky-600/10 border-sky-500/30",
  VARC: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
  DILR: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  Revision: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"command" | "progress" | "syllabus">("command");
  const [currentDate, setCurrentDate] = useState<string>("2026-08-01");
  const [progress, setProgress] = useState<Record<string, DayProgress>>({});

  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dayPlan: DayPlan = useMemo(
    () => plan.find((p) => p.date === currentDate) || plan[0],
    [currentDate]
  );

  const dayProgress = progress[currentDate];
  const allDates = useMemo(() => getAllDates(), []);
  const streak = mounted ? getStreak(allDates) : 0;
  const completedDays = mounted ? getCompletedCount() : 0;
  const { percentage } = mounted ? getOverallProgress() : { percentage: 0 };

  useEffect(() => {
    setMounted(true);
    const loaded = loadProgress();
    setProgress(loaded);

    const today = new Date().toISOString().slice(0, 10);
    if (plan.some((p) => p.date === today)) {
      setCurrentDate(today);
    }
  }, []);

  const tasksDone = dayProgress?.tasksCompleted?.length || 0;
  const totalTasks = dayPlan.tasks.length;
  const allTasksDone = tasksDone >= totalTasks && totalTasks > 0;
  const dayComplete = dayProgress?.quizPassed || false;

  const handleToggleTask = (taskId: string) => {
    if (dayComplete) return;
    const currentlyDone = dayProgress?.tasksCompleted?.includes(taskId);
    const updated = markTask(currentDate, taskId, !currentlyDone);
    setProgress((prev) => ({ ...prev, [currentDate]: updated }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    dayPlan.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) score++;
    });
    const passed = score >= Math.ceil(dayPlan.quiz.length * 0.67);
    if (passed) {
      const updated = markQuizPassed(currentDate, score);
      setProgress((prev) => ({ ...prev, [currentDate]: updated }));
    }
    setQuizSubmitted(true);
  };

  const goDay = (dir: -1 | 1) => {
    const idx = allDates.indexOf(currentDate);
    const next = allDates[idx + dir];
    if (next) {
      setCurrentDate(next);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setQuizAnswers([]);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-900">
        <div className="animate-pulse text-slate-400 font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" /> Loading CAT 2026 Command Center…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-900 via-surface-900 to-surface-800 text-slate-100 antialiased">
      {/* Top Persistent Header */}
      <CourseHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "progress" && (
          <CourseProgressTab onNavigateToCommand={() => setActiveTab("command")} />
        )}

        {activeTab === "syllabus" && (
          <SyllabusView onGoToDailyCommand={() => setActiveTab("command")} />
        )}

        {activeTab === "command" && (
          <div className="space-y-6">
            {/* Day Selector & Phase Indicator */}
            <div className="bg-surface-800/80 border border-white/10 rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => goDay(-1)}
                  disabled={allDates.indexOf(currentDate) === 0}
                  className="p-2 rounded-xl hover:bg-white/5 disabled:opacity-30 transition flex items-center gap-1 text-xs font-semibold text-slate-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Prev Day</span>
                </button>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Day {dayPlan.dayNumber} of 120
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Phase {dayPlan.phase}
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-white mt-1">
                    {format(parseISO(currentDate), "EEEE, d MMMM yyyy")}
                  </div>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">
                    {dayPlan.theme}
                  </div>
                </div>

                <button
                  onClick={() => goDay(1)}
                  disabled={allDates.indexOf(currentDate) === allDates.length - 1}
                  className="p-2 rounded-xl hover:bg-white/5 disabled:opacity-30 transition flex items-center gap-1 text-xs font-semibold text-slate-300"
                >
                  <span className="hidden sm:inline">Next Day</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* 120-Day Quick Selector Slider */}
              <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={dayPlan.dayNumber}
                  onChange={(e) => {
                    const dayIdx = parseInt(e.target.value, 10) - 1;
                    if (allDates[dayIdx]) {
                      setCurrentDate(allDates[dayIdx]);
                      setShowQuiz(false);
                      setQuizSubmitted(false);
                      setQuizAnswers([]);
                    }
                  }}
                  className="w-full h-1.5 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <span className="text-xs font-bold text-slate-400 shrink-0 min-w-[50px] text-right">
                  {dayPlan.dayNumber}/120
                </span>
              </div>
            </div>

            {/* Daily Lock Progress Bar */}
            <div className="bg-surface-800/80 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Daily Lock Progress</span>
                <span className={dayComplete ? "text-emerald-400" : "text-slate-300"}>
                  {dayComplete ? "✓ Day Locked & Passed" : `${tasksDone}/${totalTasks} tasks completed`}
                </span>
              </div>

              <div className="h-2.5 bg-surface-700 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dayComplete ? "bg-emerald-500" : "bg-sky-500"
                  }`}
                  style={{
                    width: `${dayComplete ? 100 : (tasksDone / Math.max(totalTasks, 1)) * 80}%`,
                  }}
                />
              </div>

              {!dayComplete && allTasksDone && (
                <p className="text-xs text-amber-400 font-medium pt-1 flex items-center gap-1.5 animate-pulse">
                  <Unlock className="w-3.5 h-3.5" /> All tasks completed! Take the Daily Knowledge Quiz to lock progress into your streak.
                </p>
              )}
            </div>

            {/* Tasks List */}
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Today&apos;s Daily Study Tasks
              </h2>

              {dayPlan.tasks.map((task) => {
                const Icon = sectionIcon[task.section];
                const done = dayProgress?.tasksCompleted?.includes(task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    disabled={dayComplete}
                    className={`w-full text-left rounded-2xl border p-4.5 transition-all duration-200 ${
                      done
                        ? "bg-emerald-500/10 border-emerald-500/30 shadow-md shadow-emerald-500/5"
                        : `bg-gradient-to-br ${sectionColor[task.section]} hover:scale-[1.005] hover:border-white/20`
                    } ${dayComplete ? "opacity-80 cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5">
                        {done ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Icon className="w-4 h-4 opacity-80 text-sky-400" />
                          <span className="text-xs font-bold uppercase tracking-wide opacity-80">
                            {task.section} Section
                          </span>
                          <span className="text-xs text-slate-400">· {task.duration}</span>
                        </div>
                        <div
                          className={`text-base font-bold mt-1 text-slate-100 ${
                            done ? "line-through opacity-70" : ""
                          }`}
                        >
                          {task.title}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </section>

            {/* Daily Quiz Gate Button */}
            <section className="space-y-3 pt-2">
              {!dayComplete && (
                <button
                  onClick={() => setShowQuiz(true)}
                  disabled={!allTasksDone}
                  className={`w-full rounded-2xl py-4 font-bold text-sm transition flex items-center justify-center gap-2 ${
                    allTasksDone
                      ? "bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white shadow-xl shadow-sky-500/20 cursor-pointer"
                      : "bg-surface-700/80 border border-white/5 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {allTasksDone ? (
                    <>
                      <Unlock className="w-5 h-5 text-amber-300" /> Take Daily Knowledge Quiz to Lock Progress
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-slate-500" /> Complete all 4 daily tasks above to unlock quiz gate
                    </>
                  )}
                </button>
              )}

              {dayComplete && (
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center space-y-1">
                  <div className="text-emerald-400 font-extrabold flex items-center justify-center gap-2 text-base">
                    <Trophy className="w-5 h-5 text-amber-400" /> Day Progress Successfully Locked
                  </div>
                  <p className="text-xs text-slate-300">
                    Passed Quiz Score: <span className="font-bold text-white">{dayProgress?.quizScore}/{dayPlan.quiz.length}</span> (≥67%)
                  </p>
                </div>
              )}
            </section>

            {/* Quiz Modal */}
            {showQuiz && !dayComplete && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
                <div className="bg-surface-800 border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">Daily Knowledge Check</h3>
                      <p className="text-xs text-slate-400">
                        Score ≥67% to mark Day {dayPlan.dayNumber} complete and add to your streak.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowQuiz(false);
                        setQuizSubmitted(false);
                        setQuizAnswers([]);
                      }}
                      className="text-slate-400 hover:text-white text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-700"
                    >
                      Close
                    </button>
                  </div>

                  {dayPlan.quiz.map((q, qi) => (
                    <div key={qi} className="space-y-2.5 bg-surface-900/60 p-4 rounded-2xl border border-white/5">
                      <p className="font-bold text-xs sm:text-sm text-slate-100">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          const isCorrect = oi === q.correctIndex;
                          let style = "border-white/10 hover:border-white/20 text-slate-300";
                          if (quizSubmitted) {
                            if (isCorrect) style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold";
                            else if (selected) style = "border-rose-500/50 bg-rose-500/10 text-rose-300";
                          } else if (selected) style = "border-sky-500 bg-sky-500/10 text-sky-300 font-bold";
                          return (
                            <button
                              key={oi}
                              disabled={quizSubmitted}
                              onClick={() => {
                                const next = [...quizAnswers];
                                next[qi] = oi;
                                setQuizAnswers(next);
                              }}
                              className={`w-full text-left text-xs px-3.5 py-3 rounded-xl border transition ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <p className="text-xs text-sky-400 pt-1 font-medium bg-sky-500/5 p-2 rounded-lg border border-sky-500/10">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={quizAnswers.filter((a) => a !== undefined).length < dayPlan.quiz.length}
                      className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 font-bold text-xs sm:text-sm text-white transition shadow-lg shadow-sky-500/20"
                    >
                      Submit Answers & Lock Progress
                    </button>
                  ) : (
                    <div className="text-center space-y-3 pt-2">
                      {(() => {
                        let score = 0;
                        dayPlan.quiz.forEach((q, i) => {
                          if (quizAnswers[i] === q.correctIndex) score++;
                        });
                        const passed = score >= Math.ceil(dayPlan.quiz.length * 0.67);
                        return passed ? (
                          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-sm">
                            🎉 Passed ({score}/{dayPlan.quiz.length})! Day {dayPlan.dayNumber} locked in!
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-sm">
                            Score {score}/{dayPlan.quiz.length}. Need ≥67%. Review explanations & try again!
                          </div>
                        );
                      })()}
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizSubmitted(false);
                          setQuizAnswers([]);
                        }}
                        className="text-xs text-slate-400 hover:text-white font-semibold underline"
                      >
                        Return to Command Center
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
