"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ModelSelector from "@/components/ModelSelector";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { ChatMessageData } from "@/components/ChatMessage";

export interface ChatSession {
  id: string;
  topic: string;
  messages: ChatMessageData[];
  model: string;
  timestamp: number;
}

export default function Home() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");
  
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    const savedChats = localStorage.getItem("studyExplainerChats");
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        
        // Migrate old v3 single-turn objects to v4 array if needed
        const migrated = parsed.map((c: any) => {
          if (c.messages) return c;
          return {
            ...c,
            messages: [
              { id: Date.now() + "-usr", role: "user", text: c.topic, timestamp: c.timestamp },
              { id: Date.now() + "-mod", role: "model", text: c.explanation || "No explanation", timestamp: c.timestamp + 100 }
            ]
          };
        });

        setChats(migrated);
        
        // Optionally auto-load the most recent chat
        if (migrated.length > 0) {
          setActiveChatId(migrated[0].id);
          setSelectedModel(migrated[0].model || "gemini-3-flash-preview");
        }
      } catch (err) {
        console.error("Failed to parse chat history:", err);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("studyExplainerChats", JSON.stringify(chats));
  }, [chats]);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatId, isLoading]);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const currentMessages = activeChat?.messages || [];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    let currentSessionId = activeChatId;

    // Create user message
    const userMessage: ChatMessageData = {
      id: Date.now().toString(),
      role: "user",
      text: text,
      timestamp: Date.now(),
    };

    let sessionMessages = currentMessages.length > 0 ? [...currentMessages, userMessage] : [userMessage];

    // If no active chat, create a new one!
    if (!currentSessionId) {
      const newChat: ChatSession = {
        id: Date.now().toString(),
        topic: text.slice(0, 40) + (text.length > 40 ? "..." : ""),
        messages: sessionMessages,
        model: selectedModel,
        timestamp: Date.now(),
      };
      setChats([newChat, ...chats]);
      currentSessionId = newChat.id;
      setActiveChatId(newChat.id);
    } else {
      // Append user message to existing active chat
      setChats(prev => prev.map(chat => 
        chat.id === currentSessionId 
          ? { ...chat, messages: sessionMessages, model: selectedModel } 
          : chat
      ));
    }

    try {
      // Prepare payload (convert to role/text format expected by API)
      const apiPayload = sessionMessages.map(msg => ({
        role: msg.role === "error" ? "user" : msg.role, // fallback
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: apiPayload, 
          model: selectedModel 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response.");
      }

      const modelMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.response,
        timestamp: Date.now(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentSessionId 
          ? { ...chat, messages: [...chat.messages, modelMessage] } 
          : chat
      ));
    } catch (err: any) {
      const errorMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        role: "error",
        text: err.message || "An unexpected error occurred.",
        timestamp: Date.now(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentSessionId 
          ? { ...chat, messages: [...chat.messages, errorMessage] } 
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTopic = () => {
    setActiveChatId(null);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-50">
      {/* Bright, cheerful background gradient effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-amber-200/40 blur-[100px] animate-float" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-200/50 blur-[120px] animate-float-delayed" />
        <div className="absolute -bottom-40 left-1/3 h-[700px] w-[700px] rounded-full bg-pink-200/30 blur-[120px] animate-float" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <Sidebar 
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => { 
          setActiveChatId(id); 
          const chat = chats.find(c => c.id === id);
          if (chat) setSelectedModel(chat.model);
        }}
        onNewChat={handleNewTopic}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex w-full flex-col md:pl-72 z-10 h-screen transition-all duration-300">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-white border-b-slate-200/50 bg-white/60 p-4 backdrop-blur-xl shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <h1 className="text-xl font-black tracking-tight text-slate-800 hidden sm:block">
                Study<span className="text-indigo-600">Explainer</span>
              </h1>
            </div>
          </div>
          
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
            disabled={isLoading}
          />
        </header>

        {/* Scrollable Chat Feed */}
        <main className="flex-1 overflow-y-auto px-4 w-full custom-scrollbar">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center py-8 md:py-12">
            
            {/* Empty State / Welcome Screen */}
            {!activeChat && currentMessages.length === 0 && (
              <div className="mt-12 md:mt-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-600 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                  </span>
                  Powered by Futuristic Google AI
                </div>
                <h1 className="mb-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-5xl md:text-6xl font-black tracking-tight text-transparent drop-shadow-sm px-2">
                  What do you want to learn?
                </h1>
                <p className="mx-auto max-w-lg text-lg font-medium text-slate-500 leading-relaxed px-4">
                  Ask me about Photosynthesis, Quantum Physics, History, Math, or anything you're curious about!
                </p>
              </div>
            )}

            {/* Chat Messages */}
            <div className="w-full flex flex-col pt-4">
              {currentMessages.map((msg) => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  modelName={msg.role === 'model' ? activeChat?.model : undefined} 
                />
              ))}

              {isLoading && (
                <div className="flex w-full justify-start mb-8 animate-in fade-in zoom-in-95 duration-300">
                  <div className="max-w-[85%] rounded-3xl rounded-tl-sm border-2 border-slate-100 bg-white px-8 py-6 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 animate-pulse">
                        <span className="text-white text-lg">🧠</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">Thinking hard...</p>
                        <div className="mt-2 flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-10 w-full shrink-0" />
            </div>
            
          </div>
        </main>

        {/* Sticky Bottom Input Section */}
        <section className="sticky bottom-0 z-20 w-full border-t border-slate-200/50 bg-white/70 px-4 py-4 backdrop-blur-xl md:px-8 shadow-[0_-10px_40px_rgba(255,255,255,0.8)] shrink-0">
          <div className="mx-auto w-full max-w-4xl relative pb-2 md:pb-0">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            <footer className="mt-3 text-center text-xs font-semibold text-slate-400">
              <p>AI can make mistakes. Please verify important information. ✨</p>
            </footer>
          </div>
        </section>

      </div>
    </div>
  );
}
