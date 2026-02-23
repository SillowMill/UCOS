"use client";

import { FormEvent, useState } from "react";
import { Bot, MessageCircle, Mic, MicOff, SendHorizontal, Volume2 } from "lucide-react";
import { Locale } from "@/lib/i18n";

type ChatbotGuideProps = {
  locale: Locale;
};

type TopicKey = "training" | "partnership" | "students" | "integrity" | "general";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type IntakeNeed = "info" | "guidance" | "contact" | "page";

type RecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

type RecognitionCtor = new () => RecognitionInstance;

const copyByLocale = {
  nl: {
    open: "Chat met UCOS",
    close: "Sluiten",
    title: "UCOS guide",
    subtitle: "Praat met ons team over vormingen, studenten, partnerschappen, integriteit en meer.",
    welcome:
      "Hallo! Ik ben je UCOS-gids. Stel gerust je vraag, dan help ik je met de juiste info of de juiste collega.",
    placeholder: "Typ je vraag...",
    send: "Verstuur",
    micStart: "Start microfoon",
    micStop: "Stop microfoon",
    voiceReply: "Voice antwoord",
    thinking: "UCOS typt",
    youLabel: "Jij",
    botLabel: "UCOS collega",
    intakeTitle: "Snelle start",
    intakeTopicQuestion: "Waarover gaat je vraag?",
    intakeNeedQuestion: "Wat heb je nu het meest nodig?",
    topics: {
      training: "vormingen",
      partnership: "partnerschappen",
      students: "studenten",
      integrity: "integriteit",
      general: "algemene vraag"
    },
    intakeNeeds: {
      info: "Korte info",
      guidance: "Stap-voor-stap begeleiding",
      contact: "Juiste contactpersoon",
      page: "Direct juiste pagina"
    },
    intakeSend: "Toon mijn advies",
    intakeReset: "Opnieuw kiezen"
  },
  en: {
    open: "Chat with UCOS",
    close: "Close",
    title: "UCOS guide",
    subtitle: "Talk with our team about trainings, students, partnerships, integrity, and more.",
    welcome:
      "Hi! I am your UCOS guide. Ask your question and I will help with the right information or colleague.",
    placeholder: "Type your question...",
    send: "Send",
    micStart: "Start microphone",
    micStop: "Stop microphone",
    voiceReply: "Voice reply",
    thinking: "UCOS is typing",
    youLabel: "You",
    botLabel: "UCOS colleague",
    intakeTitle: "Quick start",
    intakeTopicQuestion: "What is your question about?",
    intakeNeedQuestion: "What do you need most right now?",
    topics: {
      training: "trainings",
      partnership: "partnerships",
      students: "students",
      integrity: "integrity",
      general: "general question"
    },
    intakeNeeds: {
      info: "Quick info",
      guidance: "Step-by-step guidance",
      contact: "Right contact person",
      page: "Direct page"
    },
    intakeSend: "Show my advice",
    intakeReset: "Reset"
  },
  fr: {
    open: "Chat avec UCOS",
    close: "Fermer",
    title: "Guide UCOS",
    subtitle: "Echangez avec notre equipe sur les formations, etudiants, partenariats, integrite, et plus.",
    welcome:
      "Bonjour! Je suis votre guide UCOS. Posez votre question et je vous aide avec la bonne information ou la bonne personne.",
    placeholder: "Tapez votre question...",
    send: "Envoyer",
    micStart: "Demarrer le micro",
    micStop: "Arreter le micro",
    voiceReply: "Reponse vocale",
    thinking: "UCOS ecrit",
    youLabel: "Vous",
    botLabel: "Collegue UCOS",
    intakeTitle: "Demarrage rapide",
    intakeTopicQuestion: "Votre question concerne quoi?",
    intakeNeedQuestion: "De quoi avez-vous besoin maintenant?",
    topics: {
      training: "formations",
      partnership: "partenariats",
      students: "etudiants",
      integrity: "integrite",
      general: "question generale"
    },
    intakeNeeds: {
      info: "Info rapide",
      guidance: "Accompagnement etape par etape",
      contact: "Bonne personne de contact",
      page: "Page directe"
    },
    intakeSend: "Afficher mon conseil",
    intakeReset: "Reinitialiser"
  }
} as const;

