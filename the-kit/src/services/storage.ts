/**
 * localStorage-basert lagring for K.I.T.
 * Brukes til alt lagres lokalt til Supabase kobles til.
 */

const PREFIX = "kit_";

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage full eller utilgjengelig
  }
}

// ---- Chat ----

export interface StoredMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  moduleId?: string;
}

export interface StoredThread {
  threadId: string;
  moduleId: string;
  messages: StoredMessage[];
  createdAt: string;
}

export function getThreads(): StoredThread[] {
  return getItem<StoredThread[]>("threads", []);
}

export function getThread(moduleId: string): StoredThread | undefined {
  return getThreads().find((t) => t.moduleId === moduleId);
}

export function saveThread(thread: StoredThread): void {
  const threads = getThreads().filter((t) => t.moduleId !== thread.moduleId);
  threads.push(thread);
  setItem("threads", threads);
}

export function addMessageToThread(
  moduleId: string,
  message: StoredMessage
): StoredThread {
  let thread = getThread(moduleId);
  if (!thread) {
    thread = {
      threadId: "",
      moduleId,
      messages: [],
      createdAt: new Date().toISOString(),
    };
  }
  thread.messages.push(message);
  saveThread(thread);
  return thread;
}

// ---- Profil ----

export interface UserProfile {
  name: string;
  email: string;
  preferences: string[];
  personality: string;
  goals: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Markus",
  email: "markus@example.com",
  preferences: ["Musikk", "Filosofi", "Trening", "Teknologi"],
  personality:
    "Kreativ, analytisk og målrettet person som setter pris på dype samtaler og personlig utvikling.",
  goals:
    "Ønsker å optimalisere produktivitet, forbedre helse og utforske nye ideer gjennom AI-assistanse.",
};

export function getProfile(): UserProfile {
  return getItem<UserProfile>("profile", DEFAULT_PROFILE);
}

export function saveProfile(profile: UserProfile): void {
  setItem("profile", profile);
}

// ---- Statistikk ----

export interface StatsData {
  totalInteractions: number;
  todayInteractions: number;
  todayDate: string;
  responseTimes: number[];
  moduleUsage: Record<string, number>;
  moodScores: number[];
  productivityScores: number[];
  goalScores: number[];
}

const DEFAULT_STATS: StatsData = {
  totalInteractions: 0,
  todayInteractions: 0,
  todayDate: new Date().toISOString().split("T")[0],
  responseTimes: [],
  moduleUsage: {},
  moodScores: [],
  productivityScores: [],
  goalScores: [],
};

export function getStats(): StatsData {
  const stats = getItem<StatsData>("stats", DEFAULT_STATS);
  // Resett daglige tall hvis ny dag
  const today = new Date().toISOString().split("T")[0];
  if (stats.todayDate !== today) {
    stats.todayInteractions = 0;
    stats.todayDate = today;
    setItem("stats", stats);
  }
  return stats;
}

export function trackInteraction(responseTimeMs: number, moduleId?: string): void {
  const stats = getStats();
  stats.totalInteractions++;
  stats.todayInteractions++;
  stats.responseTimes.push(responseTimeMs);
  // Behold kun siste 100 responstider
  if (stats.responseTimes.length > 100) {
    stats.responseTimes = stats.responseTimes.slice(-100);
  }
  if (moduleId) {
    stats.moduleUsage[moduleId] = (stats.moduleUsage[moduleId] || 0) + 1;
  }
  setItem("stats", stats);
}

export function getAverageResponseTime(): number {
  const stats = getStats();
  if (stats.responseTimes.length === 0) return 0;
  const sum = stats.responseTimes.reduce((a, b) => a + b, 0);
  return Math.round(sum / stats.responseTimes.length);
}
