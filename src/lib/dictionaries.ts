import "server-only";
import type { Locale } from "./i18n";

// Dictionaries are loaded server-side only, so their size never affects the
// client bundle. `en` is the canonical shape that types the whole app.
import type en from "@/dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
