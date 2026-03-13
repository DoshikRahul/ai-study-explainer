"use client";

import React from "react";

export const GEMINI_MODELS = [
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", description: "Advanced intelligence & coding" },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash", description: "Frontier-class performance" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", description: "Advanced logical reasoning" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", description: "Fast daily tasks" },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
}

export default function ModelSelector({ selectedModel, onModelChange, disabled }: ModelSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        disabled={disabled}
        className="appearance-none rounded-xl border-2 border-slate-200 bg-white/80 py-2 pl-4 pr-10 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 disabled:opacity-50 hover:bg-white"
      >
        {GEMINI_MODELS.map((model) => (
          <option key={model.id} value={model.id} className="bg-white text-slate-800 font-medium">
            {model.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
