"use client";

import { FormEvent, useMemo, useState } from "react";
import { Locale } from "@/lib/i18n";

type ContactEmailComposerProps = {
  locale: Locale;
  showQuestionType?: boolean;
  fixedRecipient?: string;
  fixedTopicLabel?: string;
};

const copyByLocale = {
  nl: {
    title: "Stuur ons een bericht",
    subtitle: "Kies eerst waarover je vraag gaat en vul daarna je gegevens in.",
    simpleSubtitle: "Vul je gegevens in en verstuur je vraag rechtstreeks naar UCOS.",
    questionType: "Waarover heb je een vraag?",
    training: "Vormingen",
    other: "Andere vragen",
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "Jouw e-mailadres",
    message: "Jouw bericht",
    placeholder: "Typ hier je vraag of bericht...",
    button: "Opstellen en verzenden",
    invalidEmail: "Vul een geldig e-mailadres in.",
    humanPrompt: "Bewijs dat je een mens bent:",
    humanPlaceholder: "Vul het antwoord in",
    invalidHuman: "Het antwoord op de vergelijking klopt niet."
  },
  en: {
    title: "Send us a message",
    subtitle: "First select your question type, then fill in your details.",
    simpleSubtitle: "Fill in your details and send your question directly to UCOS.",
    questionType: "What is your question about?",
    training: "Trainings",
    other: "Other questions",
    firstName: "First name",
    lastName: "Last name",
    email: "Your email address",
    message: "Your message",
    placeholder: "Type your question or message here...",
    button: "Compose and send",
    invalidEmail: "Please enter a valid email address.",
    humanPrompt: "Prove you are human:",
    humanPlaceholder: "Enter the answer",
    invalidHuman: "The equation answer is incorrect."
  },
  fr: {
    title: "Envoyez-nous un message",
    subtitle: "Choisissez d'abord le type de question, puis remplissez vos donnees.",
    simpleSubtitle: "Remplissez vos donnees et envoyez directement votre question a UCOS.",
    questionType: "Votre question concerne quoi?",
    training: "Formations",
    other: "Autres questions",
    firstName: "Prenom",
    lastName: "Nom",
    email: "Votre adresse email",
    message: "Votre message",
    placeholder: "Ecrivez ici votre question ou message...",
    button: "Rediger et envoyer",
    invalidEmail: "Veuillez saisir une adresse email valide.",
    humanPrompt: "Prouvez que vous etes humain:",
    humanPlaceholder: "Entrez la reponse",
    invalidHuman: "La reponse a l'equation est incorrecte."
  }
} as const;

export default function ContactEmailComposer({
  locale,
  showQuestionType = true,
  fixedRecipient,
  fixedTopicLabel
}: ContactEmailComposerProps) {
  const copy = copyByLocale[locale];
  const [questionType, setQuestionType] = useState<"training" | "other">("training");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [humanAnswer, setHumanAnswer] = useState("");
  const [showError, setShowError] = useState(false);

  const selectedRecipient = questionType === "training" ? "vorming@ucos.be" : "contact@ucos.be";
  const recipient = fixedRecipient ?? selectedRecipient;
  const challengeA = 1;
  const challengeB = 0;

  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);
  const isHumanValid = useMemo(() => Number.parseInt(humanAnswer.trim(), 10) === challengeA + challengeB, [humanAnswer]);
  const isReady = firstName.trim() && lastName.trim() && email.trim() && message.trim() && isEmailValid && isHumanValid;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady) {
      setShowError(true);
      return;
    }

    const topic = fixedTopicLabel ?? (questionType === "training" ? copy.training : copy.other);
    const subject = encodeURIComponent(`${firstName.trim()} ${lastName.trim()} - ${topic} via UCOS website`);
    const body = encodeURIComponent(
      `Naam: ${firstName.trim()} ${lastName.trim()}\nE-mail: ${email.trim()}\n\nBericht:\n${message.trim()}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-xl border border-brand-200 bg-white p-4">
      <p className="text-base font-semibold text-brand-900">{copy.title}</p>
      <p className="mt-1 text-sm text-slate-600">{showQuestionType ? copy.subtitle : copy.simpleSubtitle}</p>

      {showQuestionType && (
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-700">{copy.questionType}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setQuestionType("training")}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                questionType === "training" ? "bg-brand-700 text-white" : "border border-brand-300 bg-white text-brand-800 hover:bg-brand-50"
              }`}
            >
              {copy.training}
            </button>
            <button
              type="button"
              onClick={() => setQuestionType("other")}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                questionType === "other" ? "bg-brand-700 text-white" : "border border-brand-300 bg-white text-brand-800 hover:bg-brand-50"
              }`}
            >
              {copy.other}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          {copy.firstName}
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          {copy.lastName}
          <input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            required
          />
        </label>
      </div>

      <label className="mt-3 block text-sm font-medium text-slate-700">
        {copy.email}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          required
        />
      </label>

      <label className="mt-3 block text-sm font-medium text-slate-700">
        {copy.message}
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          placeholder={copy.placeholder}
          required
        />
      </label>

      <label className="mt-3 block text-sm font-medium text-slate-700">
        {copy.humanPrompt} {challengeA} + {challengeB} = ?
        <input
          value={humanAnswer}
          onChange={(event) => setHumanAnswer(event.target.value)}
          className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          placeholder={copy.humanPlaceholder}
          required
        />
      </label>

      {showError && !isEmailValid && <p className="mt-2 text-sm font-medium text-red-600">{copy.invalidEmail}</p>}
      {showError && !isHumanValid && <p className="mt-2 text-sm font-medium text-red-600">{copy.invalidHuman}</p>}

      <button
        type="submit"
        className="mt-4 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!isReady}
      >
        {copy.button}
      </button>
    </form>
  );
}
