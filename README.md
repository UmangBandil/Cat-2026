# CAT 2026 Command Center

Daily study tracker for CAT 2026 with **quiz-gated progress**.

## Features

- Daily tasks aligned to the 4-phase study plan (QA / VARC / DILR / Revision)
- **Quiz gate**: pass a short daily quiz (≥67%) after completing all tasks to lock the day into your streak
- Streak & completed-days counter
- Beautiful dark UI
- Progress stored in browser localStorage
- Ready for Vercel one-click deploy

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

1. Create a new empty repo on GitHub named `cat-2026-command`
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "CAT 2026 Command Center"
   git branch -M main
   git remote add origin https://github.com/UmangBandil/cat-2026-command.git
   git push -u origin main
   ```
3. Go to vercel.com → Import the repo → Deploy

## Extending the plan

Edit `src/data/plan.ts` and add more DayPlan objects.

## Stack

Next.js 15 · TypeScript · Tailwind · date-fns · lucide-react
