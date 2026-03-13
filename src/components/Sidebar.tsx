"use client";

import React from "react";
import { ChatSession } from "@/app/page";

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Panel */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 shadow-2xl shadow-indigo-100/50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Chat History</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) setIsOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 py-3.5 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New Topic
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
          {chats.length === 0 ? (
            <p className="mt-8 text-center text-sm font-medium text-slate-400">No previous topics.</p>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    onSelectChat(chat.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={`w-full truncate rounded-2xl px-4 py-3 text-left text-sm transition-all mb-2 ${
                    activeChatId === chat.id
                      ? "bg-white border-2 border-indigo-200 text-indigo-700 shadow-md shadow-indigo-100/50 translate-x-1"
                      : "text-slate-600 hover:bg-slate-50 border-2 border-transparent hover:border-slate-100"
                  }`}
                >
                  <div className="truncate font-bold text-base">{chat.topic || "New Conversation"}</div>
                  <div className={`mt-1 truncate text-xs font-semibold ${
                    activeChatId === chat.id ? "text-indigo-400" : "text-slate-400"
                  }`}>
                    {chat.model.replace('gemini-', 'Gemini ')} • {new Date(chat.timestamp).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
