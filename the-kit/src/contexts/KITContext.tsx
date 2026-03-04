import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isOpenAIConfigured, createThread, chat as openaiChat } from "@/services/openai";
import {
  getProfile,
  saveProfile,
  getStats,
  trackInteraction,
  getAverageResponseTime,
  getThread,
  saveThread,
  addMessageToThread,
  type UserProfile,
  type StatsData,
  type StoredMessage,
  type StoredThread,
} from "@/services/storage";

interface KITState {
  // Tilkobling
  isConnected: boolean;
  status: "connected" | "offline" | "connecting";

  // Profil
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;

  // Stats
  stats: StatsData;
  avgResponseTime: number;
  refreshStats: () => void;

  // Chat
  sendChatMessage: (
    moduleId: string,
    message: string
  ) => Promise<string>;
  getChatHistory: (moduleId: string) => StoredMessage[];
  getOrCreateThreadId: (moduleId: string) => Promise<string>;
}

const KITContext = createContext<KITState | null>(null);

export function KITProvider({ children }: { children: React.ReactNode }) {
  const [isConnected] = useState(() => isOpenAIConfigured());
  const [status] = useState<"connected" | "offline">(
    isOpenAIConfigured() ? "connected" : "offline"
  );
  const [profile, setProfile] = useState<UserProfile>(() => getProfile());
  const [stats, setStats] = useState<StatsData>(() => getStats());
  const [avgResponseTime, setAvgResponseTime] = useState(() =>
    getAverageResponseTime()
  );

  function updateProfile(newProfile: UserProfile) {
    saveProfile(newProfile);
    setProfile(newProfile);
  }

  function refreshStats() {
    setStats(getStats());
    setAvgResponseTime(getAverageResponseTime());
  }

  const getOrCreateThreadId = useCallback(async (moduleId: string): Promise<string> => {
    const existing = getThread(moduleId);
    if (existing?.threadId) return existing.threadId;

    if (!isOpenAIConfigured()) return `local_${moduleId}`;

    const threadId = await createThread();
    saveThread({
      threadId,
      moduleId,
      messages: [],
      createdAt: new Date().toISOString(),
    });
    return threadId;
  }, []);

  const sendChatMessage = useCallback(
    async (moduleId: string, message: string): Promise<string> => {
      const startTime = Date.now();

      // Lagre brukermelding
      const userMsg: StoredMessage = {
        id: Date.now().toString(),
        content: message,
        role: "user",
        timestamp: new Date().toISOString(),
        moduleId,
      };
      addMessageToThread(moduleId, userMsg);

      let responseText: string;

      if (isOpenAIConfigured()) {
        // Ekte OpenAI-kall
        const threadId = await getOrCreateThreadId(moduleId);
        responseText = await openaiChat(threadId, message);
      } else {
        // Lokal simulering med modul-spesifikk personlighet
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
        responseText = getSimulatedResponse(moduleId, message);
      }

      // Lagre assistentsvar
      const assistantMsg: StoredMessage = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: "assistant",
        timestamp: new Date().toISOString(),
        moduleId,
      };
      addMessageToThread(moduleId, assistantMsg);

      // Oppdater stats
      const responseTime = Date.now() - startTime;
      trackInteraction(responseTime, moduleId);
      refreshStats();

      return responseText;
    },
    [getOrCreateThreadId]
  );

  function getChatHistory(moduleId: string): StoredMessage[] {
    const thread = getThread(moduleId);
    return thread?.messages || [];
  }

  return (
    <KITContext.Provider
      value={{
        isConnected,
        status,
        profile,
        updateProfile,
        stats,
        avgResponseTime,
        refreshStats,
        sendChatMessage,
        getChatHistory,
        getOrCreateThreadId,
      }}
    >
      {children}
    </KITContext.Provider>
  );
}

export function useKIT() {
  const ctx = useContext(KITContext);
  if (!ctx) throw new Error("useKIT must be used inside KITProvider");
  return ctx;
}

/** Modul-spesifikke simulerte svar (brukes når OpenAI ikke er konfigurert) */
function getSimulatedResponse(moduleId: string, message: string): string {
  const responses: Record<string, string[]> = {
    main: [
      "Interessant spørsmål! Når OpenAI-nøkkelen er konfigurert vil jeg gi deg et skikkelig svar. Foreløpig er dette en simulering.",
      "Jeg forstår hva du mener. Koble til OpenAI for å få ekte AI-svar fra din personlige assistent.",
      "Takk for meldingen! Legg til VITE_OPENAI_API_KEY i .env for å aktivere ekte samtaler.",
    ],
    "dj-musikk": [
      "Som din DJ- og musikkrådgiver ville jeg gitt deg tips om BPM, mixing og musikkproduksjon. Koble til OpenAI for ekte rådgivning!",
      "Musikksmaken din er interessant! Med ekte AI kan jeg analysere sjangre og foreslå nye artister.",
    ],
    filosofi: [
      "Et dypt filosofisk spørsmål! Med OpenAI koblet til kan vi utforske dette temaet grundig sammen.",
      "Sokrates ville nok sagt at den sanne visdommen ligger i å innse at man ingenting vet. Koble til for dypere samtaler!",
    ],
    psykologi: [
      "Psykologisk perspektiv er viktig. Med ekte AI kan jeg gi mer nyanserte refleksjoner rundt dette.",
    ],
    "personlig-trener": [
      "Trening er viktig! Med OpenAI kan jeg lage skreddersydde treningsprogrammer for deg.",
    ],
    "kostholds-ekspert": [
      "Ernæring er grunnlaget for god helse. Koble til for personlige kostholdsråd!",
    ],
    "beste-venn": [
      "Jeg er her for deg! Med ekte AI-tilkobling kan vi ha dypere og mer meningsfulle samtaler.",
    ],
    "super-sekretar": [
      "Organisering er min styrke! Koble til OpenAI så hjelper jeg deg med planlegging og oppgaver.",
    ],
    sparringspartner: [
      "La oss tenke strategisk rundt dette. Med ekte AI kan jeg gi mer gjennomtenkte råd.",
    ],
  };

  const pool = responses[moduleId] || responses.main;
  return pool[Math.floor(Math.random() * pool.length)];
}
