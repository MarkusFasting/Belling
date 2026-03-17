"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage } from "@/types";

interface ChatPanelProps {
  kommune: string;
  gnr: number;
  bnr: number;
}

const PREDEFINED_QUESTIONS = [
  "Hva er arealformålet?",
  "Er det avvik i dataene?",
  "Hvilke begrensninger gjelder?",
  "Hvem eier eiendommen?",
] as const;

function generateMockResponse(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content: "Denne funksjonen er under utvikling.",
    timestamp: new Date().toISOString(),
    sections: {
      fakta: "Denne funksjonen er under utvikling.",
      kilde: "Ingen kilde tilgjengelig ennå",
      tolkning: "AI-basert eiendomsrådgivning kommer snart.",
      uavklart: "Fullstendig AI-analyse krever backend-integrasjon.",
    },
  };
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-card bg-mineral text-white px-4 py-3 text-body-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-card bg-white border border-stone-border/50 px-4 py-3 text-body-sm text-ink">
        {message.sections ? (
          <div className="space-y-3">
            {message.sections.fakta && (
              <div>
                <p className="text-micro font-semibold uppercase tracking-wider text-ink-400 mb-1">
                  Fakta
                </p>
                <p className="text-ink-600">{message.sections.fakta}</p>
              </div>
            )}
            {message.sections.kilde && (
              <div>
                <p className="text-micro font-semibold uppercase tracking-wider text-ink-400 mb-1">
                  Kilde
                </p>
                <p className="text-ink-600">{message.sections.kilde}</p>
              </div>
            )}
            {message.sections.tolkning && (
              <div>
                <p className="text-micro font-semibold uppercase tracking-wider text-ink-400 mb-1">
                  Tolkning
                </p>
                <p className="text-ink-600">{message.sections.tolkning}</p>
              </div>
            )}
            {message.sections.uavklart && (
              <div>
                <p className="text-micro font-semibold uppercase tracking-wider text-ink-400 mb-1">
                  Uavklart
                </p>
                <p className="text-ink-600">{message.sections.uavklart}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-ink-600">{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default function ChatPanel({ kommune, gnr, bnr }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Simulate assistant response delay
      setTimeout(() => {
        const assistantMessage = generateMockResponse();
        setMessages((prev) => [...prev, assistantMessage]);
      }, 600);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-button text-body font-medium shadow-lg transition-all duration-200 hover:bg-ink-800 active:scale-[0.98]"
        aria-label="Åpne chat"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Spør om eiendommen
      </button>
    );
  }

  return (
    <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-stone-border/50 bg-stone-warm shadow-lg flex flex-col lg:sticky lg:top-0 lg:h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-border/50 bg-white px-4 py-3">
        <h2 className="text-body font-semibold text-ink-900">
          Spør om eiendommen
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-8 h-8 rounded-button text-ink-400 hover:text-ink hover:bg-stone-light transition"
          aria-label="Lukk chat"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Property context */}
      <div className="px-4 py-2 text-micro text-ink-400 border-b border-stone-border/30 bg-white/50">
        {kommune} - {gnr}/{bnr}
      </div>

      {/* Question chips */}
      {messages.length === 0 && (
        <div className="px-4 py-4 border-b border-stone-border/30">
          <p className="text-caption text-ink-400 mb-2">Foreslåtte spørsmål</p>
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                className="px-3 py-1.5 rounded-button border border-stone-border text-caption text-ink-600 hover:bg-white hover:border-mineral hover:text-mineral transition"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-stone-border/50 bg-white px-4 py-3 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Still et spørsmål om eiendommen..."
          className="input-base flex-1"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex items-center justify-center w-10 h-10 rounded-button bg-mineral text-white transition hover:bg-mineral-dark disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          aria-label="Send melding"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </aside>
  );
}
