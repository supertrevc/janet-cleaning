import type { MetadataRoute } from "next";
import { locales, defaultLocale, siteUrl } from "@/lib/i18n";

// Paths (locale-less). Legal pages are intentionally excluded (noindex).
const paths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/quote", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

const lastModified = new Date("2026-05-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = `${siteUrl}/${l}${path}`;

    return locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${siteUrl}/${defaultLocale}${path}`,
        },
      },
    }));
  });
}
