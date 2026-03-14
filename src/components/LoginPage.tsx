"use client";

import React, { useState, useEffect } from "react";

interface LoginPageProps {
  onLogin: (username: string, apiKey: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim() || !apiKey.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    // In a real app we would verify the password here.
    // For this demonstration, we'll accept any password.
    
    // Save to local storage for persistence
    localStorage.setItem("luminaLearnUsername", username.trim());
    localStorage.setItem("geminiApiKey", apiKey.trim());
    
    setIsVisible(false);
    setTimeout(() => {
      onLogin(username.trim(), apiKey.trim());
    }, 300);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">
      
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-200/40 blur-[100px] animate-float" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-200/40 blur-[100px] animate-float-delayed" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`relative z-10 w-full max-w-md transform overflow-hidden rounded-3xl bg-white/80 p-8 text-left align-middle shadow-2xl backdrop-blur-xl transition-all duration-700 ease-out border border-white/50 ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/50 px-4 py-3.5 text-slate-800 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/50 px-4 py-3.5 text-slate-800 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              required
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/50 px-4 py-3.5 text-slate-800 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
              placeholder="AIzaSy..."
            />
            <p className="mt-2 text-xs text-slate-500 ml-1">
              Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:underline">Google AI Studio</a>.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 p-3 mt-2 border border-rose-100">
               <p className="text-sm font-medium text-rose-600 text-center">{error}</p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={!username.trim() || !password.trim() || !apiKey.trim()}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
