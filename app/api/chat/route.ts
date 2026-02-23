import { getHomeContent } from "@/lib/content";
import { Locale, isLocale } from "@/lib/i18n";
import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const maxMessages = 12;

function buildSystemPrompt(locale: Locale, homeTitle: string) {
  const languageRule = locale === "fr" ? "Respond in French." : locale === "en" ? "Respond in English." : "Respond in Dutch.";
  const toneRule =
    locale === "fr"
      ? "Use warm, polite Belgian French (vous-form), clear and natural, never stiff corporate language."
      : locale === "en"
        ? "Use warm, clear UK English, professional but conversational, no robotic phrasing."
        : "Use warm Belgian Dutch (Vlaams) with natural wording, practical and approachable, no stiff formal tone.";

  return [
    "You are a real UCOS staff member chatting on the website.",
    languageRule,
    toneRule,
    "Sound human: warm, practical, and natural. Avoid robotic phrasing.",
    "Write as a colleague speaking directly to one person.",
    "Use short conversational sentences and occasional empathy cues when relevant.",
    "Stay in UCOS context: trainings, students, partnerships, integrity, contact, and UCOS pages.",
    "When useful, suggest a concrete next step and mention the right page path.",
    "Only provide a contact person if the user explicitly asks for it.",
    "If the user is unclear, ask one simple clarification question.",
    `Site title context: ${homeTitle}`
  ].join(" ");
}

function fallbackReply(input: string, locale: Locale) {
  const text = input.toLowerCase();
  if (/(vorming|training|formation)/.test(text)) {
    return locale === "en"
      ? "Great question. For trainings, UCOS can support workshops and practical learning formats. If you want, I can point you to the best page to start with."
      : locale === "fr"
        ? "Tres bonne question. Pour les formations, UCOS propose des ateliers et formats pratiques. Si vous voulez, je peux vous orienter vers la meilleure page pour commencer."
        : "Goeie vraag. Voor vormingen kan UCOS workshops en praktische leerformats aanbieden. Als je wil, wijs ik je meteen naar de juiste startpagina.";
  }

  return locale === "en"
    ? "I can help with UCOS topics like trainings, students, partnerships, integrity, and contact. Tell me your goal and I will guide you step by step."
    : locale === "fr"
      ? "Je peux vous aider sur les sujets UCOS: formations, etudiants, partenariats, integrite et contact. Expliquez votre objectif et je vous guide pas a pas."
      : "Ik help je graag met UCOS-thema's zoals vormingen, studenten, partnerschappen, integriteit en contact. Vertel kort je doel, dan begeleid ik je stap voor stap.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      locale?: string;
      messages?: IncomingMessage[];
    };

    const locale = body.locale && isLocale(body.locale) ? body.locale : "nl";
    const messages = Array.isArray(body.messages) ? body.messages.slice(-maxMessages) : [];

    const home = await getHomeContent(locale);
    const systemPrompt = buildSystemPrompt(locale, home.meta.title);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const lastUser = [...messages].reverse().find((msg) => msg.role === "user")?.content ?? "";
      return NextResponse.json({ reply: fallbackReply(lastUser, locale) });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.55,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((message) => ({ role: message.role, content: message.content }))
        ]
      })
    });

    if (!response.ok) {
      const lastUser = [...messages].reverse().find((msg) => msg.role === "user")?.content ?? "";
      return NextResponse.json({ reply: fallbackReply(lastUser, locale) });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      const lastUser = [...messages].reverse().find((msg) => msg.role === "user")?.content ?? "";
      return NextResponse.json({ reply: fallbackReply(lastUser, locale) });
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Er liep iets mis met de chat. Probeer het opnieuw." });
  }
}
