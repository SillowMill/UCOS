export const locales = ["nl", "en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return defaultLocale;
  const lower = acceptLanguageHeader.toLowerCase();
  if (lower.includes("nl")) return "nl";
  if (lower.includes("fr")) return "fr";
  if (lower.includes("en")) return "en";
  return defaultLocale;
}

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Francais"
};
