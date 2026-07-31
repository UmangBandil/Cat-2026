export type SyllabusSection = "QA" | "VARC" | "DILR";

export type TopicDetail = {
  id: string;
  name: string;
  section: SyllabusSection;
  weightage: string; // e.g. "High (8-10 Qs)", "Medium (4-6 Qs)"
  importance: "Critical" | "High" | "Moderate";
  description: string;
};

export type SectionSyllabus = {
  section: SyllabusSection;
  title: string;
  subtitle: string;
  iconName: "Brain" | "BookOpen" | "Puzzle";
  gradient: string;
  color: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  topics: TopicDetail[];
};

export const catSyllabusData: SectionSyllabus[] = [
  {
    section: "QA",
    title: "Quantitative Aptitude",
    subtitle: "22 Questions · 40 Minutes · Numerical Problem Solving",
    iconName: "Brain",
    gradient: "from-sky-500/20 to-blue-600/10 border-sky-500/30",
    color: "sky",
    totalQuestions: 22,
    timeLimitMinutes: 40,
    topics: [
      {
        id: "qa_arith",
        name: "Arithmetic",
        section: "QA",
        weightage: "High (8–10 Qs)",
        importance: "Critical",
        description: "Percentages, Profit & Loss, SI/CI, Ratios, Averages, Mixtures, TSD, Time & Work.",
      },
      {
        id: "qa_alg",
        name: "Algebra",
        section: "QA",
        weightage: "High (6–8 Qs)",
        importance: "Critical",
        description: "Linear/Quadratic Equations, Inequalities, Modulus, Logarithms, Functions, AP/GP.",
      },
      {
        id: "qa_geom",
        name: "Geometry & Mensuration",
        section: "QA",
        weightage: "Medium (3–5 Qs)",
        importance: "High",
        description: "Triangles, Circles, Polygons, 2D/3D Mensuration, Coordinate Geometry, Trigonometry.",
      },
      {
        id: "qa_num",
        name: "Number Systems",
        section: "QA",
        weightage: "Medium (2–3 Qs)",
        importance: "High",
        description: "Divisibility, Remainders, Totient Function, Factors, HCF & LCM, Base Systems.",
      },
      {
        id: "qa_mod",
        name: "Modern Math",
        section: "QA",
        weightage: "Moderate (2–3 Qs)",
        importance: "Moderate",
        description: "Permutations & Combinations, Probability, Set Theory, Venn Diagrams.",
      },
    ],
  },
  {
    section: "VARC",
    title: "Verbal Ability & Reading Comprehension",
    subtitle: "24 Questions · 40 Minutes · Comprehension & Logic",
    iconName: "BookOpen",
    gradient: "from-violet-500/20 to-purple-600/10 border-violet-500/30",
    color: "violet",
    totalQuestions: 24,
    timeLimitMinutes: 40,
    topics: [
      {
        id: "varc_rc",
        name: "Reading Comprehension (RC)",
        section: "VARC",
        weightage: "High (16 Qs · 4 Passages)",
        importance: "Critical",
        description: "Philosophy, Psychology, Science, History, Economics, Art & Sociology passages.",
      },
      {
        id: "varc_pj",
        name: "Para Jumbles",
        section: "VARC",
        weightage: "Medium (3–4 Qs)",
        importance: "High",
        description: "Sequencing 4-5 jumbled sentences into coherent paragraphs (TITA & MCQ).",
      },
      {
        id: "varc_sum",
        name: "Paragraph Summary",
        section: "VARC",
        weightage: "Medium (2–3 Qs)",
        importance: "High",
        description: "Selecting the most accurate central summary of a given paragraph.",
      },
      {
        id: "varc_ooo",
        name: "Odd-One-Out Sentences",
        section: "VARC",
        weightage: "Moderate (2 Qs)",
        importance: "Moderate",
        description: "Identifying the sentence that does not fit into the core theme of the paragraph.",
      },
    ],
  },
  {
    section: "DILR",
    title: "Data Interpretation & Logical Reasoning",
    subtitle: "20 Questions · 40 Minutes · 4 Sets of 5 Questions Each",
    iconName: "Puzzle",
    gradient: "from-emerald-500/20 to-teal-600/10 border-emerald-500/30",
    color: "emerald",
    totalQuestions: 20,
    timeLimitMinutes: 40,
    topics: [
      {
        id: "dilr_arr",
        name: "Seating Arrangements & Grid Matching",
        section: "DILR",
        weightage: "High (1–2 Sets)",
        importance: "Critical",
        description: "Linear, Circular, Matrix Matching, and Constraint Satisfaction puzzles.",
      },
      {
        id: "dilr_tourn",
        name: "Games & Tournaments",
        section: "DILR",
        weightage: "High (1 Set)",
        importance: "Critical",
        description: "Round-Robin tables, Knockout seedings, match scores, and qualification rules.",
      },
      {
        id: "dilr_di",
        name: "Data Interpretation & Charts",
        section: "DILR",
        weightage: "High (1–2 Sets)",
        importance: "High",
        description: "Tables with missing values, Bar Graphs, Line Graphs, Pie Charts, Spider Charts.",
      },
      {
        id: "dilr_venn",
        name: "Venn Diagrams & Max-Min",
        section: "DILR",
        weightage: "Medium (1 Set)",
        importance: "High",
        description: "3-Set & 4-Set Venn diagrams, Optimization of overlaps.",
      },
    ],
  },
];
