// Internationalization configuration for Janet's Cleaning.
// The site is fully bilingual (English + Spanish) using `app/[lang]` routing.

export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Maps our short locale codes to BCP-47 tags used for <html lang> and hreflang.
export const localeHrefLang: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Canonical production URL. Override with NEXT_PUBLIC_SITE_URL at build time.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.janetscleaningdenver.com"
).replace(/\/$/, "");
