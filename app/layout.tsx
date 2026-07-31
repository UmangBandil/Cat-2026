import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAT 2026 Command Center",
  description: "Daily tasks + quiz-gated progress tracker for CAT 2026. Built for 99+ percentile.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
