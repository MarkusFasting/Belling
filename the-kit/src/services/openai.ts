/**
 * OpenAI Assistants API service for K.I.T.
 *
 * Kobles automatisk til når VITE_OPENAI_API_KEY og
 * VITE_OPENAI_ASSISTANT_ID er satt i .env
 */

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID as string | undefined;
const BASE_URL = "https://api.openai.com/v1";

export function isOpenAIConfigured(): boolean {
  return !!(
    API_KEY &&
    API_KEY !== "sk-your-openai-api-key-here" &&
    ASSISTANT_ID &&
    ASSISTANT_ID !== "asst_your-assistant-id-here"
  );
}

async function apiCall(endpoint: string, options: RequestInit = {}) {
  if (!API_KEY) throw new Error("OpenAI API key not configured");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI API error: ${res.status}`);
  }

  return res.json();
}

/** Opprett en ny tråd */
export async function createThread(): Promise<string> {
  const data = await apiCall("/threads", { method: "POST" });
  return data.id;
}

/** Send melding til tråd */
export async function sendMessage(
  threadId: string,
  content: string
): Promise<void> {
  await apiCall(`/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({ role: "user", content }),
  });
}

/** Kjør assistenten og vent på svar */
export async function runAssistant(threadId: string): Promise<string> {
  if (!ASSISTANT_ID) throw new Error("Assistant ID not configured");

  // Start kjøring
  const run = await apiCall(`/threads/${threadId}/runs`, {
    method: "POST",
    body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
  });

  // Vent på at kjøring fullføres
  let status = run.status;
  let runId = run.id;
  let attempts = 0;
  const maxAttempts = 60; // maks 60 sekunder

  while (status === "queued" || status === "in_progress") {
    if (attempts++ > maxAttempts) {
      throw new Error("Tidsavbrudd: Assistenten brukte for lang tid");
    }
    await new Promise((r) => setTimeout(r, 1000));
    const check = await apiCall(`/threads/${threadId}/runs/${runId}`);
    status = check.status;

    if (status === "failed") {
      throw new Error(check.last_error?.message || "Assistenten feilet");
    }
    if (status === "cancelled") {
      throw new Error("Kjøringen ble avbrutt");
    }
  }

  // Hent siste melding (assistentens svar)
  const messages = await apiCall(
    `/threads/${threadId}/messages?order=desc&limit=1`
  );

  const assistantMsg = messages.data?.[0];
  if (!assistantMsg || assistantMsg.role !== "assistant") {
    throw new Error("Inget svar fra assistenten");
  }

  // Ekstraher tekst fra content blocks
  const textContent = assistantMsg.content
    ?.filter((c: any) => c.type === "text")
    .map((c: any) => c.text.value)
    .join("\n");

  return textContent || "Tomt svar fra assistenten";
}

/** Full samtale-flyt: send melding + få svar */
export async function chat(
  threadId: string,
  userMessage: string
): Promise<string> {
  await sendMessage(threadId, userMessage);
  return runAssistant(threadId);
}
