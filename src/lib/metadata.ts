import type { Metadata } from "next";
import { locales, localeHrefLang, defaultLocale, type Locale } from "./i18n";

// Builds canonical + hreflang alternates for a page. `path` is the locale-less
// path (e.g. "" for home, "/services"). metadataBase (set in the root layout)
// turns these relative paths into absolute URLs.
export function buildAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHrefLang[l]] = `/${l}${path}`;
  }
  languages["x-default"] = `/${defaultLocale}${path}`;

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}
