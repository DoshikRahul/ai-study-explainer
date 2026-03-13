"use client";

import React, { useState } from "react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export default function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic to continue.");
      return;
    }
    setError("");
    onSubmit(topic.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          id="topic-input"
          type="text"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Photosynthesis, Quantum Physics, World War II..."
          disabled={isLoading}
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-6 py-5 pr-40 text-lg text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-300 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 disabled:opacity-50 hover:border-slate-300"
        />
        <button
          id="explain-button"
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:from-amber-300 hover:to-orange-400 hover:-translate-y-0.5 hover:shadow-orange-500/40 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
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
              Thinking...
            </span>
          ) : (
            "Explain ✨"
          )}
        </button>
      </div>
      {error && (
        <p
          id="input-error"
          className="mt-3 flex items-center gap-2 text-sm font-medium text-rose-500"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </form>
  );
}
