import { addDays, format } from "date-fns";

export type Task = {
  id: string;
  section: "QA" | "VARC" | "DILR" | "Revision";
  title: string;
  description: string;
  duration: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type DayPlan = {
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1 to 120
  phase: 1 | 2 | 3 | 4;
  theme: string;
  tasks: Task[];
  quiz: QuizQuestion[];
};

// Curriculum topic schedule generators for 120 days (Aug 1, 2026 to Nov 29, 2026)
const qaTopics = [
  "Percentages & Successive % Change",
  "Profit, Loss & Discount",
  "Simple & Compound Interest",
  "Ratios, Proportions & Variations",
  "Averages & Weighted Average",
  "Mixtures & Alligation",
  "Time, Speed & Distance Basics",
  "Relative Speed, Boats & Races",
  "Time & Work / Pipes & Cisterns",
  "Number Systems: Divisibility & Remainders",
  "Factors, HCF & LCM",
  "Base Systems & Factorial Powers",
  "Linear Equations & Special Equations",
  "Quadratic Equations & Roots",
  "Polynomials & Higher Degree Equations",
  "Inequalities & Modulus Equations",
  "Logarithms & Exponents",
  "Functions & Graphs",
  "Sequence, Series & AP/GP/HP",
  "P&C: Permutations & Combinations",
  "Probability & Conditional Prob",
  "Lines, Angles & Triangles",
  "Circles & Polygons",
  "Mensuration 2D & 3D Solids",
  "Coordinate Geometry",
  "Trigonometry & Heights/Distances",
  "Set Theory & Venn Diagrams",
];

const varcTopics = [
  "RC: Editorial Reading & Main Idea Mapping",
  "RC: Philosophy & Psychology Passages",
  "RC: Science, Tech & Environment Passages",
  "RC: History, Sociology & Art Passages",
  "RC: Economics & Business Passages",
  "RC: Author Tone & Attitude Questions",
  "RC: Inference & Fact-Based Questions",
  "RC: Option Elimination Techniques",
  "VA: Para Jumbles (4 & 5 Sentences)",
  "VA: Paragraph Summary & Central Idea",
  "VA: Odd-One-Out Sentences",
  "VA: Sentence Completion & Fillers",
  "Critical Reasoning: Assumptions",
  "Critical Reasoning: Strengthen & Weaken",
  "Critical Reasoning: Must Be True",
];

const dilrTopics = [
  "DILR: Linear Seating Arrangements",
  "DILR: Circular & Polygonal Seating",
  "DILR: Matrix Grid Matching Puzzles",
  "DILR: Data Tables & Missing Data",
  "DILR: Bar Graphs & Line Charts",
  "DILR: Pie Charts & Dual Charts",
  "DILR: Caselets & Paragraph DI",
  "DILR: 3-Set & 4-Set Venn Diagrams",
  "DILR: Round-Robin Tournaments",
  "DILR: Knockout Tournaments & Seeds",
  "DILR: Games, Scoring & Rules",
  "DILR: Scheduling & Timetables",
  "DILR: Routes, Networks & Paths",
  "DILR: Binary Logic & Truth-Tellers",
  "DILR: Max-Min Optimization Sets",
];

const quizPool: QuizQuestion[] = [
  {
    question: "If price increases by 20% and consumption decreases by 10%, net expenditure change is?",
    options: ["+10%", "+8%", "+12%", "-2%"],
    correctIndex: 1,
    explanation: "Net change = 1.20 × 0.90 = 1.08 → +8% increase.",
  },
  {
    question: "Successive discounts of 30% and 20% is equivalent to a single discount of?",
    options: ["50%", "44%", "40%", "56%"],
    correctIndex: 1,
    explanation: "1 - (0.7 × 0.8) = 0.44 → 44%.",
  },
  {
    question: "Difference between CI and SI for 2 years at rate R on Principal P is?",
    options: ["P(R/100)²", "P(R/100)", "2PR/100", "PR²/100"],
    correctIndex: 0,
    explanation: "CI - SI (2 years) = P(R/100)².",
  },
  {
    question: "In a single round-robin tournament with 8 teams, total matches played will be?",
    options: ["28", "56", "32", "64"],
    correctIndex: 0,
    explanation: "8 × 7 / 2 = 28 matches.",
  },
  {
    question: "Which of the following is the best strategy for RC option elimination?",
    options: ["Pick options with strongest words", "Eliminate out-of-scope & distorted choices", "Guess randomly", "Only read first paragraph"],
    correctIndex: 1,
    explanation: "Eliminating out-of-scope, extreme, and distorted options is key to high VARC accuracy.",
  },
  {
    question: "In 8-player single knockout tournament, total matches required to decide winner is?",
    options: ["7", "8", "16", "12"],
    correctIndex: 0,
    explanation: "N - 1 = 8 - 1 = 7 matches.",
  },
  {
    question: "Remainder when 2^100 is divided by 3 is?",
    options: ["1", "2", "0", "Cannot be determined"],
    correctIndex: 0,
    explanation: "2 ≡ -1 (mod 3). (-1)^100 = 1 (mod 3).",
  },
  {
    question: "Sum of roots of quadratic equation 3x² - 12x + 7 = 0 is?",
    options: ["4", "-4", "7/3", "12"],
    correctIndex: 0,
    explanation: "-b/a = -(-12)/3 = 4.",
  },
];

function generate120DayPlan(): DayPlan[] {
  const startDate = new Date(2026, 7, 1); // Aug 1, 2026
  const plans: DayPlan[] = [];

  for (let i = 0; i < 120; i++) {
    const currentDateObj = addDays(startDate, i);
    const dateStr = format(currentDateObj, "yyyy-MM-dd");
    const dayNumber = i + 1;

    let phase: 1 | 2 | 3 | 4 = 1;
    if (dayNumber <= 46) phase = 1;
    else if (dayNumber <= 76) phase = 2;
    else if (dayNumber <= 102) phase = 3;
    else phase = 4;

    const qaTopic = qaTopics[i % qaTopics.length];
    const varcTopic = varcTopics[i % varcTopics.length];
    const dilrTopic = dilrTopics[i % dilrTopics.length];

    let theme = "";
    if (phase === 1) theme = `Foundation: ${qaTopic.split(":")[0]}`;
    else if (phase === 2) theme = `Speed & Practice: ${qaTopic}`;
    else if (phase === 3) theme = `Sectional Drills & Mixed Practice`;
    else theme = `Final CAT Sprint & Full Mock Analysis`;

    const q1 = quizPool[i % quizPool.length];
    const q2 = quizPool[(i + 1) % quizPool.length];

    plans.push({
      date: dateStr,
      dayNumber,
      phase,
      theme,
      tasks: [
        {
          id: `qa_d${dayNumber}`,
          section: "QA",
          title: `Quant: ${qaTopic}`,
          description: `Concept review + 25-30 targeted practice questions. Focus on high-accuracy solving.`,
          duration: "2.5h",
        },
        {
          id: `varc_d${dayNumber}`,
          section: "VARC",
          title: `VARC: ${varcTopic}`,
          description: `Read 2 editorials + solve 2 RC passages. Focus on main idea and option elimination.`,
          duration: "2h",
        },
        {
          id: `dilr_d${dayNumber}`,
          section: "DILR",
          title: `DILR: ${dilrTopic}`,
          description: `Solve 3-4 clean CAT-style sets. Draw clear diagrams and track solving speed.`,
          duration: "2h",
        },
        {
          id: `rev_d${dayNumber}`,
          section: "Revision",
          title: `Error Log & Formula Review`,
          description: `Log today's mistakes into your notebook and revise core formulas for QA & DILR.`,
          duration: "1h",
        },
      ],
      quiz: [q1, q2],
    });
  }

  return plans;
}

export const plan: DayPlan[] = generate120DayPlan();

export function getTodayPlan(dateStr?: string): DayPlan {
  const d = dateStr || format(new Date(), "yyyy-MM-dd");
  return plan.find((p) => p.date === d) || plan[0];
}

export function getAllDates(): string[] {
  return plan.map((p) => p.date);
}
