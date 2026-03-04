import { useState, useRef, useEffect } from "react";
import { Send, Mic, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  content:
    "Hei Markus! Jeg er K.I.T., din autonome AI-assistent. Jeg kan hjelpe deg med planlegging, problemløsning, og mye mer. Hva kan jeg gjøre for deg i dag?",
  role: "assistant",
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulert KIT-respons (erstattes med faktisk API-kall)
    setTimeout(() => {
      const kitMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "Jeg forstår. La meg tenke over dette og komme tilbake med et gjennomtenkt svar. Denne funksjonen kobles snart til en ekte AI-backend.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, kitMsg]);
    }, 800);
  }

  function toggleVoice() {
    setIsListening(!isListening);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Chat header */}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">K.I.T. AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Alltid klar til å hjelpe</p>
          </div>
        </div>
      </div>

      {/* Meldinger */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-white border border-border rounded-bl-md"
              )}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Stemmestyring */}
      <div className="bg-white border-t border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium">Stemmestyring</p>
            <p className="text-xs text-muted-foreground">
              {isListening ? "Aktiv" : "Inaktiv"}
            </p>
          </div>
          <button
            onClick={toggleVoice}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              isListening
                ? "bg-primary text-white animate-pulse"
                : "bg-primary/10 text-primary"
            )}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Skriv en melding til K.I.T...."
            className="flex-1 h-11 px-4 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