export default function ChatbotGuide({ locale }: ChatbotGuideProps) {
  const copy = copyByLocale[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: copy.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceReply, setVoiceReply] = useState(false);
  const [intakeTopic, setIntakeTopic] = useState<TopicKey | null>(null);
  const [intakeNeed, setIntakeNeed] = useState<IntakeNeed | null>(null);
  const [intakeDone, setIntakeDone] = useState(false);

  const speak = (text: string) => {
    if (!voiceReply || typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === "nl" ? "nl-BE" : locale === "fr" ? "fr-BE" : "en-GB";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: nextMessages })
      });

      const payload = (await response.json()) as { reply?: string };
      const reply = payload.reply?.trim() || "Ik kan hierop nu niet antwoorden. Probeer je vraag iets concreter te formuleren.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      const fallback =
        locale === "fr"
          ? "Desole, je ne peux pas repondre pour l'instant. Reessayez dans quelques secondes."
          : locale === "en"
            ? "Sorry, I cannot answer right now. Please try again in a few seconds."
            : "Sorry, ik kan nu even niet antwoorden. Probeer het binnen enkele seconden opnieuw.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const launchIntake = () => {
    if (!intakeTopic || !intakeNeed || loading) return;

    const needsLabel = copy.intakeNeeds[intakeNeed];
    const prompt =
      locale === "fr"
        ? `Ma question concerne ${copy.topics[intakeTopic]}. Je veux: ${needsLabel}. Pouvez-vous me guider?`
        : locale === "en"
          ? `My question is about ${copy.topics[intakeTopic]}. I need: ${needsLabel}. Can you guide me?`
          : `Mijn vraag gaat over ${copy.topics[intakeTopic]}. Ik heb nodig: ${needsLabel}. Kan je me begeleiden?`;

    setIntakeDone(true);
    void sendMessage(prompt);
  };

  const resetIntake = () => {
    setIntakeTopic(null);
    setIntakeNeed(null);
    setIntakeDone(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const toggleMic = () => {
    if (typeof window === "undefined") return;
    const scopedWindow = window as Window & {
      webkitSpeechRecognition?: RecognitionCtor;
      SpeechRecognition?: RecognitionCtor;
    };
    const Ctor = scopedWindow.SpeechRecognition ?? scopedWindow.webkitSpeechRecognition;
    if (!Ctor) return;

    if (listening) {
      setListening(false);
      return;
    }

    const recognition = new Ctor();
    recognition.lang = locale === "nl" ? "nl-BE" : locale === "fr" ? "fr-BE" : "en-GB";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      void sendMessage(transcript);
    };
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };

  return (
    <div className="fixed bottom-4 right-4 z-[120] sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-[92vw] max-w-md overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={16} aria-hidden="true" />
              <p className="text-sm font-semibold">{copy.title}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-xs font-semibold text-white/90 hover:text-white">
              {copy.close}
            </button>
          </div>

          <div className="max-h-[72vh] overflow-y-auto p-4">
            <p className="text-sm text-slate-700">{copy.subtitle}</p>

            <div className="mt-3 rounded-xl border border-brand-200 bg-white p-3">
              {!intakeDone && (
                <div className="mb-3 rounded-lg border border-brand-200 bg-brand-50/60 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">{copy.intakeTitle}</p>

                  <p className="mt-2 text-xs font-medium text-slate-700">{copy.intakeTopicQuestion}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Object.keys(copy.topics) as TopicKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setIntakeTopic(key)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          intakeTopic === key ? "bg-brand-700 text-white" : "border border-brand-300 bg-white text-brand-800 hover:bg-brand-50"
                        }`}
                      >
                        {copy.topics[key]}
                      </button>
                    ))}
                  </div>

                  <p className="mt-3 text-xs font-medium text-slate-700">{copy.intakeNeedQuestion}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Object.keys(copy.intakeNeeds) as IntakeNeed[]).map((need) => (
                      <button
                        key={need}
                        type="button"
                        onClick={() => setIntakeNeed(need)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          intakeNeed === need ? "bg-brand-700 text-white" : "border border-brand-300 bg-white text-brand-800 hover:bg-brand-50"
                        }`}
                      >
                        {copy.intakeNeeds[need]}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={launchIntake}
                      disabled={!intakeTopic || !intakeNeed || loading}
                      className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {copy.intakeSend}
                    </button>
                    <button
                      type="button"
                      onClick={resetIntake}
                      className="rounded-full border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-50"
                    >
                      {copy.intakeReset}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">{copy.title}</p>
                <button
                  type="button"
                  onClick={() => setVoiceReply((current) => !current)}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${voiceReply ? "bg-brand-700 text-white" : "border border-brand-300 text-brand-800"}`}
                >
                  <Volume2 size={12} aria-hidden="true" />
                  {copy.voiceReply}
                </button>
              </div>

              <div className="mt-2 h-56 overflow-y-auto rounded-md bg-brand-50/60 p-2">
                {messages.map((msg, index) => (
                  <p key={`${msg.role}-${index}`} className={`mb-2 text-xs ${msg.role === "user" ? "text-slate-700" : "font-medium text-brand-900"}`}>
                    {msg.role === "user" ? `${copy.youLabel}: ` : `${copy.botLabel}: `}
                    {msg.content}
                  </p>
                ))}
                {loading && (
                  <p className="mb-1 text-xs font-medium text-brand-900">
                    {copy.thinking}
                    <span className="ml-1 inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700" style={{ animationDelay: "140ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700" style={{ animationDelay: "280ms" }} />
                    </span>
                  </p>
                )}
              </div>

              <form onSubmit={onSubmit} className="mt-2 flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={copy.placeholder}
                  className="w-full rounded-md border border-brand-200 px-2 py-1.5 text-xs"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={toggleMic}
                  disabled={loading}
                  className={`rounded-md border px-2 ${listening ? "border-red-400 text-red-600" : "border-brand-300 text-brand-800"} disabled:cursor-not-allowed disabled:opacity-50`}
                  title={listening ? copy.micStop : copy.micStart}
                >
                  {listening ? <MicOff size={14} /> : <Mic size={14} />}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-brand-700 px-2 text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
                  title={copy.send}
                >
                  <SendHorizontal size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-brand-800"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {copy.open}
        </button>
      )}
    </div>
  );
}
