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
}: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.terms.title,
    description: dict.meta.terms.description,
    alternates: buildAlternates(lang, "/terms"),
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.legal.terms;

  return (
    <>
      <PageHero title={t.title} />
      <LegalContent
        intro={t.intro}
        sections={t.sections}
        lastUpdatedLabel={dict.legal.lastUpdated}
        lastUpdated={LAST_UPDATED}
      />
    </>
  );
}
