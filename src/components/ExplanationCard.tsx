"use client";

import React from "react";

interface ExplanationCardProps {
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
  topic?: string | null;
  model?: string | null;
}

export default function ExplanationCard({
  explanation,
  isLoading,
  error,
  topic,
  model,
}: ExplanationCardProps) {
  if (!isLoading && !explanation && !error) {
    return (
      <div id="explanation-placeholder" className="w-full">
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="mb-4 text-6xl animate-float">📚</div>
          <h3 className="mb-2 text-xl font-bold text-slate-800">
            Ready to learn?
          </h3>
          <p className="max-w-md text-slate-500">
            Enter any study topic above and click{" "}
            <span className="font-bold text-orange-500">Explain ✨</span> to
            get a clear, fun, and simple explanation.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div id="explanation-loading" className="w-full">
        <div className="rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-5">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 shadow-md">
                <svg
                  className="h-6 w-6 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">
                Thinking hard... 🧠
              </p>
              <p className="text-sm font-medium text-slate-500">
                Our AI is putting together the best explanation for you!
              </p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" style={{ animationDelay: "150ms" }} />
            <div className="h-4 w-4/6 animate-pulse rounded-full bg-slate-100" style={{ animationDelay: "300ms" }} />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" style={{ animationDelay: "450ms" }} />
            <div className="h-4 w-3/6 animate-pulse rounded-full bg-slate-100" style={{ animationDelay: "600ms" }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="explanation-error" className="w-full">
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 shadow-inner">
              <svg
                className="h-6 w-6 text-rose-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-rose-800">
                Oops! Something went wrong 🙈
              </p>
              <p className="mt-1 text-sm font-medium text-rose-600/80">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="explanation-output" className="w-full">
      <div className="rounded-3xl border-2 border-indigo-100 bg-white p-8 shadow-xl shadow-indigo-100/50">
        <div className="mb-6 flex items-center justify-between border-b-2 border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                {topic || "Explanation"}
              </h3>
              {model && (
                <p className="mt-0.5 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
                  ⚡ {model.replace('gemini-', 'Gemini ')}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
          {explanation!.split("\n").map((paragraph, index) => {
            if (!paragraph.trim()) return null;

            // Handle bullet points
            if (paragraph.trim().startsWith("* ") || paragraph.trim().startsWith("- ")) {
              return (
                <li key={index} className="ml-6 mb-2 list-disc font-medium">
                  {formatText(paragraph.trim().slice(2))}
                </li>
              );
            }

            // Handle headings (markdown **)
            if (paragraph.trim().startsWith("**") && paragraph.trim().endsWith("**")) {
              return (
                <h4 key={index} className="mt-6 mb-3 text-xl font-bold text-indigo-900">
                  {paragraph.trim().slice(2, -2)}
                </h4>
              );
            }

            return (
              <p key={index} className="mb-4">
                {formatText(paragraph)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Simple helper to handle bold text in markdown
function formatText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900 bg-amber-100 px-1 rounded">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
