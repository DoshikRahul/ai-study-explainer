import React from "react";

export type MessageRole = "user" | "model" | "error";

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}

interface ChatMessageProps {
  message: ChatMessageData;
  modelName?: string;
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

export default function ChatMessage({ message, modelName }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.role === "error";

  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="max-w-[85%] rounded-3xl rounded-tr-sm bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-4 text-white shadow-md shadow-indigo-200/50">
          <p className="text-lg leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full justify-start mb-6">
        <div className="max-w-[90%] rounded-3xl rounded-tl-sm border-2 border-rose-200 bg-rose-50 px-6 py-4 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🙈</span>
            <div>
              <p className="font-bold text-rose-800">Oops! Something went wrong</p>
              <p className="mt-1 text-sm font-medium text-rose-600/80">{message.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-8">
      <div className="w-full rounded-3xl rounded-tl-sm border-2 border-slate-100 bg-white p-6 md:p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-200/50">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">AI Explainer</h4>
            {modelName && (
              <p className="text-xs font-bold text-slate-400">
                ⚡ {modelName.replace('gemini-', 'Gemini ')}
              </p>
            )}
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
          {message.text.split("\n").map((paragraph, index) => {
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
