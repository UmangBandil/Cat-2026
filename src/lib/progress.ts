import { plan, DayPlan } from "@/data/plan";

export type DayProgress = {
  date: string;
  tasksCompleted: string[];
  quizPassed: boolean;
  quizScore: number;
  completedAt?: string;
};

const KEY = "cat2026-progress-v1";

export function loadProgress(): Record<string, DayProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(data: Record<string, DayProgress>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}

export function markTask(date: string, taskId: string, done: boolean): DayProgress {
  const all = loadProgress();
  const day = all[date] || { date, tasksCompleted: [], quizPassed: false, quizScore: 0 };
  if (done) {
    if (!day.tasksCompleted.includes(taskId)) day.tasksCompleted.push(taskId);
  } else {
    day.tasksCompleted = day.tasksCompleted.filter((id) => id !== taskId);
  }
  all[date] = day;
  saveProgress(all);
  return day;
}

export function markQuizPassed(date: string, score: number): DayProgress {
  const all = loadProgress();
  const day = all[date] || { date, tasksCompleted: [], quizPassed: false, quizScore: 0 };
  day.quizPassed = true;
  day.quizScore = score;
  day.completedAt = new Date().toISOString();
  all[date] = day;
  saveProgress(all);
  return day;
}

export function getStreak(dates: string[]): number {
  const progress = loadProgress();
  let streak = 0;
  const sorted = [...dates].sort().reverse();
  for (const d of sorted) {
    const day = progress[d];
    if (day?.quizPassed) streak++;
    else break;
  }
  return streak;
}

export function getCompletedCount(): number {
  const progress = loadProgress();
  return Object.values(progress).filter((d) => d.quizPassed).length;
}

export function getSectionCompletion(section: "QA" | "VARC" | "DILR" | "Revision") {
  const progress = loadProgress();
  let totalTasks = 0;
  let doneTasks = 0;

  plan.forEach((dayPlan) => {
    dayPlan.tasks.forEach((t) => {
      if (t.section === section) {
        totalTasks++;
        const dayProg = progress[dayPlan.date];
        if (dayProg?.tasksCompleted?.includes(t.id)) {
          doneTasks++;
        }
      }
    });
  });

  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  return { doneTasks, totalTasks, percentage };
}

export function getOverallProgress() {
  const progress = loadProgress();
  const totalTasks = plan.reduce((acc, p) => acc + p.tasks.length, 0);
  let doneTasks = 0;

  Object.values(progress).forEach((day) => {
    doneTasks += day.tasksCompleted.length;
  });

  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  return { doneTasks, totalTasks, percentage };
}
