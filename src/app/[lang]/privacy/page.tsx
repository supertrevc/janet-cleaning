import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";

const LAST_UPDATED = "May 31, 2026";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    alternates: buildAlternates(lang, "/privacy"),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const p = dict.legal.privacy;

  return (
    <>
      <PageHero title={p.title} />
      <LegalContent
        intro={p.intro}
        sections={p.sections}
        lastUpdatedLabel={dict.legal.lastUpdated}
        lastUpdated={LAST_UPDATED}
      />
    </>
  );
}
