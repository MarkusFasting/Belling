/**
 * Web Speech API for stemmeinput og talesyntese.
 * Fungerer direkte i nettleseren uten ekstern API.
 */

// ---- Speech Recognition (tale → tekst) ----

type SpeechCallback = (transcript: string, isFinal: boolean) => void;

const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;

let recognition: any = null;

export function isSpeechSupported(): boolean {
  return !!SpeechRecognition;
}

export function startListening(
  onResult: SpeechCallback,
  onEnd: () => void,
  lang = "nb-NO" // Norsk bokmål
): void {
  if (!SpeechRecognition) {
    console.warn("Talegjenkjenning støttes ikke i denne nettleseren");
    return;
  }

  stopListening();

  recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: any) => {
    const last = event.results[event.results.length - 1];
    const transcript = last[0].transcript;
    const isFinal = last.isFinal;
    onResult(transcript, isFinal);
  };

  recognition.onerror = (event: any) => {
    console.error("Talegjenkjenningsfeil:", event.error);
    onEnd();
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.start();
}

export function stopListening(): void {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

// ---- Speech Synthesis (tekst → tale) ----

export function speak(text: string, lang = "nb-NO"): void {
  if (!window.speechSynthesis) return;

  // Stopp eventuell pågående tale
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Prøv å finne norsk stemme
  const voices = window.speechSynthesis.getVoices();
  const norwegianVoice = voices.find((v) => v.lang.startsWith("nb") || v.lang.startsWith("no"));
  if (norwegianVoice) {
    utterance.voice = norwegianVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
