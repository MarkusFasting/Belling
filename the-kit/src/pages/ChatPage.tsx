import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Mic, MicOff, Bot, User, Loader2, Volume2, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKIT } from "@/contexts/KITContext";
import { isSpeechSupported, startListening, stopListening, speak } from "@/services/speech";
import type { StoredMessage } from "@/services/storage";

const MODULE_NAMES: Record<string, string> = {
  main: "K.I.T. AI Assistant",
  "dj-musikk": "DJ & Musikk",
  filosofi: "Filosofi",
  psykologi: "Psykologi",
  "personlig-trener": "Personlig Trener",
  "kostholds-ekspert": "Kostholds Ekspert",
  "beste-venn": "Beste Venn",
  "super-sekretar": "Super Sekretær",
  sparringspartner: "Sparringspartner",
  "web-analyse": "Web Analyse",
};

const MODULE_WELCOME: Record<string, string> = {
  main: "Hei! Jeg er K.I.T., din autonome AI-assistent. Hva kan jeg hjelpe deg med i dag?",
  "dj-musikk": "Hei! Jeg er din DJ- og musikkekspert. Spør meg om mixing, BPM, musikkproduksjon eller nye artister!",
  filosofi: "Velkommen til filosofisk refleksjon. La oss utforske de store spørsmålene sammen.",
  psykologi: "Hei! Jeg er her for å gi psykologisk innsikt og støtte. Hva tenker du på?",
  "personlig-trener": "Klar for trening! Jeg kan lage treningsprogram, gi teknikktips og motivere deg.",
  "kostholds-ekspert": "Hei! La meg hjelpe deg med ernæring og kosthold. Hva lurer du på?",
  "beste-venn": "Hei Markus! Hyggelig å snakke med deg. Hva har du på hjertet?",
  "super-sekretar": "God dag! Jeg er klar til å hjelpe med organisering, planlegging og administrasjon.",
  sparringspartner: "La oss tenke strategisk. Legg frem en idé eller utfordring, så sparrer vi!",
  "web-analyse": "Klar for å analysere nettsider og data. Hva vil du undersøke?",
};

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("module") || "main";
  const moduleName = MODULE_NAMES[moduleId] || "K.I.T. AI Assistant";

  const { sendChatMessage, getChatHistory, isConnected } = useKIT();
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Last chat-historikk fra localStorage
  useEffect(() => {
    const history = getChatHistory(moduleId);
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Velkomstmelding
      setMessages([
        {
          id: "welcome",
          content: MODULE_WELCOME[moduleId] || MODULE_WELCOME.main,
          role: "assistant",
          timestamp: new Date().toISOString(),
          moduleId,
        },
      ]);
    }
  }, [moduleId, getChatHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setError(null);

    // Vis brukermelding umiddelbart
    const userMsg: StoredMessage = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date().toISOString(),
      moduleId,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(moduleId, text);

      const assistantMsg: StoredMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date().toISOString(),
        moduleId,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
    } finally {
      setIsLoading(false);
    }
  }

  function toggleVoice() {
    if (!isSpeechSupported()) {
      setError("Talegjenkjenning støttes ikke i denne nettleseren");
      return;
    }

    if (isListening) {
      stopListening();
      setIsListening(false);
      setInterimText("");
      // Hvis det ble sagt noe, legg det i input
    } else {
      setIsListening(true);
      startListening(
        (transcript, isFinal) => {
          if (isFinal) {
            setInput((prev) => prev + transcript);
            setInterimText("");
          } else {
            setInterimText(transcript);
          }
        },
        () => {
          setIsListening(false);
          setInterimText("");
        }
      );
    }
  }

  function speakMessage(text: string) {
    speak(text);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Chat header */}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-sm">{moduleName}</h2>
            <div className="flex items-center gap-1">
              {isConnected ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">Tilkoblet OpenAI</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-warning" />
                  <span className="text-xs text-warning">Lokal modus</span>
                </>
              )}
            </div>
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
            <div className={cn("max-w-[80%]", msg.role === "user" ? "text-right" : "")}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-white border border-border rounded-bl-md"
                )}
              >
                {msg.content}
              </div>
              {msg.role === "assistant" && msg.id !== "welcome" && (
                <button
                  onClick={() => speakMessage(msg.content)}
                  className="mt-1 p-1 text-muted-foreground hover:text-primary transition-colors"
                  title="Les opp"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Stemmestyring */}
      <div className="bg-white border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Stemmestyring</p>
            <p className="text-xs text-muted-foreground">
              {isListening ? "Lytter..." : isSpeechSupported() ? "Trykk for å snakke" : "Ikke støttet"}
            </p>
            {interimText && (
              <p className="text-xs text-primary italic mt-1">"{interimText}"</p>
            )}
          </div>
          <button
            onClick={toggleVoice}
            disabled={!isSpeechSupported()}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-200"
                : "bg-primary/10 text-primary hover:bg-primary/20",
              !isSpeechSupported() && "opacity-40 cursor-not-allowed"
            )}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Skriv en melding til K.I.T...."
            disabled={isLoading}
            className="flex-1 h-11 px-4 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
